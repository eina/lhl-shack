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

  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <FormControl>
      <FormLabel>
        {label}
        <DateRangePicker
          startDate={stateValue.startDate}
          startDateId={`${name}-start`}
          endDate={stateValue.endDate}
          endDateId={`${name}-end`}
          onDatesChange={handleDatesChange}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput: any) => setFocusedInput(focusedInput)}
        />
      </FormLabel>
      {!!props.error && props.touched && <FormErrorMessage>{props.error}</FormErrorMessage>}
    </FormControl>
  );
};

export const FormikSingleDatePicker = (props: FormikDateProps) => {
  const { stateName, stateValue, onChange, label, name, numberOfMonths } = props;

  const handleDatesChange = (date: any) => {
    onChange(stateName, date);
  };

  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <FormControl>
      <FormLabel>
        {label}
        <SingleDatePicker
          id={name}
          date={stateValue}
          onDateChange={handleDatesChange}
          focused={focusedInput}
          onFocusChange={(focusedInput: any) => setFocusedInput(focusedInput)}
          numberOfMonths={numberOfMonths ? numberOfMonths : 2}
        />
      </FormLabel>
      {!!props.error && props.touched && <FormErrorMessage>{props.error}</FormErrorMessage>}
    </FormControl>
  );
};
