import React from "react";
import { Field } from "formik";

const Info = () => {
  return (
    <div>
      <h1>Add your address!</h1>
      <Field type="text" name="address" placeholder="Address" />
    </div>
  );
};

export default Info;
