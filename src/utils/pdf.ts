import { toJpeg, toPng } from "html-to-image";
import jsPDF from "jspdf";

const PADDING = 40;
export const PRINTABLE_WIDTH = 1250;
export const PRINTABLE_HEIGHT = PRINTABLE_WIDTH * (297 / 210);

let watermarkImageUrl: string;

// Render html as image and add it to pdf (slow for large HTML, not recommended, please use puppeteer if possible)
export const exportReportToPdf = async ({
  html,
  fileName,
  landScape,
}: {
  html: HTMLElement;
  fileName: string;
  landScape?: boolean;
}) => {
  const printableWidth = landScape ? PRINTABLE_HEIGHT : PRINTABLE_WIDTH;
  const printableHeight = landScape ? PRINTABLE_WIDTH : PRINTABLE_HEIGHT;
  console.log([printableWidth + 2 * PADDING, printableHeight + 2 * PADDING]);
  const pdf = new jsPDF({
    orientation: landScape ? "landscape" : "portrait",
    unit: "px",
    format: [printableWidth + 2 * PADDING, printableHeight + 2 * PADDING],
  });
  let scale = 1;
  let y = PADDING;

  const tableContainer = html?.querySelector<HTMLDivElement>(".ant-table-container");
  if (tableContainer) {
    scale = Math.min(1, printableWidth / tableContainer.offsetWidth);
  }
  const tbody = tableContainer?.querySelector("tbody");
  const trows = tbody?.querySelectorAll("tr");
  const watermark = html.querySelector<HTMLDivElement>(".transparent-report-logo");
  if (!watermarkImageUrl && watermark) {
    watermarkImageUrl = await toPng(watermark, {
      pixelRatio: 2,
    });
  }

  const addImageFromHtml = async (
    element: HTMLElement | null,
    options: {
      format?: "JPEG" | "PNG";
      x?: number;
      y?: number;
      width?: number;
      height?: number;
      absolute?: boolean;
    } = {
      format: "JPEG",
    },
  ) => {
    if (!element) {
      return;
    }

    if (element.offsetHeight + y > printableHeight + PADDING) {
      await addWatermark();
      y = PADDING;
      pdf.addPage();
    }

    let imageData;
    switch (options?.format) {
      case "PNG":
        imageData = await toPng(element, {
          pixelRatio: 2,
        });
        break;
      default:
        imageData = await toJpeg(element, {
          backgroundColor: "white",
          pixelRatio: 2,
        });
    }

    const imageProps = pdf.getImageProperties(imageData);
    const imgWidth = options?.width ?? printableWidth;
    const imgHeight = options?.height ?? imageProps.height * (imgWidth / imageProps.width);

    pdf.addImage(
      imageData,
      options?.format ?? "JPEG",
      options?.x ?? PADDING,
      options?.y ?? y,
      imgWidth,
      imgHeight,
      undefined,
      "FAST",
    );
    if (!options.absolute) {
      y += imgHeight;
    }
  };

  const addWatermark = async () => {
    if (!watermarkImageUrl || !watermark) {
      return;
    }

    pdf.addImage(
      watermarkImageUrl,
      "PNG",
      PADDING + printableWidth / 2 - watermark.offsetWidth / 2,
      PADDING + printableHeight / 2 - watermark.offsetHeight / 2,
      watermark.offsetWidth,
      watermark.offsetHeight,
      undefined,
      "FAST",
    );
  };

  const getScaledTableOffsetHeight = () => {
    if (!tableContainer) {
      return 0;
    }
    return tableContainer.offsetHeight * scale;
  };

  const renderTable = async (rowStartIndex: number) => {
    if (!tableContainer || !tbody || !trows) {
      return;
    }

    let _rowIndex = rowStartIndex;
    // Removing every row and then reinsert from startIndex to the end
    // (couldn't use table.offsetHeight / pageHeight because it's not accurate)
    tbody.innerHTML = "";
    for (let i = _rowIndex; i < trows.length; i++) {
      tbody.appendChild(trows[i]);
    }
    // Break table if it's too long
    if (getScaledTableOffsetHeight() + y - PADDING > printableHeight) {
      tbody.innerHTML = "";
      while (getScaledTableOffsetHeight() + y - PADDING < printableHeight) {
        const trow = trows[_rowIndex];
        tbody.appendChild(trow);
        if (getScaledTableOffsetHeight() + y - PADDING > printableHeight) {
          tbody.removeChild(trow);
          break;
        } else {
          _rowIndex++;
        }
      }
      await addImageFromHtml(tableContainer);
      // Recursively render the rest of the table
      if (_rowIndex < trows.length) {
        await addWatermark();
        pdf.addPage();
        y = PADDING;
        await renderTable(_rowIndex);
      }
    } else {
      await addImageFromHtml(tableContainer);
    }
  };

  const header = html.querySelector("#report-header");
  if (header) {
    await addImageFromHtml(header as HTMLElement);
  }

  if (tableContainer) {
    await renderTable(0);
  }

  await addImageFromHtml(html.querySelector("#report-footer"));

  await addWatermark();

  pdf.save(`${fileName}.pdf`);
};
