import React, { useContext } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { FormikProps, Formik, FormikValues } from "formik";
import { Button, List, ListItem, Box } from "@chakra-ui/core";
// import { FormValues } from "../interfaces";
import { AppContext } from "../Store";
import initialValues from "../components/AgreementForm/initialValues";
import validationSchema from "../components/AgreementForm/validationSchema";

import Title from "../components/AgreementForm/Title";
import Household from "../components/AgreementForm/Household";
import Landlord from "../components/AgreementForm/Landlord";
import Roommates from "../components/AgreementForm/Roommates";
import Housekeeping from "../components/AgreementForm/Housekeeping";
import Rent from "../components/AgreementForm/RentAndDeposit/Rent";
import SecurityDeposit from "../components/AgreementForm/RentAndDeposit/SecurityDeposit";
import BillsUtilities from "../components/AgreementForm/BillsUtilities";
import Signatures from "../components/AgreementForm/Signatures";
// import TestDraft from "../components/AgreementForm/TestDraft";

import "draft-js/dist/Draft.css";

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
            }
          ]
        : [{ firstName: "", lastName: "", email: "", phone: "" }]
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
          <Switch>
            <Route path="/agreement/title" component={Title} />
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

const Agreement = () => {
  return (
    <div>
      <h1>Roommate Agreement Generator</h1>
      <p>main component! something something something</p>​
      <List as="ol" styleType="decimal">
        <ListItem>
          <Link to="/agreement/title">About the Agreement</Link>
        </ListItem>
        <ListItem>
          <Link to="/agreement/household">House Information</Link>
        </ListItem>
        <ListItem>
          <Link to="/agreement/landlord">Landlord Information</Link>
        </ListItem>
        <ListItem>
          <Link to="/agreement/roommates">Roommates</Link>
        </ListItem>
        <ListItem>
          <Link to="/agreement/bills">Bills</Link>
          <List ml={4} styleType="disc">
            <ListItem>
              <Link to="/agreement/bills/rent">Bills: Rent</Link>
            </ListItem>
            <ListItem>
              <Link to="/agreement/bills/deposit">Bills: Security Deposit</Link>
            </ListItem>
            <ListItem>
              <Link to="/agreement/bills/utilities">Bills: Utilities</Link>
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Link to="/agreement/housekeeping">Housekeeping</Link>
        </ListItem>
        <ListItem>
          <Link to="/agreement/signatures">Signatures</Link>
        </ListItem>
      </List>
      {/* Fooooorm */}
      <Box mt={10}>
        <AgreementForm />
      </Box>
    </div>
  );
};
export default Agreement;
