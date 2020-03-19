import React from "react";
import { FieldArray, useFormikContext } from "formik";

import { FormValues } from "../../interfaces";

import FieldSet from "../FieldSet";
import FormikSelect from "../FormikSelect";
import { FormikSingleDatePicker } from "../FormikDates";

const displayFullName = (firstName: string, lastName: string) => `${firstName} ${lastName}`;

const billInterval = [
  { label: "Once", value: "once" },
  { label: "Monthly", value: "monthly" },
  { label: "Every 2 Months", value: "2monthly" },
  { label: "Annually", value: "annually" }
];

const RentAndDeposit = (props: any) => {
  const { values, setFieldValue, handleBlur } = props;

  const roommateOptions = values.roommates.map((roomie: any) => ({
    value: roomie,
    label: displayFullName(roomie.firstName, roomie.lastName)
  }));

  return (
    <div>
      <h2>Rent</h2>
      <FieldSet name="rent-amt" label="Total Rent Amount" type="number" />

      <FormikSingleDatePicker
        name="rent.dueDate"
        label="Rent Due Date"
        stateName="rent.dueDate"
        stateValue={values.rent.dueDate}
        onChange={setFieldValue}
        numberOfMonths={1}
      />

      <FormikSelect
        label="Billing Cycle"
        name={`rent.interval`}
        stateName={`rent.interval`}
        stateValue={values.rent.interval}
        options={billInterval}
        onChange={setFieldValue}
        onBlur={handleBlur}
      />
      <FieldArray name="rent.portion">
        {arrayHelpers => (
          <div>
            <ol>
              {values.rent.portion.map((person: object, index: number) => (
                <li key={index}>
                  <FormikSelect
                    label="Roommate"
                    name={`rent.portion.${index}.roommate`}
                    stateName={`rent.portion.${index}.roommate`}
                    stateValue={values.rent.portion[index].roommate}
                    options={roommateOptions}
                    onChange={setFieldValue}
                    onBlur={handleBlur}
                  />
                  <FieldSet
                    type="number"
                    name={`rent.portion.${index}.roommate_amt`}
                    label="Amount to Pay"
                  />
                  <FormikSelect
                    label="Fixed/Percent"
                    name={`rent.portion.${index}.amt_type`}
                    stateName={`rent.portion.${index}.amt_type`}
                    stateValue={values.rent.portion[index].amt_type}
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

export default RentAndDeposit;
