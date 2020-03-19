import React from "react";
import moment from "moment";
import { FieldArray } from "formik";

// import { FormValues } from "../../interfaces";

import FieldSet from "../FieldSet";
import { FormikSingleDatePicker } from "../FormikDates";
import FormikSelect from "../FormikSelect";

import { billInterval } from "../../helpers/data";

import { Button } from "@chakra-ui/core";

import { useHistory } from "react-router-dom";

const Bills = (props: any) => {
  const { values, setFieldValue, handleBlur, errors, touched } = props;
  const numRoommates = values.roommates.length;
  const history = useHistory(); //for nav buttons

  // const billPerRoommate = (totalAmount: number) => {

  //   console.log(totalAmount, numRoommates);
  //   return totalAmount ? totalAmount / numRoommates : "";
  // };

  // console.log({ errors: errors && errors.bills, touched: touched && touched.bills });
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
                    error={
                      errors && errors.bills && errors.bills[index] && errors.bills[index].dueDate
                    }
                    touched={
                      touched &&
                      touched.bills &&
                      touched.bills[index] &&
                      touched.bills[index].dueDate
                    }
                  />
                  <FormikSelect
                    label="Billing Cycle"
                    name={`bills.${index}.interval`}
                    stateName={`bills.${index}.interval`}
                    stateValue={values.bills[index].interval}
                    options={billInterval}
                    onChange={setFieldValue}
                    onBlur={handleBlur}
                    error={
                      errors && errors.bills && errors.bills[index] && errors.bills[index].interval
                    }
                    touched={
                      touched &&
                      touched.bills &&
                      touched.bills[index] &&
                      touched.bills[index].interval
                    }
                  />
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
      <div>
        <Button
          variantColor="orange"
          onClick={() => {
            history.push("/agreement/bills/deposit");
          }}
        >
          Previous Section
        </Button>
        <Button
          variantColor="pink"
          onClick={() => {
            history.push("/agreement/housekeeping");
          }}
        >
          Next Section
        </Button>
      </div>
    </div>
  );
};

export default Bills;
