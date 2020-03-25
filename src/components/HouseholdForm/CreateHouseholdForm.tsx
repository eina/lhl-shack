import React, { useState, useEffect, useContext } from "react";
import { Button } from "@chakra-ui/core";
import axios from 'axios';
import { Formik, FormikValues, FormikProps } from 'formik';

import { AppContext } from "../../Store";

import initialValues from '../../components/HouseholdForm/initialValues';
import Household from "../../components/HouseholdForm/Household";
import Landlord from "../../components/HouseholdForm/Landlord";
import { householdForm } from '../../components/AgreementForm/validationSchema';

const CreateHouseholdForm = () => {
  const { state, updateState }: { state: any; updateState: Function } = useContext(AppContext);
  const { currUser } = state;

  const submitHousehold = (values: FormikValues, actions: any) => {
    const { id: userID } = currUser;
    const { leaseDates, ...house } = values.household;
    let landlordID: any;
    let houseID: any;
    
    axios.post('/api/landlords', values.landlord).then(landlord => {
      landlordID = landlord.data.id;
    }).then(() => axios.post('/api/houses', { ...house, landlord_id: landlordID }))
      .then(house => {
        houseID = house.data.id;
        const { startDate: start_date, endDate: end_date } = leaseDates;
        return axios.post('/api/households/', { start_date, end_date, house_id: houseID, user_id: userID, is_active: true });
      }).then(household => {
        console.log('is household data here', household.data);
        updateState((prev: any) => ({
          ...prev,
          currUser: {
            ...prev.currUser,
            household: household.data.id
          }
        }));
        actions.setSubmitting(false);
      });
  };

  console.log('hi state', state);

  return (
    <Formik initialValues={initialValues}  enableReinitialize={true} validationSchema={householdForm} onSubmit={(values, actions) => submitHousehold(values, actions)}>
      {({
        handleSubmit,
        isSubmitting
      }: FormikProps<any>) => (
        <form onSubmit={handleSubmit}>
          <Landlord />
          <Household />
          <Button type="submit" mt={5} mb={3} isLoading={isSubmitting} loadingText="Creating Household">Create Household</Button>
        </form>
      )}
    </Formik>
  );
};

export default CreateHouseholdForm;