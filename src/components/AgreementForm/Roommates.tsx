import React from "react";
import { FieldArray, useFormikContext } from "formik";

import { FormValues } from "../../interfaces";

import FieldSet from "../FieldSet";

import { Button, Heading, List, ListItem, Divider } from "@chakra-ui/core";

import { useHistory } from "react-router-dom";

const Roommates = () => {
  const history = useHistory();
  const { values }: { values: FormValues } = useFormikContext();
  return (
    <div>
      <Heading as="h2">Roommates</Heading>
      <FieldArray name="roommates">
        {arrayHelpers => (
          <div>
            <List as="ol" styleType="decimal">
              {values.roommates.map((_, index) => (
                <ListItem key={index}>
                  {index > 0 && (
                    <Button type="button" onClick={() => arrayHelpers.remove(index)}>
                      Remove
                    </Button>
                  )}
                  <FieldSet type="text" name={`roommates.${index}.firstName`} label="First Name" />
                  <FieldSet type="text" name={`roommates.${index}.lastName`} label="Last Name" />
                  <FieldSet type="text" name={`roommates.${index}.email`} label="Email" />
                  <FieldSet type="text" name={`roommates.${index}.phone`} label="Phone" />
                  <Divider />
                </ListItem>
              ))}
            </List>
            <Button
              type="button"
              onClick={() =>
                arrayHelpers.push({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: ""
                })
              }
            >
              Add Roommate
            </Button>
          </div>
        )}
      </FieldArray>
      <div>
        <Button
          // variantColor="orange"
          onClick={() => {
            history.push("/agreement/landlord");
          }}
        >
          Previous Section
        </Button>
        <Button
          // variantColor="pink"
          onClick={() => {
            history.push("/agreement/bills/rent");
          }}
        >
          Next Section
        </Button>
      </div>
    </div>
  );
};

export default Roommates;
