import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Switch, Route, Prompt, Redirect } from "react-router-dom";
import NavigationPrompt from "react-router-navigation-prompt";
import { FormikProps, Formik, FormikValues } from "formik";
import { Button } from "@chakra-ui/core";
import moment from "moment";

import { AppContext } from "../../Store";
import { stringDraftJS } from "../../helpers/data";
import { stringEditorStateToContent } from "../../helpers/functions";
import initialValues, { formatDBInitialValues } from "../../components/AgreementForm/initialValues";
import validationSchema from "../../components/AgreementForm/validationSchema";

import FormLeavePrompt from "./FormLeavePrompt";
import AppLoading from "../AppLoading";

import Household from "../../components/AgreementForm/Household";
import Landlord from "../../components/AgreementForm/Landlord";
import Roommates from "../../components/AgreementForm/Roommates";
import Housekeeping from "../../components/AgreementForm/Housekeeping";
import Rent from "../../components/AgreementForm/RentAndDeposit/Rent";
import SecurityDeposit from "../../components/AgreementForm/RentAndDeposit/SecurityDeposit";
import BillsUtilities from "../../components/AgreementForm/BillsUtilities";
import Signatures from "../../components/AgreementForm/Signatures";

const AgreementForm = () => {
  const { state }: { state: any } = useContext(AppContext);
  const [initialVals, setInitialVals] = useState(initialValues);

  useEffect(() => {
    axios.get(`api/agreements?household=${state.currUser.household}`).then(agreement => {
      // use agreement values as initial values if they exist
      const formValues =
        agreement.data && agreement.data[0] && agreement.data[0].form_values
          ? agreement.data[0].form_values
          : null;
      if (formValues) {
        setInitialVals(() => formatDBInitialValues(formValues));
      } else {
        const {
          currUser: { first_name: firstName, last_name: lastName, phone_number: phone, email }
        } = state;
        setInitialVals((prev: any) => ({
          ...prev,
          roommates: [{ firstName, lastName, phone, email }]
        }));
      }
    });
  }, [state]);

  const submitForm = (values: FormikValues, actions: any) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  };

  if (!state) {
    return <AppLoading />;
  }

  return (
    <Formik
      initialValues={initialVals}
      enableReinitialize={true}
      onSubmit={submitForm}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
        handleBlur,
        initialValues
      }: FormikProps<any>) => (
        <form onSubmit={handleSubmit}>
          <NavigationPrompt
            when={(current, next) => {
              // if initialValues === values --> you can navigate away cause nothing changed
              return (
                JSON.stringify(values) !== JSON.stringify(initialValues) &&
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
              />
            )}
          </NavigationPrompt>
          <Switch>
            <Route path="/agreement/household" component={Household} />
            <Route path="/agreement/landlord" component={Landlord} />
            <Route path="/agreement/roommates" component={Roommates} />
            <Redirect from="/agreement/bills" to="/agreement/bills/rent" exact />
            <Route path="/agreement/bills/rent">
              <Rent
                values={values}
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            </Route>
            <Route path="/agreement/bills/deposit">
              <SecurityDeposit
                values={values}
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            </Route>
            <Route path="/agreement/bills/utilities">
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
                values={values}
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            </Route>
          </Switch>
          <Button type="submit">Test Submit</Button>
        </form>
      )}
    </Formik>
  );
};

export default AgreementForm;
