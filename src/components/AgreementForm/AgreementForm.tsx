import React, { useContext } from "react";
import { Switch, Route, Prompt, Redirect, matchPath } from "react-router-dom";
import { FormikProps, Formik, FormikValues } from "formik";
import { Button } from "@chakra-ui/core";

import { AppContext } from "../../Store";
import initialValues from "../../components/AgreementForm/initialValues";
import validationSchema from "../../components/AgreementForm/validationSchema";

import Household from "../../components/AgreementForm/Household";
import Landlord from "../../components/AgreementForm/Landlord";
import Roommates from "../../components/AgreementForm/Roommates";
import Housekeeping from "../../components/AgreementForm/Housekeeping";
import Rent from "../../components/AgreementForm/RentAndDeposit/Rent";
import SecurityDeposit from "../../components/AgreementForm/RentAndDeposit/SecurityDeposit";
import BillsUtilities from "../../components/AgreementForm/BillsUtilities";
import Signatures from "../../components/AgreementForm/Signatures";

const submitForm = (values: FormikValues, actions: any) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  }, 1000);
};

const AgreementForm = () => {
  const { state }: { state: any } = useContext(AppContext);

  const initialVals = {
    ...initialValues,
    roommates:
      state && state.currUser
        ? [
            {
              firstName: state.currUser.first_name,
              lastName: state.currUser.last_name,
              email: state.currUser.email,
              phone: state.currUser.phone_number
            },
            { firstName: "", lastName: "", email: "", phone: "" }
          ]
        : initialValues.roommates
  };

  return (
    <Formik
      initialValues={initialVals}
      enableReinitialize={true}
      onSubmit={submitForm}
      validationSchema={validationSchema}
    >
      {({ values, errors, touched, setFieldValue, handleSubmit, handleBlur }: FormikProps<any>) => (
        <form onSubmit={handleSubmit}>
          <Prompt
            when={true}
            message={({ pathname }) => {
              return matchPath(pathname, { path: "/agreement" })
                ? true
                : "Are you sure you want to navigate away?";
            }}
          />

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
