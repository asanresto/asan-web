"use client";

import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { VariableSizeList } from "react-window";
import ChatBubble from "../ChatBubble";

// These row heights are arbitrary.
// Yours should be based on the content of the row.
const rowHeights = new Array(1000).fill(true).map(() => 88);

const getItemSize = (index: number) => rowHeights[index];

const Row = ({ index, style }: { index: number; style: any }) => (
  <div style={style}>
    <ChatBubble variant="in" />
  </div>
);

const ChatThread = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    setWidth(containerRef.current?.offsetWidth);
    setHeight(containerRef.current?.offsetHeight);
    const t = () => {
      setWidth(containerRef.current?.offsetWidth);
      setHeight(containerRef.current?.offsetHeight);
    };
    window.addEventListener("resize", t);
    return () => {
      window.removeEventListener("resize", t);
    };
  }, []);

  useEffect(() => {
    console.log(width);
  }, [width]);

  return (
    <Box
      ref={containerRef}
      bgcolor="red"
      flex={1}
      sx={{
        ".ListItemEven, .ListItemOdd": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".ListItemEven": {
          backgroundColor: "#f8f8f0",
        },
      }}
    >
      {width && height ? (
        <VariableSizeList className="List" width={width} height={height} itemCount={1000} itemSize={getItemSize}>
          {Row}
        </VariableSizeList>
      ) : null}
    </Box>
  );
};

export default ChatThread;
