import React from "react";
import { Link } from 'react-router-dom';
import { Flex, Heading, Icon, Text } from "@chakra-ui/core";

type AppHeadProps = {
  currUser: any;
  fullName: string;
};

const AppHeader = ({ currUser, fullName }: AppHeadProps) => {
  return (
    <Flex as="nav" align="center" justify="space-between" py="80px">
      <Link to="/agreement">Roommate Agreement Generator</Link>
      <Flex align="center">
        <Icon name="bell" />
        <Text>{fullName}</Text>
      </Flex>
    </Flex>
  );
};

export default AppHeader;
