import React from "react";
import moment from "moment";
import { FieldArray } from "formik";

// import { FormValues } from "../../interfaces";

import FieldSet from "../FieldSet";
import { FormikSingleDatePicker } from "../FormikDates";
import FormikSelect from "../FormikSelect";

import { billInterval } from "../../helpers/data";

import { Button, Heading, List, ListItem, Divider } from "@chakra-ui/core";

import { useHistory } from "react-router-dom";

const Bills = (props: any) => {
  const { values, setFieldValue, handleBlur, errors, touched } = props;
  const numRoommates = values.roommates.length;
  const history = useHistory(); //for nav buttons

  return (
    <div>
      <Heading as="h2">Bills: Utilities</Heading>
      <FieldArray name="bills">
        {arrayHelpers => (
          <div>
            <List as="ol" styleType="decimal">
              {values.bills.map((bill: any, index: number) => (
                <ListItem key={index}>
                  {index > 0 && (
                    <Button type="button" onClick={() => arrayHelpers.remove(index)}>
                      Remove
                    </Button>
                  )}
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
                  <Divider />
                </ListItem>
              ))}
            </List>
            <Button
              type="button"
              onClick={() =>
                arrayHelpers.push({ name: "", totalAmount: 0, dueDate: moment(), interval: [] })
              }
            >
              Add New Bill
            </Button>
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
