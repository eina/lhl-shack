import React, { Key } from "react";
import { useField } from "formik";
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/core";

type FieldSetConfig = {
  name: string;
  label: string;
  type: string;
  isReadOnly?: any;
  disabled?: any;
  value?: any;
};

const FieldSet = ({ label, value, ...props }: FieldSetConfig) => {
  const [field, meta, helpers] = useField(props);
  // const default
  return (
    <FormControl>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        value={value ? value : field.value || ""}
        isDisabled={props.disabled !== undefined ? props.disabled : false}
        isReadOnly={props.isReadOnly !== undefined ? props.isReadOnly : false}
      />
      {meta.touched && meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default FieldSet;
