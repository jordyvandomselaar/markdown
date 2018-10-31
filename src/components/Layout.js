import styled from 'styled-components';
import React from 'react';
import 'material-components-web/dist/material-components-web.min.css';
import 'material-icons';

import {Drawer, DrawerAppContent, DrawerContent, DrawerHeader, DrawerSubtitle, DrawerTitle} from 'rmwc/Drawer';

import {List, ListItem} from 'rmwc/List';
import {Link} from 'react-router-dom';


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
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Layout = ({children}) => {
  return (
    <Wrapper>
      <Drawer dismissible open={true}>
        <DrawerHeader>
          <DrawerTitle>Markdown</DrawerTitle>
          <DrawerSubtitle>A product by Jordy van Domselaar</DrawerSubtitle>
        </DrawerHeader>
        <DrawerContent>
          <List>
            <StyledLink to="/"><ListItem>Document overview</ListItem></StyledLink>
          </List>
        </DrawerContent>
      </Drawer>
      <DrawerAppContent style={{minHeight: '15rem', height: '100%'}}>
        <Content>
          {children}
        </Content>
      </DrawerAppContent>
    </Wrapper>
  );
};

export default Layout;
