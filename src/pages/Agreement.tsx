import React from "react";
import { Formik, Form } from "formik";
import { Switch, Route, Link } from "react-router-dom";

import Info from "../components/AgreementForm/Info";
import Landlord from "../components/AgreementForm/Landlord";
import Title from "../components/AgreementForm/Title";

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
      </ul>

      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <Switch>
            <Route path="/agreement/info" component={Info} />
            <Route path="/agreement/landlord" component={Landlord} />
          </Switch>
        </Form>
      </Formik>
    </>
  );
};

export default Agreement;
