import React from "react";
import { Toolbar, ToolbarRow } from "@rmwc/toolbar";

const TitleBar = ({ children, containerRef }) => {
  return (
    <Toolbar>
      <ToolbarRow>
        <div ref={containerRef}>{children}</div>
      </ToolbarRow>
    </Toolbar>
  );
};

export default TitleBar;
