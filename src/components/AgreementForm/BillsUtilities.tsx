import React, { useEffect } from "react";
import moment from "moment";
import { FieldArray } from "formik";
import { Box, Button, Heading, List, ListItem, Divider, Flex, FormLabel, Switch } from "@chakra-ui/core";

// import { FormValues } from "../../interfaces";

import { billInterval } from "../../helpers/data";
import FieldSet from "../FieldSet";
import { FormikSingleDatePicker } from "../FormikDates";
import FormikSelect from "../FormikSelect";
import PrevNextNav from "./PrevNextNav";

const Bills = (props: any) => {
  const { values, setFieldValue, handleBlur, errors, touched } = props;
  const numRoommates = values.roommates.length;

  useEffect(() => {
    // update bill portion when inputting total number
    values.bills.map((bill: any, index: number) => {
      setFieldValue(`bills[${index}].user_amount`, bill.total_amount / numRoommates);
    });
  }, [values.bills]);

  return (
    <Box as="section">
      <Heading as="h2">Bills</Heading>
      <FieldArray name="bills">
        {arrayHelpers => (
          <div>
            <List as="ol" styleType="decimal">
              {values.bills.map((bill: any, index: number, arr: any) => (
                <ListItem key={index}>
                  {arr.length > 2 && index > 1 && (
                    <Button type="button" onClick={() => arrayHelpers.remove(index)}>
                      Remove
                    </Button>
                  )}
                  <FieldSet
                    type="text"
                    name={`bills.${index}.name`}
                    label="Bill Name"
                    isReadOnly={index < 2}
                  />
                  <FieldSet
                    type="number"
                    name={`bills.${index}.total_amount`}
                    label="Total Amount"
                    inputGroup={{ left: { addOn: "$" } }}
                  />
                  <FormikSingleDatePicker
                    name={`bills.${index}.due_date`}
                    label="Due Date"
                    stateName={`bills.${index}.due_date`}
                    stateValue={values.bills[index].due_date}
                    onChange={setFieldValue}
                    numberOfMonths={1}
                    error={
                      errors && errors.bills && errors.bills[index] && errors.bills[index].due_date
                    }
                    touched={
                      touched &&
                      touched.bills &&
                      touched.bills[index] &&
                      touched.bills[index].due_date
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

                  <FieldSet
                    type="number"
                    name={`bills.${index}.user_amount`}
                    label="Amount per Roommate"
                    isReadOnly={true}
                    value={values.bills[index].total_amount / numRoommates}
                  />
                </ListItem>
              ))}
            </List>
            <Button
              type="button"
              onClick={() =>
                arrayHelpers.push({
                  name: "",
                  total_amount: 0,
                  due_date: moment(),
                  interval: [],
                  user_amount: 0
                })
              }
            >
              Add New Bill
            </Button>
          </div>
        )}
      </FieldArray>
      <Box as="footer">
        <PrevNextNav before="/agreement/bills/deposit" after="/agreement/housekeeping" />
      </Box>
    </Box>
  );
};

export default Bills;
