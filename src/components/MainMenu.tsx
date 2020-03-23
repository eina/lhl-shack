import React from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem } from "@chakra-ui/core";

const MainMenu = () => {
  return (
    <Box as="nav">
      <List>
        <ListItem>
          <Link to="/">Dashboard</Link>
        </ListItem>
        <ListItem>
          <Link to="/account">Account</Link>
        </ListItem>
        <ListItem>
        <Link to="/household">Household</Link>
        </ListItem>
        <ListItem>
          <Link to="/test">Test</Link>
        </ListItem>
        <ListItem>
          <Link to="/agreement">Roommate Agreement Generator</Link>
        </ListItem>
        <ListItem>
          <Link to="/resources">Resources</Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default MainMenu;
