import React from "react";
import { Button } from "@chakra-ui/core";

import { useHistory } from "react-router-dom";

import FieldSet from "../FieldSet";
export interface LandlordValues {
  landlordFirsttName: string;
  landlordLastName: string;
  address: string;
  email: string;
  phone: string;
  company: string;
}
const Landlord = () => {
  const history = useHistory();
  return (
    <div>
      <h2>Landlord Contact Information</h2>
      <FieldSet type="text" name="landlord.firstName" label="First Name" />
      <FieldSet type="text" name="landlord.lastName" label="Last Name" />
      <FieldSet type="text" name="landlord.address" label="Address" />
      <FieldSet type="text" name="landlord.email" label="Email" />
      <FieldSet type="text" name="landlord.phone" label="Phone Number" />
      <FieldSet type="text" name="landlord.company" label="Property Management Company" />

      <Button
        variantColor="orange"
        onClick={() => {
          history.push("/agreement/info");
        }}
      >
        Previous Section
      </Button>
      <Button
        variantColor="pink"
        onClick={() => {
          history.push("/agreement/roommates");
        }}
      >
        Next Section
      </Button>
    </div>
  );
};

export default Landlord;
