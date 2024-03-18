"use client";

import { Box, Stack, StackProps } from "@mui/material";
import { ReactNode } from "react";
import { operation } from "retry";

import { themeColors } from "@/theme";

// Since createRoot.render operates asynchronously, we must retry to retrieve the title after it has been rendered to the DOM.
const getTitle = () => {
  const op = operation();
  return new Promise<HTMLElement>((resolve, reject) => {
    op.attempt(() => {
      const title = document.getElementById("testingTitle123");
      const err = !title ? new Error("Not yet") : undefined;
      if (op.retry(err)) {
        return;
      }
      if (title) {
        resolve(title);
      } else {
        reject(op.mainError());
      }
    });
  });
};

const Header = ({
  titleText,
  actions,
  ...props
}: { titleText?: ReactNode; actions?: React.ReactNode } & StackProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      width="100%"
      minHeight="97px"
      py={2}
      px={6}
      borderBottom={`1px solid ${themeColors.brown[30]}`}
      {...props}
    >
      {titleText && (
        <>
          <Box
            fontSize="36px"
            fontWeight={800}
            lineHeight="44px"
            letterSpacing="-0.03em"
            color={themeColors.brown[80]}
            overflow="hidden"
            textOverflow="ellipsis"
            display="-webkit-box"
            sx={{
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
          >
            {titleText}
          </Box>
        </>
      )}
      {/* <Stack direction="row" flex={1} mx={3} spacing={1} justifyContent="flex-start">
        <Tag />
        <Tag />
      </Stack> */}
      <Stack direction="row" spacing={1} ml="auto">
        {/* <Button sx={{ bgcolor: "#F7F4F2", width: "64px", height: "64px", borderRadius: "32px" }}>
          <Search style={{ width: "32px", height: "32px" }} />
        </Button> */}
        {actions}
        {/* <Tooltip title="Create new">
          <Button
            variant="contained"
            color="green"
            size="small"
            sx={{
              width: "64px",
              height: "64px",
              borderRadius: "32px",
              p: 0,
            }}
            onClick={async () => {
              const portal = document.createElement("div");
              portal.id = "portal123";
              portal.style.position = "absolute";
              portal.style.left = "9999px";
              document.body.appendChild(portal);
              const root1 = createRoot(portal);
              root1.render(
                <div id="testingTitle123">
                  <Header title="Testing Testing 123" />
                </div>,
              );
              const title = await getTitle();
              if (!title) {
                return;
              }
              const table = document.getElementById("testTable123")?.cloneNode(true);
              if (!table) {
                return;
              }
              // Condense to fit horizontally, though this won't take advantage of puppeteer's auto-paging feature for tables.
              (table as HTMLElement).classList.add("will-scale");
              const clonedHtml = document.documentElement.cloneNode(true) as HTMLElement;
              const root = clonedHtml.querySelector("#root");
              if (!root) {
                return;
              }
              root.innerHTML = "";
              root.appendChild(title);
              root.appendChild(table);
              const res = await fetch("/api/export-to-pdf", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  html: clonedHtml.outerHTML,
                  baseUrl: "http://localhost:3001",
                  // Set the overflow style to visible for any overflowing elements when printing using @media print { overflow: visible }
                  // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Printing
                  scale: "fit-width",
                  format: "a4",
                  landscape: false,
                }),
              });
              portal.remove();
              if (!res.ok) {
                return;
              }
              const blob = await res.blob();
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "test.pdf";
              a.click();
              URL.revokeObjectURL(url);
              a.remove();
              // Export to pdf client side (slow)
              // const element = document.getElementById("testTable123")?.cloneNode(true);
              // if (element) {
              //   await exportToPdf(element as HTMLElement);
              // }
            }}
          >
            <PlusIcon width="32px" height="32px" />
          </Button>
        </Tooltip> */}
      </Stack>
    </Stack>
  );
};

export default Header;
