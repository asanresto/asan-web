import { $generateHtmlFromNodes } from "@lexical/html";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { alpha, Box, InputLabel, useTheme } from "@mui/material";
import { EditorState, EditorThemeClasses } from "lexical";
import { MutableRefObject, ReactNode, Ref } from "react";

import { themeColors } from "@/theme";

import ToolbarPlugin from "./plugins/Toolbar";

export const richTextClassses = {
  editorLink: "editor-link",
  editorTextCode: "editor-text-code",
  editorTextItalic: "edit-text-italic",
  editorTextStrikethrough: "editor-text-strikethrough",
  editorTextUnderline: "editor-text-underline",
  editorTextUnderlineStrikethrough: "editor-text-underlineStrikethrough",
  treeViewOutput: "tree-view-output",
  editorCode: "editor-code",
  editorTokenComment: "editor-tokenComment",
  editorTokenPunctuation: "editor-tokenPunctuation",
  editorTokenProperty: "editor-tokenProperty",
  editorTokenSelector: "editor-tokenSelector",
  editorTokenOperator: "editor-tokenOperator",
  editorTokenAttr: "editor-tokenAttr",
  editorTokenVariable: "editor-tokenVariable",
  editorTokenFunction: "editor-tokenFunction",
  editorParagraph: "editor-paragraph",
  editorHeadingH1: "editor-heading-h1",
  editorHeadingH2: "editor-heading-h2",
  editorQuote: "editor-quote",
  editorListOl: "editor-list-ol",
  editorListUl: "editor-list-ul",
  editorListItem: "editor-listitem",
  editorNestedListItem: "editor-nested-listitem",
  debugTimeTravelPanel: "debug-timetravel-panel",
  debugTimeTravelPanelSlider: "debug-timetravel-panel-slider",
  debugTimeTravelPanelButton: "debug-timetravel-panel-button",
  debugTimeTravelButton: "debug-timetravel-button",
  toolbar: "toolbar",
  toolbarItem: "toolbar-item",
  editorPlaceholder: "editor-placeholder",
};

const richTextTheme: EditorThemeClasses = {
  code: richTextClassses.editorCode,
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5",
  },
  image: "editor-image",
  link: richTextClassses.editorLink,
  list: {
    listitem: "editor-listitem",
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
  },
  ltr: "ltr",
  paragraph: "editor-paragraph",
  placeholder: richTextClassses.editorPlaceholder,
  quote: "editor-quote",
  rtl: "rtl",
  text: {
    bold: "editor-text-bold",
    code: richTextClassses.editorTextCode,
    hashtag: "editor-text-hashtag",
    italic: richTextClassses.editorTextItalic,
    overflowed: "editor-text-overflowed",
    strikethrough: richTextClassses.editorTextStrikethrough,
    underline: richTextClassses.editorTextUnderline,
    underlineStrikethrough: richTextClassses.editorTextUnderlineStrikethrough,
  },
};

const RichText = ({
  label,
  placeholder,
  editorStateRef,
}: {
  label?: ReactNode;
  placeholder?: string;
  editorStateRef?: MutableRefObject<EditorState | null>;
}) => {
  const theme = useTheme();

  const editorConfig: InitialConfigType = {
    namespace: "React.js Demo",
    nodes: [ListItemNode, ListNode],
    theme: richTextTheme,
    onError(error: Error) {
      throw error;
    },
  };

  return (
    <Box>
      {label && (
        <InputLabel
          sx={{ fontSize: "14px", fontWeight: 800, mb: "8px", lineHeight: "16px", color: themeColors.brown[80] }}
        >
          {label}
        </InputLabel>
      )}
      <Box
        bgcolor={themeColors.brown[10]}
        borderRadius={7}
        border="1px solid transparent"
        overflow="hidden"
        sx={{
          transition: theme.transitions.create(["border", "box-shadow"], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          }),
          "&:hover": {
            borderColor: themeColors.brown[40],
          },
          ".other": {
            h2: {
              fontSize: "18px",
              color: "#444",
              marginBottom: "7px",
            },
            a: {
              color: "#777",
              textDecoration: "underline",
              fontSize: "14px",
            },
            ul: {
              padding: 0,
              margin: 0,
              listStyleType: "none",
            },
          },
          ".ltr": {
            textAlign: "left",
          },
          ".rtl": {
            textAlign: "right",
          },
          ".editor-input": {
            minHeight: "150px",
            resize: "none",
            fontSize: "16px",
            position: "relative",
            tabSize: 1,
            outline: 0,
            px: "15px",
            caretColor: "#444",
          },
          ".editor-text-bold": {
            fontWeight: 700,
          },
          [`.${richTextClassses.editorTextItalic}`]: {
            fontStyle: "italic",
          },
          [`.${richTextClassses.editorTextUnderline}`]: {
            textDecoration: "underline",
          },
          [`.${richTextClassses.editorTextStrikethrough}`]: {
            textDecoration: "line-through",
          },
          [`.${richTextClassses.editorTextUnderlineStrikethrough}`]: {
            textDecoration: "underline line-through",
          },
          [`.${richTextClassses.editorTextCode}`]: {
            backgroundColor: "rgb(240, 242, 245)",
            padding: "1px 0.25rem",
            fontFamily: "Menlo, Consolas, Monaco, monospace",
            fontSize: "94%",
          },
          [`.${richTextClassses.editorLink}`]: {
            color: "rgb(33, 111, 219)",
            textDecoration: "none",
          },
          [`.${richTextClassses.editorCode}`]: {
            backgroundColor: "rgb(240, 242, 245)",
            fontFamily: "Menlo, Consolas, Monaco, monospace",
            display: "block",
            padding: "8px 8px 8px 52px",
            lineHeight: 1.53,
            fontSize: "13px",
            margin: "0",
            marginTop: "8px",
            marginBottom: "8px",
            tabSize: 2,
            // whiteSpace: "pre", // Uncomment if needed
            overflowX: "auto",
            position: "relative",
            "&::before": {
              content: "attr(data-gutter)",
              position: "absolute",
              backgroundColor: "#eee",
              left: "0",
              top: "0",
              borderRight: "1px solid #ccc",
              padding: "8px",
              color: "#777",
              whiteSpace: "pre-wrap",
              textAlign: "right",
              minWidth: "25px",
            },
            "&::after": {
              content: "attr(data-highlight-language)",
              top: "0",
              right: "3px",
              padding: "3px",
              fontSize: "10px",
              textTransform: "uppercase",
              position: "absolute",
              color: "rgba(0, 0, 0, 0.5)",
            },
          },
          [`.${richTextClassses.editorTokenComment}`]: {
            color: "slategray",
          },
          [`.${richTextClassses.editorTokenPunctuation}`]: {
            color: "#999",
          },
          [`.${richTextClassses.editorTokenProperty}`]: {
            color: "#905",
          },
          [`.${richTextClassses.editorTokenSelector}`]: {
            color: "#690",
          },
          [`.${richTextClassses.editorTokenOperator}`]: {
            color: "#9a6e3a",
          },
          [`.${richTextClassses.editorTokenAttr}`]: {
            color: "#07a",
          },
          [`.${richTextClassses.editorTokenVariable}`]: {
            color: "#e90",
          },
          [`.${richTextClassses.editorTokenFunction}`]: {
            color: "#dd4a68",
          },
          [`.${richTextClassses.editorParagraph}`]: {
            margin: "0",
            marginBottom: "8px",
            position: "relative",
            "&:last-child": {
              marginBottom: 0,
            },
          },
          [`.${richTextClassses.editorHeadingH1}`]: {
            fontSize: "24px",
            color: "rgb(5, 5, 5)",
            fontWeight: 400,
            margin: "0",
            marginBottom: "12px",
            padding: "0",
          },
          [`.${richTextClassses.editorHeadingH2}`]: {
            fontSize: "15px",
            color: "rgb(101, 103, 107)",
            fontWeight: 700,
            margin: "0",
            marginTop: "10px",
            padding: "0",
            textTransform: "uppercase",
          },
          [`.${richTextClassses.editorQuote}`]: {
            margin: "0",
            marginLeft: "20px",
            fontSize: "15px",
            color: "rgb(101, 103, 107)",
            borderLeftColor: "rgb(206, 208, 212)",
            borderLeftWidth: "4px",
            borderLeftStyle: "solid",
            paddingLeft: "16px",
          },
          [`.${richTextClassses.editorListOl}`]: {
            padding: "0",
            margin: "0",
            marginLeft: "16px",
          },
          [`.${richTextClassses.editorListUl}`]: {
            padding: "0",
            margin: "0",
            marginLeft: "16px",
          },
          [`.${richTextClassses.editorListItem}`]: {
            margin: "8px 32px",
          },
          [`.${richTextClassses.editorNestedListItem}`]: {
            listStyleType: "none",
          },
          pre: {
            "&::-webkit-scrollbar": {
              background: "transparent",
              width: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#999",
            },
          },
          [`.${richTextClassses.debugTimeTravelPanel}`]: {
            overflow: "hidden",
            padding: "0 0 10px 0",
            margin: "auto",
            display: "flex",
          },
          [`.${richTextClassses.debugTimeTravelPanelSlider}`]: {
            padding: "0",
            flex: 8,
          },
          [`.${richTextClassses.debugTimeTravelPanelButton}`]: {
            padding: "0",
            border: "0",
            background: "none",
            flex: 1,
            color: "#fff",
            fontSize: "12px",
            "&:hover": {
              textDecoration: "underline",
            },
          },
          [`.${richTextClassses.debugTimeTravelButton}`]: {
            border: "0",
            padding: "0",
            fontSize: "12px",
            top: "10px",
            right: "15px",
            position: "absolute",
            background: "none",
            color: "#fff",
            "&:hover": {
              textDecoration: "underline",
            },
          },
        }}
      >
        <LexicalComposer initialConfig={editorConfig}>
          <Box
            sx={{
              color: "#000",
              position: "relative",
              lineHeight: "20px",
              fontWeight: 400,
              textAlign: "left",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <ToolbarPlugin />
            <ListPlugin />
            <Box
              sx={{
                position: "relative",
              }}
            >
              <RichTextPlugin
                contentEditable={<ContentEditable className="editor-input" />}
                placeholder={
                  <Box
                    className={richTextClassses.editorPlaceholder}
                    color={alpha(themeColors.brown[80], 0.42)}
                    overflow="hidden"
                    position="absolute"
                    textOverflow="ellipsis"
                    top={0}
                    left="15px"
                    fontSize="16px"
                    fontWeight={700}
                    display="inline-block"
                    lineHeight="initial"
                    sx={{
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    {placeholder}
                  </Box>
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <AutoFocusPlugin />
              <OnChangePlugin
                onChange={(editorState, editor, tags) => {
                  if (editorStateRef) {
                    editorStateRef.current = editorState;
                  }
                }}
              />
            </Box>
          </Box>
        </LexicalComposer>
      </Box>
    </Box>
  );
};

export default RichText;
