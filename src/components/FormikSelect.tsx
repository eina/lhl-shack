// formik + react-select
import React from "react";
import Select from "react-select";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/core";

interface FormikSelectProps {
  stateName: string;
  stateValue: any;
  onChange: Function;
  onBlur: Function;
  label: string;
  name: string;
  options: any;
  multi?: Boolean;
  error?: any;
  touched?: any;
}

const FormikSelect = (props: FormikSelectProps) => {
  const { stateName, stateValue, onChange, onBlur, label, name, options } = props;

  const handleChange = (value: any) => {
    // this is going to call setFieldValue and manually update values.[stateName]
    onChange(stateName, value);
  };

  const handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.[stateName]
    onBlur(stateName, true);
  };

  return (
    <FormControl isInvalid={!!props.error && props.touched}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select options={options} onChange={handleChange} onBlur={handleBlur} value={stateValue} />
      {!!props.error && props.touched && <FormErrorMessage>{props.error.value}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormikSelect;
