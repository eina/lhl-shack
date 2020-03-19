import React from "react";
import { Field } from "formik";

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
    <div>
      <h2>Landlord Contact Information</h2>
      <FieldSet type="text" name="landlord.firstName" label="First Name" />
      <FieldSet type="text" name="landlord.lastName" label="Last Name" />
      <FieldSet type="text" name="landlord.address" label="Address" />
      <FieldSet type="text" name="landlord.email" label="Email" />
      <FieldSet type="text" name="landlord.phone" label="Phone Number" />
      <FieldSet type="text" name="landlord.company" label="Property Management Company" />
    </div>
  );
};

export default Landlord;
