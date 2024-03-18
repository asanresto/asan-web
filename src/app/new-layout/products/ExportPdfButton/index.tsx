import { Button, ButtonProps } from "@mui/material";
import { useState } from "react";

import { emulatePrintMedia } from "@/utils/css";
import { exportReportToPdf, PRINTABLE_HEIGHT, PRINTABLE_WIDTH } from "@/utils/pdf";

const waitForIframeContent = (iframe: HTMLIFrameElement): Promise<void> => {
  return new Promise((resolve, reject) => {
    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDocument) {
      return reject("Unable to access iframe document.");
    }
    // Function to check if all stylesheets are loaded
    const areStylesLoaded = (): boolean => {
      return Array.from(iframeDocument.styleSheets).every((sheet) => {
        try {
          return !!(sheet as CSSStyleSheet).cssRules; // cssRules will throw if not fully loaded
        } catch (e) {
          return false;
        }
      });
    };
    // // Add load event listeners to all scripts
    // const scriptLoadPromises = Array.from(
    //   iframeDocument.getElementsByTagName("script"),
    // ).map((script) => {
    //   return new Promise<void>((scriptResolve, scriptReject) => {
    //     if ((script as any).complete) {
    //       scriptResolve();
    //     } else {
    //       script.addEventListener("load", () => scriptResolve());
    //       script.addEventListener("error", () =>
    //         scriptReject(new Error("Script failed to load")),
    //       );
    //     }
    //   });
    // });

    // Wait for all styles and scripts to load
    const checkIfLoaded = () => {
      if (areStylesLoaded()) {
        // Promise.all(scriptLoadPromises)
        //   .then(() => {
        //     resolve();
        //   })
        //   .catch((error) => {
        //     reject(error);
        //   });
        resolve();
      } else {
        setTimeout(checkIfLoaded, 50); // Re-check after a delay if not fully loaded
      }
    };

    // Wait for the iframe's 'load' event
    iframe.addEventListener("load", () => {
      setTimeout(checkIfLoaded, 50); // Delay to ensure initial loading completes
    });
  });
};

const ExportPdfButton = (props: ButtonProps) => {
  const [loading, setLoading] = useState(false);

  const exportToPdfFile = async ({ landscape }: { landscape: boolean }) => {
    try {
      const printableWidth = landscape ? PRINTABLE_HEIGHT : PRINTABLE_WIDTH;
      const printableHeight = landscape ? PRINTABLE_WIDTH : PRINTABLE_HEIGHT;
      setLoading(true);
      const clonedHtml = document.documentElement.cloneNode(true) as HTMLHtmlElement;
      const clonedBody = clonedHtml.querySelector("body");
      if (!clonedBody) {
        return;
      }
      clonedBody.innerHTML = "";

      const header = document.getElementById("report-header")?.cloneNode(true);
      if (header) {
        clonedBody.appendChild(header);
      }
      const mainContent = document.getElementById("testTable123")?.cloneNode(true) as HTMLDivElement | null;
      if (mainContent) {
        clonedBody.appendChild(mainContent);
      }

      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.border = "none";
      iframe.style.top = "0px";
      iframe.style.left = "-9999px";

      iframe.style.zIndex = "9999";
      iframe.style.left = "0px";

      iframe.style.width = `${printableWidth}px`;
      iframe.style.height = `${printableHeight}px`;

      iframe.style.backgroundColor = "white";

      document.body.appendChild(iframe);

      iframe.contentWindow?.document.open();
      iframe.contentWindow?.document.write(clonedHtml.outerHTML);
      iframe.contentWindow?.document.close();

      emulatePrintMedia(iframe.contentDocument);

      await waitForIframeContent(iframe);
      // Must give table fixed width to keep consitent scale accross pages
      const tableContainer = iframe.contentDocument?.querySelector<HTMLDivElement>(".ant-table-container");
      if (tableContainer) {
        tableContainer.style.width = `${Math.max(printableWidth, tableContainer.offsetWidth)}px`;
      }

      const printHtml = iframe.contentDocument?.documentElement;
      if (!printHtml) {
        return;
      }
      // await exportReportToPdf({
      //   html: printHtml,
      //   fileName: `document`,
      //   landScape: landscape,
      // });
      // document.body.removeChild(iframe);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outlined"
      color="brown"
      onClick={async () => {
        await exportToPdfFile({ landscape: false });
      }}
    >
      Export PDF
    </Button>
  );
};

export default ExportPdfButton;
