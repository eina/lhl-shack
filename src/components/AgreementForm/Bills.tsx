import React from 'react'
import { FieldArray, useFormikContext } from "formik";
import { FormikSingleDatePicker } from "../FormikDates"
import { FormValues } from "../../interfaces";

import FieldSet from "../FieldSet";

const Bills = ( props: any ) => {
  const { values, setFieldValue, handleBlur } = props;
  return (
    <div>
      <h2>Bills</h2>
      <FieldArray name="bills">
        {arrayHelpers => (
          <div>
            <ol>
              {values.bills.map((bill: any, index: any) => (
                <li key={index}>
                  <FieldSet type="text" name={`bills.${index}.name`} label="Bill Name" />
                  <FieldSet type="number" name={`bills.${index}.totalAmount`} label="Total Amount" />
                  <FormikSingleDatePicker stateValue={values.bills[index].dueDate} stateName={`bills.${index}.dueDate`} name={`bills.${index}.dueDate`} onChange={setFieldValue} numberOfMonths={1} label="Due Date" />
                  <FieldSet type="text" name={`bills.${index}.interval`} label="Interval" />
                  <p>======== temporary line break ============</p>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() =>
                arrayHelpers.push({ name: "", totalAmount: 0, dueDate: "", interval: "" })
              }
            >
              Add New Bill
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default Bills;
