import styled from "styled-components"
import React, {useContext, useEffect, useState} from "react"
import "material-components-web/dist/material-components-web.min.css"
import "material-icons"

import {Drawer, DrawerAppContent, DrawerContent, DrawerHeader, DrawerSubtitle, DrawerTitle} from "@rmwc/drawer"

import {List, ListItem} from "@rmwc/list"
import {Link} from "react-router-dom"
import {firebase} from "../firebase"
import UserContext from "../contexts/UserContext"
import TitleBar from "./TitleBar"
import TitleBarContext from "../contexts/TitleBarContext"
import DrawerContext from "../contexts/DrawerContext"

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  * {
    box-sizing: border-box;
  }

  margin: 0;
  padding: 0;

  .mdc-typography--headline1 {
    font-size: 3rem;
  }
`;

const Content = styled.main`
  height: calc(100% - 64px);
  position: relative;

  flex: 1;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Layout = ({ children, loading }) => {
  const user = useContext(UserContext);
  const [stateTitleBarRef, setStateTitleBarRef] = useState(null);

  const smallScreen = window.outerWidth < 1000;

  const [drawer, setDrawer] = useState(!smallScreen);

  const drawerContextValue = {
    drawer,
    setDrawer
  };

  const titleBarRef = React.createRef();

  useEffect(() => {
    if (stateTitleBarRef) return;
    setStateTitleBarRef(titleBarRef.current);
  });

  return (
    <Wrapper>
      {!loading && (
        <DrawerContext.Provider value={drawerContextValue}>
          <>
            <Drawer
              open={drawer}
              dismissible={!smallScreen}
              modal={smallScreen}
              onClose={() => setDrawer(false)}
            >
              <DrawerHeader>
                <DrawerTitle>Markdown</DrawerTitle>
                <DrawerSubtitle>
                  A product by Jordy van Domselaar
                </DrawerSubtitle>
              </DrawerHeader>
              <DrawerContent>
                <List>
                  {user && (
                    <StyledLink to="/documents">
                      <ListItem>Document overview</ListItem>
                    </StyledLink>
                  )}
                  {user && (
                    <ListItem onClick={() => firebase.auth().signOut()}>
                      Logout
                    </ListItem>
                  )}
                  {!user && (
                    <StyledLink to="/login">
                      <ListItem>Login</ListItem>
                    </StyledLink>
                  )}
                </List>
              </DrawerContent>
            </Drawer>
            <DrawerAppContent style={{ minHeight: "15rem", height: "100%" }}>
              <TitleBar containerRef={titleBarRef} />
              <TitleBarContext.Provider value={stateTitleBarRef}>
                <Content>{children}</Content>
              </TitleBarContext.Provider>
            </DrawerAppContent>
          </>
        </DrawerContext.Provider>
      )}
    </Wrapper>
  );
};

export default Layout;
