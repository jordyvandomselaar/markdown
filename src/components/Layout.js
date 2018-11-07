import styled from 'styled-components';
import React, {useContext} from 'react';
import 'material-components-web/dist/material-components-web.min.css';
import 'material-icons';
import {BrowserView, MobileView} from 'react-device-detect';

import {Drawer, DrawerAppContent, DrawerContent, DrawerHeader, DrawerSubtitle, DrawerTitle} from 'rmwc/Drawer';

import {List, ListItem} from 'rmwc/List';
import {Link} from 'react-router-dom';
import {firebase} from '../firebase';
import UserContext from '../contexts/UserContext';

import {Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle} from 'rmwc/Toolbar';


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

const MobileLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  
  > div:first-child {
    flex: 1;
    overflow: auto;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const MobileNavList = styled(List)`
  display: flex;
  color: #FFF;
  
  a {
    color: #FFF;
  }
`;

const Layout = ({children, loading}) => {
  const user = useContext(UserContext);
  const MenuItems = () => (
    <>
      {user && <StyledLink to="/documents"><ListItem>Document overview</ListItem></StyledLink>}
      {user && <ListItem onClick={() => firebase.auth().signOut()}>Logout</ListItem>}
      {!user && <StyledLink to="/login"><ListItem>Login</ListItem></StyledLink>}
    </>
  );

  return (
    <Wrapper>
      {!loading && <>
        <BrowserView style={{width: '100%', height: '100%'}}>
          <Drawer dismissible open={true}>
            <DrawerHeader>
              <DrawerTitle>Markdown</DrawerTitle>
              <DrawerSubtitle>A product by Jordy van Domselaar</DrawerSubtitle>
            </DrawerHeader>
            <DrawerContent>
              <List>
                <MenuItems/>
              </List>
            </DrawerContent>
          </Drawer>
          <DrawerAppContent style={{minHeight: '15rem', height: '100%'}}>
            <Content>
              {children}
            </Content>
          </DrawerAppContent>
        </BrowserView>
        <MobileView
          style={{
            'height': '100%',
            'width': '100%',
          }}
        >
          <MobileLayout>
            <div>
              {children}
            </div>
            <div>
              <Toolbar>
                <ToolbarRow>
                  <ToolbarTitle>Markdown</ToolbarTitle>
                  <ToolbarSection>
                    <MobileNavList>
                      <MenuItems/>
                    </MobileNavList>
                  </ToolbarSection>
                </ToolbarRow>
              </Toolbar>
            </div>
          </MobileLayout>
        </MobileView>
      </>}
    </Wrapper>
  );
};

export default Layout;
