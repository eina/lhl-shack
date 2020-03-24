import React, {useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Formik, Form, FormikValues, FormikProps } from 'formik';
import { Box, Button } from "@chakra-ui/core";

import { AppContext } from '../context/appContext';

import initialValues from '../components/HouseholdForm/initialValues';
import Household from "../components/HouseholdForm/Household";
import Landlord from "../components/HouseholdForm/Landlord";
import { householdForm } from '../components/AgreementForm/validationSchema';

const CreateHousehold = () => {
  const { state, updateState }: { state: any; updateState: Function } = useContext(AppContext);
  
  const submitHousehold = (values: FormikValues, actions: any) => {
    const { currUser } = state;
    console.log('household valueeeees', values);
    // grab the user id
    // save the landlord
    axios.post('/api/landlords', values.landlord).then(data => {
      console.log('landlord data submitted', data);
      actions.setSubmitting(false);
    });
    // save the house
    // create the household with user id
    // set household id as household in global context
  };

  console.log('hello???', initialValues);
  return (
    <Box as="div" mt={3}>
      <Formik initialValues={initialValues} validationSchema={householdForm} onSubmit={(values: FormikValues, actions: any) => submitHousehold(values, actions)}>
        {({
          values,
          errors,
          handleSubmit,
          isSubmitting
        }: FormikProps<any>) => (
          <form onSubmit={handleSubmit}>
            {JSON.stringify(errors)}
            <Landlord />
            <Household />
            <Button type="submit" mt={5} mb={3} isLoading={isSubmitting}
              loadingText="Creating Household">Create Household</Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};
export default CreateHousehold;
