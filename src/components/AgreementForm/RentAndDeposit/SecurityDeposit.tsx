import React from "react";

import SplitRentAndDeposit from "./SplitRentAndDeposit";

import { Box, Heading } from "@chakra-ui/core";

import PrevNextNav from "../PrevNextNav";

const SecurityDeposit = (props: any) => {
  return (
    <Box as="section">
      <Heading as="h2">Security Deposit</Heading>
      <SplitRentAndDeposit sectionName="securityDeposit" {...props} />

      <Box as="footer">
        <PrevNextNav before="/agreement/bills/rent" after="/agreement/bills/utilities" />
      </Box>
    </Box>
  );
};

export default SecurityDeposit;
