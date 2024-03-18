/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TreeView } from "@lexical/react/LexicalTreeView";
import { Box } from "@mui/material";

import { richTextClassses } from "../..";

const TreeViewPlugin = (): JSX.Element => {
  const [editor] = useLexicalComposerContext();
  return (
    <Box
      sx={{
        [`.${richTextClassses.treeViewOutput}`]: {
          display: "block",
          background: "#222",
          color: "#fff",
          padding: "5px",
          fontSize: "12px",
          whiteSpace: "pre-wrap",
          maxHeight: "250px",
          position: "relative",
          overflow: "auto",
          lineHeight: "14px",
        },
      }}
    >
      <TreeView
        viewClassName="tree-view-output"
        treeTypeButtonClassName="debug-treetype-button"
        timeTravelPanelClassName="debug-timetravel-panel"
        timeTravelButtonClassName="debug-timetravel-button"
        timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
        timeTravelPanelButtonClassName="debug-timetravel-panel-button"
        editor={editor}
      />
    </Box>
  );
};

export default TreeViewPlugin;
