import React from "react";
import { Link } from "react-router-dom";
import { ListItem, List, Heading } from "@chakra-ui/core";

const AgreementMenu = () => {
  return (
    <div>
      <Heading as="h1" mb={3}>
        Roommate Agreement Generator
      </Heading>
      <Link to="/">Back to Dashboard</Link>
      <List as="ol" styleType="decimal">
        <ListItem>
          <Link to="/agreement/household">House Information</Link>
        </ListItem>
        <ListItem>
          <Link to="/agreement/landlord">Landlord Information</Link>
        </ListItem>
        <ListItem>
          <Link to="/agreement/roommates">Roommates</Link>
        </ListItem>
        <ListItem>
          <Link to="/agreement/bills">Bills</Link>
          <List ml={4} styleType="disc">
            <ListItem>
              <Link to="/agreement/bills/rent">Bills: Rent</Link>
            </ListItem>
            <ListItem>
              <Link to="/agreement/bills/deposit">Bills: Security Deposit</Link>
            </ListItem>
            <ListItem>
              <Link to="/agreement/bills/utilities">Bills: Utilities</Link>
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Link to="/agreement/housekeeping">Housekeeping</Link>
        </ListItem>
        <ListItem>
          <Link to="/agreement/signatures">Signatures</Link>
        </ListItem>
      </List>
    </div>
  );
};

export default AgreementMenu;
