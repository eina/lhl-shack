import React from "react";
import { Formik, Form, FormikValues } from 'formik';
import { Box, Button } from "@chakra-ui/core";

import initialValues from '../components/HouseholdForm/initialValues';
import Household from "../components/HouseholdForm/Household";
import Landlord from "../components/HouseholdForm/Landlord";
import { householdForm } from '../components/AgreementForm/validationSchema';

const CreateHousehold = () => {

  return (
    <Box as="div" mt={3}>
      <Formik initialValues={initialValues} validationSchema={householdForm} onSubmit={(values: FormikValues) => {
        console.log(values);
      }}>
        <Form>
          <Landlord />
          <Household />
          <Button type="submit">Create Household</Button>
        </Form>
      </Formik>
    </Box>
  );
};
export default CreateHousehold;
