import React from "react";
import { Field } from "formik";

import FieldSet from "../FieldSet";

const Landlord = () => {
  return (
    <div>
      <h2>Landlords</h2>
      <FieldSet type="text" name="landlord-name" label="First Name" />
      <Field type="text" name="landlord-name" placeholder="Full Name" required />;
      <Field type="text" name="address" placeholder="Address" required />;
      <Field type="text" name="email" placeholder="Email" required />;
      <Field type="text" name="phone" placeholder="Phone Number" required />;
      <Field type="text" name="company" placeholder="Property Management Company" />;
    </div>
  );
};

export default Landlord;
