import React from "react";
import { Formik, Form, FormikProps } from "formik";
import { Switch, Route, Link } from "react-router-dom";

import { FormValues } from "../interfaces";

import Info from "../components/AgreementForm/Info";
import Landlord from "../components/AgreementForm/Landlord";
import Title from "../components/AgreementForm/Title";
import Roommates from "../components/AgreementForm/Roommates";

const initialValues: FormValues = {
  roommates: [
    { firstName: "", lastName: "", email: "", phone: "" },
    { firstName: "", lastName: "", email: "", phone: "" }
  ]
};

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
      </ul>

      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {(props: FormikProps<FormValues>) => (
          <Form>
            <Switch>
              <Route path="/agreement/info" component={Info} />
              <Route path="/agreement/landlord" component={Landlord} />
              <Route path="/agreement/roommates" component={Roommates} />
            </Switch>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Agreement;
