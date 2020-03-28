import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody
} from "@chakra-ui/core";

import AppLogo from './AppLogo';

const AppMenuDrawer = ({ children, drawerIsOpen, drawerClose }: any) => (
  <Drawer isOpen={drawerIsOpen} placement="left" onClose={drawerClose}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <AppLogo />
      <DrawerBody>{children}</DrawerBody>
    </DrawerContent>
  </Drawer>
);

export default AppMenuDrawer;