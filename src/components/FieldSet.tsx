import React, { Key } from "react";
import { useField } from "formik";
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/core";

type FieldSetConfig = {
  key?: Key;
  name: string;
  label: string;
  type: string;
};

const FieldSet = ({ label, ...props }: FieldSetConfig) => {
  console.log("what are these props", props);
  const [field, meta, helpers] = useField(props);

  return (
    <FormControl>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} />
      {meta.touched && meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default FieldSet;
