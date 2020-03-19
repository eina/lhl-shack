import React from "react";

import SplitRentAndDeposit from "./SplitRentAndDeposit";

const SecurityDeposit = (props: any) => {
  return (
    <>
      <h2>Security Deposit</h2>
      <SplitRentAndDeposit sectionName="securityDeposit" {...props} />
    </>
  );
};

export default SecurityDeposit;
