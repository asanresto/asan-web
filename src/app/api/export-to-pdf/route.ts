import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const dynamic = "auto";

const MARGIN_TOP = 10;
const MARGIN_BOTTOM = 10;
const MARGIN_LEFT = 10;
const MARGIN_RIGHT = 10;

const PAPER_SIZES: Record<string, { width: number; height: number }> = {
  a4: {
    width: 210 - MARGIN_LEFT - MARGIN_RIGHT,
    height: 297 - MARGIN_TOP - MARGIN_BOTTOM,
  },
  a3: {
    width: 297 - MARGIN_LEFT - MARGIN_RIGHT,
    height: 420 - MARGIN_TOP - MARGIN_BOTTOM,
  },
};

export const POST = async (request: Request) => {
  const {
    html,
    baseUrl,
    format = "a4",
    scale = 1,
    landscape = false,
    margin = {
      top: MARGIN_TOP + "mm",
      bottom: MARGIN_BOTTOM + "mm",
      left: MARGIN_LEFT + "mm",
      right: MARGIN_RIGHT + "mm",
    },
  } = await request.json();
  if (!html || !baseUrl) {
    return NextResponse.json({ error: "HTML content and base URL are required" }, { status: 400 });
  }
  if (format != "a4" && format != "a3") {
    return NextResponse.json({ error: "Only 'a4' and 'a3' formats are supported" }, { status: 400 });
  }
  try {
    // Launch a headless browser --no-sandbox is needed
    const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage();
    // Set viewport to A4 size in pixels (1 inch = 96px)
    await page.setViewport({
      width: Math.round((landscape ? PAPER_SIZES[format].height : PAPER_SIZES[format].width) * (96 / 25.4)),
      height: Math.round((landscape ? PAPER_SIZES[format].width : PAPER_SIZES[format].height) * (96 / 25.4)),
    });
    await page.emulateMediaType("print");
    // Go to a site that has the base URL to get the relative URLs to work
    await page.goto("http://localhost:3001/test", { waitUntil: "networkidle0" });
    // Replace the entire HTML content
    await page.evaluate((newHtml) => {
      document.documentElement.innerHTML = newHtml;
    }, html);
    // const scrollWidth = await page.evaluate(() => {
    //   return document.querySelector(".will-scale")?.scrollWidth;
    // });
    // Hide scrollbars
    await page.evaluate(() => {
      const style = document.createElement("style");
      style.innerHTML = `
      ::-webkit-scrollbar {
        display: none;
      }
      * {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
      document.head.appendChild(style);
    });
    // Condense elements with class will-scale to fit horizontally, though this won't take advantage of puppeteer's auto-paging feature for tables so not recommended.
    // await page.evaluate(() => {
    //   const MARGIN_LEFT = 10;
    //   const MARGIN_RIGHT = 10;
    //   const root = document.getElementById("root");
    //   if (!root) {
    //     return;
    //   }
    //   root.style.width = `${210 - MARGIN_LEFT - MARGIN_RIGHT}mm`;
    //   const willScaleElements = document.querySelectorAll<HTMLElement>(".will-scale");
    //   const res: any[] = [];
    //   willScaleElements.forEach((element) => {
    //     if (element.scrollWidth > root.clientWidth) {
    //       element.style.overflow = "visible";
    //       element.style.transformOrigin = "top left";
    //       const scaleFactor = root.clientWidth / element.scrollWidth;
    //       element.style.transform = `scale(${scaleFactor})`;
    //       element.style.width = element.scrollWidth * scaleFactor + "px";
    //       element.style.height = element.scrollHeight * scaleFactor + "px";
    //       res.push({
    //         scrollWidth: element.scrollWidth,
    //         clientWidth: root.clientWidth,
    //       });
    //     }
    //   });
    // });
    // By default, page.pdf() generates a pdf with modified colors for printing.
    // Use the `-webkit-print-color-adjust` property to force rendering of exact colors.
    await page.evaluate(() => {
      const style = document.createElement("style");
      style.innerHTML = `
        * {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      `;
      document.head.appendChild(style);
    });
    // Scale the whole document, this will leverage the auto-paging feature of puppeteer
    const scrollWidth = await page.evaluate(() => {
      return document.body.scrollWidth;
    });
    let scale1;
    if (scale === "fit-width") {
      scale1 = Math.min(
        1,
        ((landscape ? PAPER_SIZES[format].height : PAPER_SIZES[format].width) * (96 / 25.4)) / scrollWidth,
      );
    } else if (typeof scale === "number") {
      scale1 = scale;
    } else {
      return NextResponse.json({ error: "Scale must be 'fit-width' or a number" }, { status: 500 });
    }
    // return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
    const pdfBuffer = await page.pdf({
      format: format,
      landscape: landscape,
      scale: scale1,
      margin: margin,
    });
    await browser.close();
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=output.pdf",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
};
