import React from "react";
import { FieldArray, useFormikContext } from "formik";

import { FormValues } from "../../interfaces";

import FieldSet from "../FieldSet";
import { FormikSingleDatePicker } from "../FormikDates";

const RentAndDeposit = (props: any) => {
  const { values, setFieldValue, handleBlur } = props;
  return (
    <div>
      <h2>Rent</h2>
      <FieldSet name="rent-amt" label="Rent Amount" type="number" />

      <FormikSingleDatePicker
        name="rent-due"
        label="Rent Due Date"
        stateName="rent.dueDate"
        stateValue={values.rent.dueDate}
        onChange={setFieldValue}
        numberOfMonths={1}
      />
      <FieldArray name="Rent-Portion">
        {arrayHelpers => (
          <div>
            {/* <ol>
              {values.RentAndDeposit.map((monies, index) => (
                <li key={index}>
                  <FieldSet
                    type="number"
                    name={`rentAndDeposits.${index}.rent`}
                    label="Total Monthly Rent Amount"
                  />
                  <FieldSet
                    type="number"
                    name={`rentAndDeposits.${index}.deposit`}
                    label="Total Security Deposit Amount"
                  />
                </li>
              ))}
            </ol> */}
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default RentAndDeposit;
