import React from "react";
import { Field } from "formik";

const Landlord = () => {
  return (
    <div>
      <h1>Landlords!</h1>
      <Field type="text" name="address" placeholder="Address" />
    </div>
  );
};

export default Landlord;
