import React from "react";
import { FieldArray, useFormikContext } from "formik";
import { Box, Button, Heading, Text, Grid } from "@chakra-ui/core";

import { FormValues } from "../../interfaces";
import FieldSet from "../FieldSet";
import PrevNextNav from './PrevNextNav';

// import { useHistory } from "react-router-dom";

const Roommates = () => {
  const { values }: { values: FormValues } = useFormikContext();
  return (
    <Box as="section">
      <Heading as="h2">Roommates</Heading>
      <FieldArray name="roommates">
        {arrayHelpers => (
          <div>
            <Box>
              {values.roommates.map((_, index, array) => (
                <Grid key={index} templateColumns="2em 4fr" mb={5}>
                  <Text fontSize="md">{index + 1}.</Text>
                  <div>
                    {array.length > 2 && (
                      <Button type="button" onClick={() => arrayHelpers.remove(index)}>
                        Remove
                      </Button>
                    )}
                    <FieldSet
                      type="text"
                      name={`roommates.${index}.first_name`}
                      label="First Name"
                    />
                    <FieldSet type="text" name={`roommates.${index}.last_name`} label="Last Name" />
                    <FieldSet type="email" name={`roommates.${index}.email`} label="Email" />
                    <FieldSet type="tel" name={`roommates.${index}.phone_number`} label="Phone" />
                  </div>
                </Grid>
              ))}
            </Box>

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

      <Box as="footer" my={10}>
        <PrevNextNav before="/agreement/lease" after="/agreement/bills/rent" />
      </Box>
    </Box>
  );
};

export default Roommates;
