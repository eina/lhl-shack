import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button, Box } from "@chakra-ui/core";
import { FiMenu, FiEdit3 } from "react-icons/fi";
import { brandButton } from '../chakra/customTheme';

type AppHeadProps = {
  currUser: any;
  fullName: string;
  drawerOpen: any;
};

const AppHeader = ({ currUser, fullName, drawerOpen }: AppHeadProps) => {
  return (
    <Flex as="nav" align="center" justify="space-between" py="64px">
      <Link to="/agreement">
        <Box as="span" fontWeight="bold" fontFamily="logo" fontSize="xl" color="brand">
          Roommate Agreement
        </Box>
        <Box as={FiEdit3} d="inline" ml={1} stroke="brand" />
      </Link>
      <Flex align="center">
        <Link to="/account" className="brand-link">{fullName}</Link>
        <Button onClick={drawerOpen} className="show-nav-btn" ml={3} {...brandButton}>
          <Box as={FiMenu} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default AppHeader;
