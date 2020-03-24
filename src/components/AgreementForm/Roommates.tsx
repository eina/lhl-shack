import React from "react";
import { FieldArray, useFormikContext } from "formik";
import { Box, Button, Heading, List, ListItem, Divider } from "@chakra-ui/core";

import { FormValues } from "../../interfaces";
import FieldSet from "../FieldSet";
import PrevNextNav from './PrevNextNav';

import { useHistory } from "react-router-dom";

const Roommates = () => {
  const history = useHistory();
  const { values }: { values: FormValues } = useFormikContext();
  return (
    <Box as="section">
      <Heading as="h2">Roommates</Heading>
      <FieldArray name="roommates">
        {arrayHelpers => (
          <div>
            <List as="ol" styleType="decimal">
              {values.roommates.map((_, index, array) => (
                <ListItem key={index}>
                  {array.length > 2 && (
                    <Button type="button" onClick={() => arrayHelpers.remove(index)}>
                      Remove
                    </Button>
                  )}
                  <FieldSet type="text" name={`roommates.${index}.first_name`} label="First Name" />
                  <FieldSet type="text" name={`roommates.${index}.last_name`} label="Last Name" />
                  <FieldSet type="email" name={`roommates.${index}.email`} label="Email" />
                  <FieldSet type="tel" name={`roommates.${index}.phone_number`} label="Phone" />
                  <Divider />
                </ListItem>
              ))}
            </List>
            <Button
              type="button"
              onClick={() =>
                arrayHelpers.push({
                  first_name: "",
                  last_name: "",
                  email: "",
                  phone_number: ""
                })
              }
            >
              Add Roommate
            </Button>
          </div>
        )}
      </FieldArray>

      <Box as="footer">
        <PrevNextNav before="/agreement/landlord" after="/agreement/bills/rent" />
      </Box>

    </Box>
  );
};

export default Roommates;
