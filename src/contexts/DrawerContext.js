import React from "react";

const DrawerContext = React.createContext({
  drawer: null,
  setDrawer: () => {}
});

export default DrawerContext;
