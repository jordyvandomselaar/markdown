import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import "material-components-web/dist/material-components-web.min.css";
import "material-icons";

import {
  Drawer,
  DrawerAppContent,
  DrawerContent,
  DrawerHeader,
  DrawerSubtitle,
  DrawerTitle
} from "rmwc/Drawer";

import { List, ListItem } from "rmwc/List";
import { Link } from "react-router-dom";
import { firebase } from "../firebase";
import UserContext from "../contexts/UserContext";
import TitleBar from "./TitleBar";
import TitleBarContext from "../contexts/TitleBarContext";

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
  height: 100%;
  position: relative;

  flex: 1;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Layout = ({ children, loading }) => {
  const user = useContext(UserContext);
  const [stateTitleBarRef, setStateTitleBarRef] = useState(null);
  const titleBarRef = React.createRef();

  useEffect(() => {
    setStateTitleBarRef(titleBarRef);
  }, []);

  return (
    <Wrapper>
      {!loading && (
        <>
          <Drawer open={true} dismissible={true}>
            <DrawerHeader>
              <DrawerTitle>Markdown</DrawerTitle>
              <DrawerSubtitle>A product by Jordy van Domselaar</DrawerSubtitle>
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
            <TitleBar containerRef={stateTitleBarRef} />
            <TitleBarContext.Provider value={stateTitleBarRef}>
              <Content>{children}</Content>
            </TitleBarContext.Provider>
          </DrawerAppContent>
        </>
      )}
    </Wrapper>
  );
};

export default Layout;
