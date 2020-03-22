import React from "react";

import SplitRentAndDeposit from "./SplitRentAndDeposit";

import { Button, Heading } from "@chakra-ui/core";

import { useHistory } from "react-router-dom";

const Rent = (props: any) => {
  const history = useHistory();
  return (
    <>
      <Heading as="h2">Rent</Heading>
      <SplitRentAndDeposit sectionName="rent" {...props} />
      <div>
        <Button
          // variantColor="orange"
          onClick={() => {
            history.push("/agreement/roommates");
          }}
        >
          Previous Section
        </Button>
        <Button
          // variantColor="pink"
          onClick={() => {
            history.push("/agreement/bills/deposit");
          }}
        >
          Next Section
        </Button>
      </div>
    </>
  );
};

export default Rent;
