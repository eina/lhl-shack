import React from "react";
import { FieldArray, useFormikContext } from "formik";

import { FormValues } from "../../../interfaces";

import FieldSet from "../../FieldSet";
import FormikSelect from "../../FormikSelect";
import { FormikSingleDatePicker } from "../../FormikDates";
import { billInterval } from "../../../helpers/data";

const displayFullName = (firstName: string, lastName: string) => `${firstName} ${lastName}`;

const SplitRentAndDeposit = (props: any) => {
  const { sectionName, values, setFieldValue, handleBlur, errors, touched } = props;

  const roommateOptions = values.roommates.map((roomie: any) => ({
    value: roomie,
    label: displayFullName(roomie.firstName, roomie.lastName)
  }));

  return (
    <div>
      <FieldSet name={`${sectionName}.totalAmt`} label="Total Amount to Pay" type="number" />

      <FormikSingleDatePicker
        name={`${sectionName}.dueDate`}
        label="Due Date"
        stateName={`${sectionName}.dueDate`}
        stateValue={values[sectionName].dueDate}
        onChange={setFieldValue}
        numberOfMonths={1}
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
              {values.rent.portion.map((person: object, index: number) => (
                <li key={index}>
                  <FormikSelect
                    label="Roommate"
                    name={`${sectionName}.portion.${index}.roommate`}
                    stateName={`${sectionName}.portion.${index}.roommate`}
                    stateValue={values[sectionName].portion[index].roommate}
                    options={roommateOptions}
                    onChange={setFieldValue}
                    onBlur={handleBlur}
                    // touched={
                    //   touched[sectionName].portion[index] !== undefined
                    //     ? touched[sectionName].portion[index].roommate
                    //     : false
                    // }
                    // error={errors[sectionName] ? errors[sectionName].interval : null}
                  />
                  <FieldSet
                    type="number"
                    name={`${sectionName}.portion.${index}.roommate_amt`}
                    label="Amount to Pay"
                  />
                  <FormikSelect
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
                  />
                </li>
              ))}
            </ol>

            {/* add more roommates if  # of roommates =/= length of FieldArray */}
            {values.roommates.length > values.rent.portion.length && (
              <button
                type="button"
                onClick={() => arrayHelpers.push({ roommate: [], roommate_amt: 0, amt_type: [] })}
              >
                Add Roommate
              </button>
            )}
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default SplitRentAndDeposit;
