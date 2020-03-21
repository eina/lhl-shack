import React, { useContext } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { FormikProps, withFormik } from "formik";

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

const formikEnhancer = withFormik({
  mapPropsToValues: props => initialValues,
  handleSubmit: (values, { setSubmitting }) => {
    alert("it submitted! check console for values!");
    console.log("form submission values", values);
    setSubmitting(false);
  },
  validationSchema: validationSchema,
  displayName: "RoommateAgreementGenerator"
});

const AgreementForm = ({
  values,
  errors,
  touched,
  setFieldValue,
  handleSubmit,
  handleBlur
}: FormikProps<any>) => {
  return (
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
        {/* <Route path="/agreement/testDraft">
          <TestDraft values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
        </Route> */}
      </Switch>
      <button type="submit">Test Submit</button>
    </form>
  );
};

const EnhancedAgreement = formikEnhancer(AgreementForm);

const Agreement = () => {
  const { state } = useContext(AppContext);

  console.log("hello state", state);

  return (
    <ul>
      <h1>Roommate Agreement Generator</h1>
      <p>main component! something something something</p>​
      <ul>
        <li>
          <Link to="/agreement/title">About the Agreement</Link>
        </li>
        <li>
          <Link to="/agreement/household">House Information</Link>
        </li>
        <li>
          <Link to="/agreement/landlord">Landlord Information</Link>
        </li>
        <li>
          <Link to="/agreement/roommates">Roommates</Link>
        </li>
        <li>
          <Link to="/agreement/bills">Bills</Link>
          <ul>
            <li>
              <Link to="/agreement/bills/rent">Bills: Rent</Link>
            </li>
            <li>
              <Link to="/agreement/bills/deposit">Bills: Security Deposit</Link>
            </li>
            <li>
              <Link to="/agreement/bills/utilities">Bills: Utilities</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/agreement/housekeeping">Housekeeping</Link>
        </li>
        <li>
          <Link to="/agreement/signatures">Signatures</Link>
        </li>
        {/* <li>
          <Link to="/agreement/testDraft">Third Party Examples</Link>
        </li> */}
      </ul>
      {/* enhanced agreement form */}
      <EnhancedAgreement />
    </ul>
  );
};
export default Agreement;
