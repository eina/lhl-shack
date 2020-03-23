import React from "react";
import { FieldArray } from "formik";
import { Button } from "@chakra-ui/core";
// import { FormValues } from "../../../interfaces";
import { displayFullName } from "../../../helpers/functions";

import FieldSet from "../../FieldSet";
import FormikSelect from "../../FormikSelect";
import { FormikSingleDatePicker } from "../../FormikDates";
import { billInterval } from "../../../helpers/data";

const SplitRentAndDeposit = (props: any) => {
  const { sectionName, values, setFieldValue, handleBlur, errors, touched } = props;

  const roommateOptions = values.roommates.map((roomie: any) => ({
    value: roomie,
    label: displayFullName(roomie.firstName, roomie.lastName)
  }));

  const errorObj = errors && errors[sectionName];
  const touchedObj = touched && touched[sectionName];

  return (
    <div>
      <FieldSet
        name={`${sectionName}.totalAmt`}
        label="Total Amount to Pay"
        type="number"
        value={values.household[`${sectionName}Amt`]}
        inputGroup={{ left: { addOn: "$" } }}
        isReadOnly={true}
      />

      <FormikSingleDatePicker
        name={`${sectionName}.dueDate`}
        label="Due Date"
        stateName={`${sectionName}.dueDate`}
        stateValue={values[sectionName].dueDate}
        onChange={setFieldValue}
        numberOfMonths={1}
        error={errorObj}
        touched={touchedObj}
      />

      <FormikSelect
        label="Billing Cycle"
        name={`${sectionName}.interval`}
        stateName={`${sectionName}.interval`}
        stateValue={values[sectionName].interval}
        options={billInterval}
        onChange={setFieldValue}
        onBlur={handleBlur}
        touched={touched[sectionName] !== undefined ? touched[sectionName].interval : false}
        error={errors[sectionName] ? errors[sectionName].interval : null}
      />

      <FieldArray name={`${sectionName}.portion`}>
        {arrayHelpers => (
          <div>
            <ol>
              {values[sectionName].portion.map((person: object, index: number, arr: any) => (
                <li key={index}>
                  {(arr.length > 2) && (
                    <Button type="button" onClick={() => arrayHelpers.remove(index)}>
                      Remove
                    </Button>
                  )}
                  <FormikSelect
                    label="Roommate"
                    name={`${sectionName}.portion.${index}.roommate`}
                    stateName={`${sectionName}.portion.${index}.roommate`}
                    stateValue={values[sectionName].portion[index].roommate}
                    options={roommateOptions}
                    onChange={setFieldValue}
                    onBlur={handleBlur}
                  />
                  <FieldSet
                    type="number"
                    name={`${sectionName}.portion.${index}.roommate_amt`}
                    label="Amount to Pay"
                    inputGroup={{ left: { addOn: "$" } }}
                  />
                  {/* <FormikSelect
                    label="Fixed/Percent"
                    name={`${sectionName}.portion.${index}.amt_type`}
                    stateName={`${sectionName}.portion.${index}.amt_type`}
                    stateValue={values[sectionName].portion[index].amt_type}
                    options={[
                      { label: "%", value: "percent" },
                      { label: "$", value: "fixed" }
                    ]}
                    onChange={setFieldValue}
                    onBlur={handleBlur}
                  /> */}
                </li>
              ))}
            </ol>

            {/* add more roommates if  # of roommates =/= length of FieldArray */}
            {values.roommates.length > values[sectionName].portion.length && (
              <Button
                type="button"
                onClick={() => {
                  console.log("puuuush");
                  arrayHelpers.push({ roommate: [], roommate_amt: 0, amt_type: [] });
                }}
              >
                Add Roommate
              </Button>
            )}
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default SplitRentAndDeposit;
