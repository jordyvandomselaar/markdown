import React, { useEffect } from "react";
import "codemirror/lib/codemirror.css"; // codemirror
import "tui-editor/dist/tui-editor.css"; // editor ui
import "tui-editor/dist/tui-editor-contents.css"; // editor content
import "highlight.js/styles/github.css"; // code block highlight
import Editor from "tui-editor";

const MarkdownEditor = ({ onMarkdownChange, initialMarkdown }) => {
  let editorInstance;
  const ref = React.createRef();

  useEffect(() => {
    editorInstance = new Editor({
      el: ref.current,
      initialEditType: "markdown",
      previewStyle: "vertical",
      height: "100%",
      usageStatistics: false,
      initialValue: initialMarkdown,
      useDefaultHTMLSanitizer: false,
      events: {
        change: () => onMarkdownChange(editorInstance.getValue())
      }
    });
  }, []);

  return <div ref={ref} />;
};

export default MarkdownEditor;
