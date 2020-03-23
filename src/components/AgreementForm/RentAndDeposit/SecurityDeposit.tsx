import React from "react";

import SplitRentAndDeposit from "./SplitRentAndDeposit";

import { Button, Heading } from "@chakra-ui/core";

import { useHistory } from "react-router-dom";

const SecurityDeposit = (props: any) => {
  const history = useHistory();
  return (
    <>
      <Heading as="h2">Security Deposit</Heading>
      <SplitRentAndDeposit sectionName="securityDeposit" {...props} />
      <div>
        <Button
          variantColor="pink"
          onClick={() => {
            history.push("/agreement/bills/utilities");
          }}
        >
          Next Section
        </Button>
      </div>
    </>
  );
};

export default SecurityDeposit;
