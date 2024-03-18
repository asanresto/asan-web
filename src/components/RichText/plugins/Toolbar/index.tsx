/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {
  $isListItemNode,
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListType,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { Box, Divider } from "@mui/material";
import {
  $getSelection,
  $isNodeSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  FormatAlignCenterIcon,
  FormatAlignJustifyIcon,
  FormatAlignLeftIcon,
  FormatAlignRightIcon,
  FormatBoldIcon,
  FormatItalicIcon,
  FormatListBulletedIcon,
  FormatListNumberedIcon,
  FormatStrikethroughIcon,
  FormatUnderlinedIcon,
  RedoIcon,
  UndoIcon,
} from "@/assets";
import MiniPillButton from "@/components/MiniPillButton";

import { richTextClassses } from "../..";

const LowPriority = 1;

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [listType, setListType] = useState<ListType | null>(null);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));

      let listType: ListType | null = null;
      for (const node of selection.getNodes()) {
        const topNode = node.getTopLevelElement();
        if ($isListNode(topNode)) {
          listType = topNode.getListType();
          break;
        }
      }
      setListType(listType);
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, $updateToolbar]);

  return (
    <Box
      className="toolbar"
      ref={toolbarRef}
      p="11px"
      mb="1px"
      display="flex"
      gap="4px"
      sx={{
        verticalAlign: "middle",
        [`button.${richTextClassses.toolbarItem}`]: {
          borderColor: "transparent",
          "&:disabled": {
            cursor: "not-allowed",
            //     "i.format": {
            //       opacity: 0.2,
            //     },
          },

          "&.active": {
            borderColor: "currentcolor",
            //     backgroundColor: "rgba(223, 232, 250, 0.3)",
            //     i: {
            //       opacity: 1,
            //     },
          },
          //   "i.format": {
          //     backgroundSize: "contain",
          //     display: "inline-block",
          //     height: "18px",
          //     width: "18px",
          //     marginTop: "2px",
          //     verticalAlign: "-0.25em",
          //     opacity: 0.6,
          //   },
        },
        // [`.${richTextClassses.toolbarItem}`]: {
        //   "&:hover:not([disabled])": {
        //     backgroundColor: "#eee",
        //   },
        //   ".text": {
        //     display: "flex",
        //     lineHeight: "20px",
        //     width: "70px",
        //     verticalAlign: "middle",
        //     fontSize: "14px",
        //     color: "#777",
        //     textOverflow: "ellipsis",
        //     overflow: "hidden",
        //     height: "20px",
        //     textAlign: "left",
        //   },
        //   ".icon": {
        //     display: "flex",
        //     width: "20px",
        //     height: "20px",
        //     userSelect: "none",
        //     marginRight: "8px",
        //     lineHeight: "16px",
        //     backgroundSize: "contain",
        //   },
        // },
        // ".divider": {
        //   width: "1px",
        //   backgroundColor: "#eee",
        //   margin: "0 4px",
        // },
      }}
    >
      <MiniPillButton
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Undo"
        Icon={UndoIcon}
      >
        {/* <PlusIcon className="format undo" /> */}
      </MiniPillButton>
      <MiniPillButton
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo"
        Icon={RedoIcon}
      >
        {/* <PlusIcon className="format redo" /> */}
      </MiniPillButton>
      <Divider orientation="vertical" flexItem />
      <MiniPillButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={"toolbar-item " + (isBold ? "active" : "")}
        aria-label="Format Bold"
        Icon={FormatBoldIcon}
      >
        {/* <PlusIcon className="format bold" /> */}
      </MiniPillButton>
      <MiniPillButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={"toolbar-item " + (isItalic ? "active" : "")}
        aria-label="Format Italics"
        Icon={FormatItalicIcon}
      >
        {/* <PlusIcon className="format italic" /> */}
      </MiniPillButton>
      <MiniPillButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={"toolbar-item " + (isUnderline ? "active" : "")}
        aria-label="Format Underline"
        Icon={FormatUnderlinedIcon}
      >
        {/* <PlusIcon className="format underline" /> */}
      </MiniPillButton>
      <MiniPillButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        className={"toolbar-item " + (isStrikethrough ? "active" : "")}
        aria-label="Format Strikethrough"
        Icon={FormatStrikethroughIcon}
      >
        {/* <PlusIcon className="format strikethrough" /> */}
      </MiniPillButton>
      <Divider orientation="vertical" flexItem />
      <MiniPillButton
        onClick={() => {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        }}
        className={"toolbar-item " + (listType === "bullet" ? "active" : "")}
        aria-label="Format Bulletted List"
        Icon={FormatListBulletedIcon}
      />
      <MiniPillButton
        onClick={() => {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        }}
        className={"toolbar-item " + (listType === "number" ? "active" : "")}
        aria-label="Format Numbered List"
        Icon={FormatListNumberedIcon}
      />
      <Divider orientation="vertical" flexItem />
      <MiniPillButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        className="toolbar-item"
        aria-label="Left Align"
        Icon={FormatAlignLeftIcon}
      >
        {/* <PlusIcon className="format left-align" /> */}
      </MiniPillButton>
      <MiniPillButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        className="toolbar-item"
        aria-label="Center Align"
        Icon={FormatAlignCenterIcon}
      >
        {/* <PlusIcon className="format center-align" /> */}
      </MiniPillButton>
      <MiniPillButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        className="toolbar-item"
        aria-label="Right Align"
        Icon={FormatAlignRightIcon}
      >
        {/* <PlusIcon className="format right-align" /> */}
      </MiniPillButton>
      <MiniPillButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        className="toolbar-item"
        aria-label="Justify Align"
        Icon={FormatAlignJustifyIcon}
      >
        {/* <PlusIcon className="format justify-align" /> */}
      </MiniPillButton>
    </Box>
  );
};

export default ToolbarPlugin;
