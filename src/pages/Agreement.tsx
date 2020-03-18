import React from "react";
import { Formik, Form, FormikProps, withFormik } from "formik";
import { Switch, Route, Link } from "react-router-dom";
import { Editor, EditorState } from "draft-js";

import { FormValues } from "../interfaces";

import Info from "../components/AgreementForm/Info";
import Landlord from "../components/AgreementForm/Landlord";
import Title from "../components/AgreementForm/Title";
import Roommates from "../components/AgreementForm/Roommates";
import TestDraft from "../components/AgreementForm/TestDraft";

import "draft-js/dist/Draft.css";

const formikEnhancer = withFormik({
  mapPropsToValues: props => ({
    roommates: [
      { firstName: "", lastName: "", email: "", phone: "" },
      { firstName: "", lastName: "", email: "", phone: "" }
    ],
    textArea1: EditorState.createEmpty(),
    textArea2: EditorState.createEmpty(),
    status: []
  }),
  handleSubmit: () => {},
  displayName: "Roommate Agreement Generator"
});

const AgreementForm = ({ values, setFieldValue, handleSubmit, handleBlur }: FormikProps<any>) => {
  return (
    <form onSubmit={handleSubmit}>
      <Switch>
        <Route path="/agreement/info" component={Info} />
        <Route path="/agreement/landlord" component={Landlord} />
        <Route path="/agreement/roommates" component={Roommates} />
        <Route
          path="/agreement/testDraft"
          component={() => (
            <TestDraft values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
          )}
        />
      </Switch>
    </form>
  );
};

const EnhancedAgreement = formikEnhancer(AgreementForm);

const Agreement = () => {
  return (
    <>
      <h1>Roommate Agreement Generator</h1>
      <p>main component! something something something</p>

      <ul>
        <li>
          <Link to="/agreement/info">Info</Link>
        </li>
        <li>
          <Link to="/agreement/landlord">landlord</Link>
        </li>
        <li>
          <Link to="/agreement/roommates">Roommates</Link>
        </li>
        <li>
          <Link to="/agreement/testDraft">Draft.js example</Link>
        </li>
      </ul>

      <EnhancedAgreement />
    </>
  );
};

export default Agreement;
