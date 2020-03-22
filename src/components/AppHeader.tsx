import React from "react";
import { Flex, Heading, Icon, Text } from "@chakra-ui/core";

type AppHeadProps = {
  currUser: any;
  fullName: string;
};

const AppHeader = ({ currUser, fullName }: AppHeadProps) => {
  return (
    <Flex as="header" align="center" p={10} bg="teal.500" color="white" justify="space-between">
      <Heading as="h1" size="lg">
        shack
      </Heading>
      {currUser && fullName ? (
        <Flex as="nav" align="center">
          <Icon name="bell" />
          <Text>{fullName}</Text>
        </Flex>
      ) : null}
    </Flex>
  );
};

export default AppHeader;
