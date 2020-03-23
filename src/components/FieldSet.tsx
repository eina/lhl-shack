import React from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightAddon,
  InputRightElement,
  InputLeftAddon,
  InputLeftElement,
  Checkbox,
  FormHelperText,
  FormErrorMessage
} from "@chakra-ui/core";

type FieldSetConfig = {
  name: string;
  label: string;
  type: string;
  isReadOnly?: any;
  disabled?: any;
  value?: any;
  formHelper?: string;
  inputGroup?: any;
};

const FieldSet = ({ label, type, value, ...props }: FieldSetConfig) => {
  const [field, meta, helpers] = useField(props);

  const InputRight = () => {
    if (props.inputGroup.right.addOn) {
      return <InputRightAddon>{props.inputGroup.right.addOn}</InputRightAddon>;
    } else {
      return <InputRightElement>{props.inputGroup.right.element}</InputRightElement>;
    }
  };

  const InputLeft = () => {
    if (props.inputGroup.left.addOn) {
      return <InputLeftAddon>{props.inputGroup.right.addOn}</InputLeftAddon>;
    } else {
      return <InputLeftElement>{props.inputGroup.right.element}</InputLeftElement>;
    }
  };

  return (
    <FormControl
      isInvalid={meta.touched && meta.error ? true : false}
      isDisabled={props.disabled !== undefined ? props.disabled : false}
    >
      <p>{value}</p>
      {type === "checkbox" ? (
        <Checkbox
          {...field}
          {...props}
          value={value ? value : field.value || ""}
          isChecked={value ? value : field.value || ""}
        >
          {label}
        </Checkbox>
      ) : (
        <>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <InputGroup>
            {props.inputGroup && props.inputGroup.left ? <InputLeft /> : null}
            <Input
              {...field}
              {...props}
              value={value ? value : field.value || ""}
              isReadOnly={props.isReadOnly !== undefined ? props.isReadOnly : false}
            />
            {props.inputGroup && props.inputGroup.right ? <InputRight /> : null}
          </InputGroup>
        </>
      )}
      {props.formHelper ? <FormHelperText>{props.formHelper}</FormHelperText> : null}
      {meta.touched && meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default FieldSet;
