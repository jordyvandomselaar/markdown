import React, { useContext } from "react";
import { createPortal } from "react-dom";
import TitleBarContext from "../contexts/TitleBarContext";

const PageTitle = ({ title, children }) => {
  const titleBarRef = useContext(TitleBarContext);

  if (!titleBarRef) {
    return null;
  }

  return createPortal(<>{children}</>, titleBarRef);
};

export default PageTitle;
