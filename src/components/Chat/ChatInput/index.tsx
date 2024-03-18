"use client";

import { TextareaAutosize } from "@mui/base";
import { styled } from "@mui/material";

const ChatInput = styled(TextareaAutosize)(({ theme }) => {
  return `
  font-family: inherit;
  width: 100%;
  padding: 0;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #4B3425;
  background-color: transparent;
  border: none;
  resize: none;

  &:focus-visible {
    outline: 0;
  }
`;
});

export default ChatInput;
