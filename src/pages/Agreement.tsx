import React from "react";
import { Formik, Form } from "formik";
import { Switch, Route, Link } from "react-router-dom";
import Info from "../components/AgreementForm/Info";
import Landlord from "../components/AgreementForm/Landlord";
import Housekeeping from "../components/AgreementForm/Housekeeping"
const Agreement = () => {
  return (
    <>
      <h1>Roommate Agreement Generator</h1>
      <p>main component! something something something</p>
​
      <ul>
        <li>
          <Link to="/agreement/info">Info</Link>
        </li>
        <li>
          <Link to="/agreement/landlord">landlord</Link>
        </li>
        <li>
          <Link to="/agreement/housekeeping">Housekeeping</Link>
        </li>
      </ul>
​
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <Switch>
            <Route path="/agreement/info" component={Info} />
            <Route path="/agreement/landlord" component={Landlord} />
            <Route path="/agreement/housekeeping" component={Housekeeping} />
          </Switch>
        </Form>
      </Formik>
    </>
  );
};
export default Agreement;