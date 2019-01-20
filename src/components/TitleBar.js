import React, { useContext } from "react";
import { Toolbar, ToolbarRow } from "@rmwc/toolbar";
import { IconButton } from "@rmwc/icon-button";
import "@material/icon-button/dist/mdc.icon-button.css";
import DrawerContext from "../contexts/DrawerContext";

const TitleBar = ({ children, containerRef }) => {
  const { drawer, setDrawer } = useContext(DrawerContext);

  return (
    <Toolbar>
      <ToolbarRow>
        <IconButton
          icon="menu"
          onClick={e => {
            e.preventDefault();
            setDrawer(!drawer);
          }}
        />
        <div ref={containerRef}>{children}</div>
      </ToolbarRow>
    </Toolbar>
  );
};

export default TitleBar;
