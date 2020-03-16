import React from "react";
import { Formik, Form } from "formik";
import { Switch, Route, Link } from "react-router-dom";

import Info from "../components/AgreementForm/Info";
import Landlord from "../components/AgreementForm/Landlord";

const Agreement = () => {
  return (
    <>
      <h1>Roommate Agreement Generator</h1>
      <p>main component! something something something</p>

      <ul>
        <li>
          <Link to="/form/info">Info</Link>
        </li>
        <li>
          <Link to="/form/landlord">landlord</Link>
        </li>
      </ul>

      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <Switch>
            <Route path="/form/info" component={Info} />
            <Route path="/form/landlord" component={Landlord} />
          </Switch>
        </Form>
      </Formik>
    </>
  );
};

export default Agreement;
