import React, { Key } from "react";
import { useField } from "formik";
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/core";

type FieldSetConfig = {
  name: string;
  label: string;
  type: string;
};

const FieldSet = ({ label, ...props }: FieldSetConfig) => {
  const [field, meta, helpers] = useField(props);
  // const default
  return (
    <FormControl>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} value={field.value || ""} />
      {meta.touched && meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default FieldSet;
