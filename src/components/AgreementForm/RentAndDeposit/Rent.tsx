import React from "react";

import SplitRentAndDeposit from "./SplitRentAndDeposit";

import { Box, Heading } from "@chakra-ui/core";

import PrevNextNav from "../PrevNextNav";

const Rent = (props: any) => {
  return (
    <Box as="section">
      <Heading as="h2">Rent</Heading>
      <SplitRentAndDeposit sectionName="rent" {...props} />
      <Box as="footer">
        <PrevNextNav before="/agreement/roommates" after="/agreement/bills/deposit" />
      </Box>
    </Box>
  );
};

export default Rent;
