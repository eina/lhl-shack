import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Box, Button, Heading, Grid, Text } from "@chakra-ui/core";
import { FieldArray } from "formik";

import { brandButton } from '../../chakra/customTheme';
import { FormikSingleDatePicker } from "../FormikDates";
import { displayFullName } from "../../helpers/functions";
import FieldSet from "../FieldSet";
import PrevNextNav from './PrevNextNav';

const Signatures = (props: any) => {
  const { initialValues, values, setFieldValue, errors, touched, formIsSubmitting } = props;
  const history = useHistory();
  const valuesChanged = JSON.stringify(values) !== JSON.stringify(initialValues);
  const roommateName = values.roommates.map((roomie: any) =>
    displayFullName(roomie.first_name, roomie.last_name)
  );

  return (
    <Box as="section">
      <Heading as="h2">Signatures</Heading>
      <FieldArray name="signatures">
        {arrayHelpers => (
          <div>
            <Box>
              {values.signatures.map((signature: any, index: any, array: any) => (
                <Grid key={index} templateColumns="2em 4fr" mb={5}>
                  <Text fontSize="md">{index + 1}.</Text>
                  <div>
                    {array.length > values.roommates.length && (
                      <Button type="button" onClick={() => arrayHelpers.remove(index)}>
                        Remove
                      </Button>
                    )}

                    <FormikSingleDatePicker
                      stateValue={values.signatures[index].date}
                      stateName={`signatures.${index}.date`}
                      name={`signatures.${index}.date`}
                      onChange={setFieldValue}
                      numberOfMonths={1}
                      label="Date Signed"
                      error={
                        errors &&
                        errors.signatures &&
                        errors.signatures[index] &&
                        errors.signatures[index].date
                      }
                      touched={
                        touched &&
                        touched.signatures &&
                        touched.signatures[index] &&
                        touched.signatures[index].date
                      }
                    />
                    
                    <FieldSet
                      type="text"
                      name={`signatures.${index}.fullName`}
                      label={roommateName[index]}
                      formHelper={`Please match name inputted with ${roommateName[index]}`}
                    />

                    <FieldSet
                      type="checkbox"
                      name={`signatures.${index}.agreed`}
                      label="I have agreed to what has been written in this agreement."
                    />
                  </div>
                </Grid>
              ))}
            </Box>
            {values.roommates.length > values.signatures.length && (
              <Button
                type="button"
                onClick={() => arrayHelpers.push({ fullName: "", agreed: false, date: moment() })}
                {...brandButton}
              >
                Add Signature
              </Button>
            )}
          </div>
        )}
      </FieldArray>

      <Box as="footer" my={10}>
        {/* <Button isLoading={formIsSubmitting} loadingText="Generating Preview" type="submit">
          Save &amp; Preview Agreement
        </Button> */}
        <PrevNextNav before="/agreement/bills/utilities">
          {valuesChanged ? (
            <Button isLoading={formIsSubmitting} loadingText="Generating Preview" type="submit" {...brandButton}>
              Save &amp; Preview Agreement
            </Button>
          ) : (
            <Button type="button" onClick={() => history.push("/agreement/preview")} {...brandButton}>
              Preview Agreement
            </Button>
          )}
        </PrevNextNav>
      </Box>
    </Box>
  );
};

export default Signatures;
