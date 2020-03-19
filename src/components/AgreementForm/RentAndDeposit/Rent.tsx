import React from "react";

import SplitRentAndDeposit from "./SplitRentAndDeposit";

const Rent = (props: any) => {
  return (
    <>
      <h2>Rent</h2>
      <SplitRentAndDeposit sectionName="rent" {...props} />
    </>
  );
};

export default Rent;
