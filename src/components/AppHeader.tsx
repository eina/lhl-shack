import React from "react";
import { Link } from 'react-router-dom';
import { Flex, Heading, Icon, Text } from "@chakra-ui/core";

type AppHeadProps = {
  currUser: any;
  fullName: string;
};

const AppHeader = ({ currUser, fullName }: AppHeadProps) => {
  return (
    <Flex as="nav" align="center" justify="space-between" py="64px">
      <Link to="/agreement">Roommate Agreement Generator</Link>
      <Link to="/account">{fullName}</Link>
      {/* <Flex align="center">
        <Icon name="bell" mr={3}/>
        <Text>{fullName}</Text>
      </Flex> */}
    </Flex>
  );
};

export default AppHeader;
