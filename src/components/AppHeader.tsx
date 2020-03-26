import React from "react";
import { Flex, Heading, Icon, Text } from "@chakra-ui/core";

type AppHeadProps = {
  currUser: any;
  fullName: string;
};

const AppHeader = ({ currUser, fullName }: AppHeadProps) => {
  return (
    <Flex as="header" align="center" justify="space-between" py={10}>
      <Heading as="h1" size="lg" fontFamily="logo" fontSize="6xl" fontWeight="black">
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
