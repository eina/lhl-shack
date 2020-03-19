import React from "react";
import moment from "moment";
import { FieldArray, useFormikContext } from "formik";

import { FormValues } from "../../interfaces";

import FieldSet from "../FieldSet";
import { FormikSingleDatePicker } from "../FormikDates";
import FormikSelect from "../FormikSelect";

import { billInterval } from "../../helpers/data";

const Bills = (props: any) => {
  const { values, setFieldValue, handleBlur } = props;
  const numRoommates = values.roommates.length;
  // const billPerRoommate = (totalAmount: number) => {

  //   console.log(totalAmount, numRoommates);
  //   return totalAmount ? totalAmount / numRoommates : "";
  // };

  return (
    <div>
      <h2>Bills: Utilities</h2>
      <FieldArray name="bills">
        {arrayHelpers => (
          <div>
            <ol>
              {values.bills.map((bill: any, index: number) => (
                <li key={index}>
                  <FieldSet type="text" name={`bills.${index}.name`} label="Bill Name" />
                  <FieldSet type="number" name={`bills.${index}.totalAmt`} label="Total Amount" />
                  <FormikSingleDatePicker
                    name={`bills.${index}.dueDate`}
                    label="Due Date"
                    stateName={`bills.${index}.dueDate`}
                    stateValue={values.bills[index].dueDate}
                    onChange={setFieldValue}
                    numberOfMonths={1}
                  />
                  {/* <FieldSet type="date" name={`bills.${index}.dueDate`} label="Due Date" /> */}
                  <FormikSelect
                    label="Billing Cycle"
                    name={`bills.${index}.interval`}
                    stateName={`bills.${index}.interval`}
                    stateValue={values.bills[index].interval}
                    options={billInterval}
                    onChange={setFieldValue}
                    onBlur={handleBlur}
                  />
                  {/* {values.bills[index].totalAmount ? (
                    <p>total per roommate: ${values.bills[index].totalAmount / numRoommates}</p>
                  ) : null} */}
                  {values.bills[index].totalAmount ? (
                    <FieldSet
                      type="number"
                      name={`bills.${index}.totalAmount`}
                      label="Amount per Roommate"
                      isReadOnly={true}
                      value={values.bills[index].totalAmount / numRoommates}
                    />
                  ) : null}
                  <p>======== temporary line break ============</p>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() =>
                arrayHelpers.push({ name: "", totalAmount: 0, dueDate: moment(), interval: [] })
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
