import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import NavigationPrompt from "react-router-navigation-prompt";
import { FormikProps, Formik, FormikValues } from "formik";

import { AppContext } from "../../Store";
import { formatHousekeepingToHTML } from "../../helpers/functions";
import initialValues, { formatDBInitialValues } from "./initialValues";
import validationSchema from "./validationSchema";
import submitAgreement from "./submitAgreement";

import FormLeavePrompt from "./FormLeavePrompt";
import AppLoading from "../AppLoading";

import Title from "./Title";
import LeaseDates from "./LeaseDates";
import Roommates from "./Roommates";
import Housekeeping from "./Housekeeping";
import BillsUtilities from "./BillsUtilities";
import Signatures from "./Signatures";
import Preview from "./AgreementPreview";
import { Box } from "@chakra-ui/core";

const AgreementForm = () => {
  const { state, updateState }: { state: any; updateState: any } = useContext(AppContext);
  const [initialVals, setInitialVals] = useState(initialValues);
  const [agreementID, setAgreementID] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [agreementMeta, setAgreementMeta] = useState({ created_at: null, updated_at: null});
  const history = useHistory();

  useEffect(() => {
    const getHouseholdDetails = (currUser: any) => {
      axios.get(`/api/agreements/${currUser.household}`).then(agreement => {
        setAgreementMeta({ created_at: agreement.data.created_at, updated_at: agreement.data.updated_at });
        // use agreement values as initial values if they exist
        const formValues =
          agreement.data && agreement.data.form_values ? agreement.data.form_values : null;
        if (formValues) {
          setAgreementID(agreement.data.id);
          setInitialVals(() => formatDBInitialValues(formValues));
        }
      });
    };

    if (state.currUser && !agreementID) {
      const { currUser } = state;
      const { first_name, last_name, phone_number, email } = currUser;
      setInitialVals((prev: any) => ({
        ...prev,
        roommates: [
          { first_name, last_name, phone_number, email },
          { first_name: "", last_name: "", phone_number: "", email: "" }
        ]
      }));

      getHouseholdDetails(state.currUser);
    }

    // grab household information

    // grab house information
  }, [state.currUser, agreementID, updateState]);

  useEffect(() => {
    if (state.currUser && state.currUser.landlord) {
      // grab landlord information
      axios.get(`/api/landlords/${state.currUser.landlord}`).then(landlord => {
        const { created_at, updated_at, ...contact } = landlord.data;
        updateState((prev: any) => ({ ...prev, landlord: contact }));
      });
    }

    if (state.currUser && state.currUser.house) {
      // grab house information
      axios.get(`/api/houses/${state.currUser.house}`).then(house => {
        const { address } = house.data;
        updateState((prev: any) => ({ ...prev, house: { address } }));
      });
    }

    if (state.currUser && state.currUser.household) {
      // grab household information
      axios.get(`/api/households/${state.currUser.household}`).then(household => {
        const { start_date } = household.data;
        updateState((prev: any) => ({ ...prev, household: { start_date } }));
      });
    }
  }, [state.currUser, updateState]);

  const { landlord, house, household } = state;

  const submitForm = (values: FormikValues, actions: any) => {
    const {
      currUser: { household: householdID, id: userID, house: houseID }
    } = state;
    submitAgreement({
      formVals: values,
      userID,
      houseID,
      householdID,
      agreementID,
      isComplete: true,
      previewDetails: { house, landlord, household, agreementMeta }
    }).then((link: any) => {
      console.log("hi link", link);
      updateState((prev: any) => ({ ...prev, agreementLink: link }));
      actions.setSubmitting(false);
      setSubmitSuccess(true);
      history.push("/agreement/preview");
    });
  };

  if (!state) {
    return <AppLoading />;
  }

  return (
    <Formik
      initialValues={initialVals}
      enableReinitialize={true}
      onSubmit={(values, actions) => submitForm(values, actions)}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
        handleBlur,
        initialValues,
        isSubmitting
      }: FormikProps<any>) => (
        <form onSubmit={handleSubmit}>
          <NavigationPrompt
            when={(_, next) => {
              // if initialValues === values --> you can navigate away cause nothing changed
              const valuesChanged = JSON.stringify(values) !== JSON.stringify(initialValues);
              // const goToPreview = next.pathname.startsWith("/agreement")
              return (
                !submitSuccess &&
                  valuesChanged &&
                  (!next || !next.pathname.startsWith("/agreement"))
              );
            }}
          >
            {({ onConfirm, onCancel }) => (
              <FormLeavePrompt
                when={true}
                onCancel={onCancel}
                onConfirm={onConfirm}
                currUser={state.currUser}
                formVals={values}
                agreementID={agreementID}
              />
            )}
          </NavigationPrompt>
          <Box maxW="80%">
            <Switch>
              <Route path="/agreement/title" component={Title} />
              <Redirect from="/agreement" to="/agreement/title" exact />
              {/* <Route path="/agreement/landlord" component={Landlord} />
            <Route path="/agreement/household" component={Household} /> */}
              <Route path="/agreement/lease" component={LeaseDates} />
              <Route path="/agreement/roommates" component={Roommates} />
              <Route path="/agreement/bills">
                <BillsUtilities
                  values={values}
                  setFieldValue={setFieldValue}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />
              </Route>
              <Route path="/agreement/housekeeping">
                <Housekeeping
                  values={values}
                  setFieldValue={setFieldValue}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />
              </Route>
              <Route path="/agreement/signatures">
                <Signatures
                  formIsSubmitting={isSubmitting}
                  initialValues={initialValues}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />
              </Route>
              <Route path="/agreement/preview">
                {house && landlord && household && (
                  <Preview
                    {...values}
                    agreementID={agreementID}
                    formattedHousekeeping={formatHousekeepingToHTML(values.housekeeping)}
                    landlord={landlord}
                    house={house}
                    household={household}
                    {...agreementMeta}
                  />
                )}
              </Route>
            </Switch>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AgreementForm;
