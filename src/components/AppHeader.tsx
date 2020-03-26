import React from "react";
import { Flex, Heading, Icon, Text } from "@chakra-ui/core";

type AppHeadProps = {
  currUser: any;
  fullName: string;
};

const AppHeader = ({ currUser, fullName }: AppHeadProps) => {
  return (
    <Flex as="nav" align="center" justify="flex-end" py="80px" lineHeight="65px" h="65px">
      <Icon name="bell" />
      <Text>{fullName}</Text>
    </Flex>
  );
};

export default AppHeader;
