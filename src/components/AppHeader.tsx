import React from "react";
import { Link } from 'react-router-dom';
import { Flex, Button, Icon, useDisclosure } from "@chakra-ui/core";

type AppHeadProps = {
  currUser: any;
  fullName: string;
  drawerOpen: any;
};

const AppHeader = ({ currUser, fullName, drawerOpen }: AppHeadProps) => {
  return (
    <Flex as="nav" align="center" justify="space-between" py="64px">
      <Link to="/agreement">Roommate Agreement Generator</Link>
      <Flex align="center">
        <Link to="/account">{fullName}</Link>
        <Button onClick={drawerOpen} className="show-nav-btn" ml={3}>Nav</Button>
      </Flex>
    </Flex>
  );
};

export default AppHeader;
