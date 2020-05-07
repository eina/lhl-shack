import React from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem } from "@chakra-ui/core";

const MainMenu = () => {
  return (
    <Box as="nav" fontSize="xl">
      <List>
        <ListItem>
          <Link to="/">Dashboard</Link>
        </ListItem>
        <ListItem>
          <Link to="/household">Household</Link>
        </ListItem>
        <ListItem>
          <Link to="/bills">Bills</Link>
        </ListItem>
        <ListItem>
          <Link to="/housekeeping">Housekeeping</Link>
        </ListItem>
        <ListItem>
          <Link to="/messages">Messages</Link>
        </ListItem>
        <ListItem>
          <Link to="/resources">Resources</Link>
        </ListItem>
        <ListItem>
          <Link to="/account">Account</Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default MainMenu;
