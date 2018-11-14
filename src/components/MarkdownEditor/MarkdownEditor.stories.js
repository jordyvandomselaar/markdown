import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MarkdownEditor from "./index";

const Wrapper = ({ children }) => (
  <div
    style={{
      position: "absolute",
      left: "0%",
      right: "0%",
      top: "0%",
      bottom: "0%"
    }}
  >
    {children}
  </div>
);

storiesOf("MarkdownEditor", module)
  .add("default", () => (
    <Wrapper>
      <MarkdownEditor onMarkdownChange={action("Markdown changed")} />
    </Wrapper>
  ))
  .add("With initial markdown", () => (
    <Wrapper>
      <MarkdownEditor
        onMarkdownChange={action("Markdown changed")}
        initialMarkdown="# foo!"
      />
    </Wrapper>
  ));
