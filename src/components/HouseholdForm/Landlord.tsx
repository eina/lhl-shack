import React from "react";
import { Box, Heading } from "@chakra-ui/core";

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
  return (
    <Box as="section">
      <Heading as="h2">Landlord Contact Information</Heading>
      <FieldSet type="text" name="landlord.first_name" label="First Name" />
      <FieldSet type="text" name="landlord.last_name" label="Last Name" />
      <FieldSet type="text" name="landlord.address" label="Address" />
      <FieldSet type="email" name="landlord.email" label="Email" />
      <FieldSet type="tel" name="landlord.phone_number" label="Phone Number" />
      <FieldSet type="text" name="landlord.company" label="Property Management Company" />
    
    </Box>
  );
};

export default Landlord;
