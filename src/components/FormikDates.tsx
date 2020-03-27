// formik + react-dates
import React, { useState } from "react";
import { DateRangePicker, SingleDatePicker } from "react-dates";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/core";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

interface FormikDateProps {
  stateName: string;
  stateValue: any;
  onChange: Function;
  label: string;
  name: string;
  numberOfMonths?: number;
  error?: any;
  touched?: any;
}

interface DateProps {
  startDate: any;
  endDate: any;
}

export const FormikDateRange = (props: FormikDateProps) => {
  const { stateName, stateValue, onChange, label, name } = props;

  const handleDatesChange = ({ startDate, endDate }: DateProps) => {
    onChange(`${stateName}.startDate`, startDate);
    onChange(`${stateName}.endDate`, endDate);
  };

  const [focusedSingleInput, setFocusedSingleInput] = useState(null);

  const fieldError = props.error && props.error[name] ? props.error[name] : null;
  const isTouched =
    props.touched && props.touched[name] && props.touched[name].startDate
      ? props.touched[name].startDate
      : null;
  const isError = props.error && isTouched ? true : false;

  return (
    <FormControl isInvalid={!!isError && fieldError}>
      <FormLabel>
        <div>{label}</div>
        <DateRangePicker
          startDate={stateValue.start_date}
          startDateId={`${name}-start`}
          endDate={stateValue.end_date}
          endDateId={`${name}-end`}
          onDatesChange={handleDatesChange}
          focusedInput={focusedSingleInput}
          onFocusChange={(focusedInput: any) => setFocusedSingleInput(focusedInput)}
        />
      </FormLabel>
      {!!isError && fieldError && <FormErrorMessage>{fieldError.startDate}</FormErrorMessage>}
    </FormControl>
  );
};

export const FormikSingleDatePicker = (props: FormikDateProps) => {
  const { stateName, stateValue, onChange, label, name, numberOfMonths } = props;
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = (date: any) => {
    onChange(stateName, date);
  };

  const checkFieldError = stateName.split(".").reduce((prev, curr, index) => {
    return `${prev}[${curr}]`;
  });

  const fieldError =
    props.error && props.error[checkFieldError] ? props.error[checkFieldError] : null;
  const isTouched = props.touched && props.touched[name] ? props.touched[name] : null;
  const isError = props.error && isTouched ? true : false;

  // console.log({ stateName, checkFieldError, fieldError, isTouched });
  // console.log(props.error);

  return (
    <FormControl isInvalid={!!isError && fieldError}>
      <FormLabel>
        <div>{label}</div>
        <SingleDatePicker
          id={name}
          date={stateValue}
          onDateChange={handleDatesChange}
          focused={focusedInput}
          onFocusChange={(focusedInput: any) => setFocusedInput(focusedInput.focused)}
          numberOfMonths={numberOfMonths ? numberOfMonths : 2}
        />
      </FormLabel>
      {!!isError && fieldError && <FormErrorMessage>{fieldError}</FormErrorMessage>}
    </FormControl>
  );
};
