import React from "react";
import moment from "moment";
import { FieldArray } from "formik";
import { Box, Button, Heading, List, ListItem, Divider } from "@chakra-ui/core";

// import { FormValues } from "../../interfaces";

import { billInterval } from "../../helpers/data";
import FieldSet from "../FieldSet";
import { FormikSingleDatePicker } from "../FormikDates";
import FormikSelect from "../FormikSelect";
import PrevNextNav from "./PrevNextNav";

const Bills = (props: any) => {
  const { values, setFieldValue, handleBlur, errors, touched } = props;
  const numRoommates = values.roommates.length;

  return (
    <Box as="section">
      <Heading as="h2">Bills: Utilities</Heading>
      <FieldArray name="bills">
        {arrayHelpers => (
          <div>
            <List as="ol" styleType="decimal">
              {values.bills.map((bill: any, index: number, arr: any) => (
                <ListItem key={index}>
                  {arr.length > 1 && (
                    <Button type="button" onClick={() => arrayHelpers.remove(index)}>
                      Remove
                    </Button>
                  )}
                  <FieldSet type="text" name={`bills.${index}.name`} label="Bill Name" />
                  <FieldSet type="number" name={`bills.${index}.totalAmt`} label="Total Amount" inputGroup={{ left: { addOn: "$" } }} />
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
                  
                  <FieldSet
                    type="number"
                    name={`bills.${index}.portion`}
                    label="Amount per Roommate"
                    isReadOnly={true}
                    value={values.bills[index].totalAmt ? (values.bills[index].totalAmt / numRoommates) : 0}
                  />

                  <Divider />
                </ListItem>
              ))}
            </List>
            <Button
              type="button"
              onClick={() =>
                arrayHelpers.push({ name: "", totalAmount: 0, dueDate: moment(), interval: [], portion: 0 })
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
