import React, { useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { v4 as uuidV4 } from "uuid";
import { FieldArray } from "formik";
import { Box, Button, Heading, Text, Grid, Flex } from "@chakra-ui/core";

import { AppContext } from '../../Store';
import { billInterval } from "../../helpers/data";
import FieldSet from "../FieldSet";
import { FormikSingleDatePicker } from "../FormikDates";
import FormikSelect from "../FormikSelect";
import PrevNextNav from "./PrevNextNav";


const Bills = (props: any) => {
  const { state: { currUser } }: { state: any } = useContext(AppContext);
  const { values, setFieldValue, handleBlur, errors, touched } = props;
  const numRoommates = values.roommates.length;

  useEffect(() => {
    // update bill portion when inputting total number
    values.bills.map((bill: any, index: number) => setFieldValue(`bills[${index}].user_amount`, bill.total_amount / numRoommates));
  }, [values.bills, numRoommates, setFieldValue]);

  type DeleteBillTypes = {
    arrayRemove: CallableFunction;
    index: number;
    bill: any;
  }

  const deleteBill = ({ arrayRemove, index, bill }: DeleteBillTypes) => {
    if (currUser && currUser.household) {
      axios.get(`/api/bills`, { params: { household: currUser.household, bill_uuid: bill.bill_uuid } })
        .then(billsReturned => {
          return billsReturned.data.map((billReturned: any) => axios.delete(`/api/bills/${billReturned.id}`));
        })
        .then(billsPromises => Promise.all(billsPromises))
        .then(deletedBills => {
          if (deletedBills.length === numRoommates) {
            return arrayRemove(index);
          } else {
            throw new Error('Error deleting');
          }
        });
    } else {
      arrayRemove(index);
    }
  };

  return (
    <Box as="section">
      <Heading as="h2">Bills</Heading>
      <FieldArray name="bills">
        {arrayHelpers => (
          <div>
            <Box>
              {values.bills.map((bill: any, index: number, arr: any) => (
                <Grid key={index} templateColumns="2em 4fr" mb={8}>
                  <Text fontSize="md">{index + 1}.</Text>
                  <div>
                    {arr.length > 2 && index > 1 && (
                      <Button
                        type="button"
                        onClick={() =>
                          deleteBill({ arrayRemove: arrayHelpers.remove, index, bill })
                        }
                      >
                        Remove
                      </Button>
                    )}
                    <FieldSet
                      type="text"
                      name={`bills.${index}.name`}
                      label="Bill Name"
                      isReadOnly={index < 2}
                    />
                    <Box d="none">
                      <FieldSet
                        type="text"
                        name={`bills.${index}.bill_uuid`}
                        label="Bill ID"
                        isReadOnly={true}
                      />
                    </Box>
                    <FieldSet
                      type="number"
                      name={`bills.${index}.total_amount`}
                      label="Total Amount"
                      inputGroup={{ left: { addOn: "$" } }}
                    />
                    <Flex w="600px" mb={3}>
                      <FormikSingleDatePicker
                        name={`bills.${index}.due_date`}
                        label="Due Date"
                        stateName={`bills.${index}.due_date`}
                        stateValue={values.bills[index].due_date}
                        onChange={setFieldValue}
                        numberOfMonths={1}
                        error={
                          errors &&
                          errors.bills &&
                          errors.bills[index] &&
                          errors.bills[index].due_date
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
                          errors &&
                          errors.bills &&
                          errors.bills[index] &&
                          errors.bills[index].interval
                        }
                        touched={
                          touched &&
                          touched.bills &&
                          touched.bills[index] &&
                          touched.bills[index].interval
                        }
                      />
                    </Flex>

                    <FieldSet
                      type="number"
                      name={`bills.${index}.user_amount`}
                      label="Amount per Roommate"
                      isReadOnly={true}
                      value={values.bills[index].total_amount / numRoommates}
                      inputGroup={{ left: { addOn: "$" } }}
                    />
                  </div>
                </Grid>
              ))}
            </Box>
            <Button
              type="button"
              onClick={() =>
                arrayHelpers.push({
                  name: "",
                  total_amount: 0,
                  due_date: moment(),
                  interval: [],
                  user_amount: 0,
                  bill_uuid: uuidV4()
                })
              }
            >
              Add New Bill
            </Button>
          </div>
        )}
      </FieldArray>
      <Box as="footer" my={10}>
        <PrevNextNav before="/agreement/bills/deposit" after="/agreement/housekeeping" />
      </Box>
    </Box>
  );
};

export default Bills;
