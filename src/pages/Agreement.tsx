import React from 'react';
import moment from 'moment';
import { Formik, Form, FormikProps, withFormik } from 'formik';
import { Switch, Route, Link } from 'react-router-dom';
import { Editor, EditorState } from 'draft-js';

import { FormValues } from '../interfaces';

import Info from '../components/AgreementForm/Info';
import Landlord from '../components/AgreementForm/Landlord';
import Title from '../components/AgreementForm/Title';
import Roommates from '../components/AgreementForm/Roommates';
import Housekeeping from '../components/AgreementForm/Housekeeping';
import Bills from '../components/AgreementForm/Bills';
import RentAndDeposit from '../components/AgreementForm/RentandDeposit';
import Signatures from '../components/AgreementForm/Signatures';
import TestDraft from '../components/AgreementForm/TestDraft';

import 'draft-js/dist/Draft.css';
// import "react-select/dist/react-select.css";

const formikEnhancer = withFormik({
  mapPropsToValues: props => ({
    roommates: [
      { firstName: '', lastName: '', email: '', phone: '' },
      { firstName: '', lastName: '', email: '', phone: '' },
    ],
    RentAndDeposit: [{ rent: 0, deposit: 0 }],
    signatures: [{ fullName: '', date: moment() }],
    bills: [{ name: '', totalAmount: 0, dueDate: moment(), interval: '' }],
    // test values
    textArea1: EditorState.createEmpty(),
    textArea2: EditorState.createEmpty(),
    status: [],
    leaseDates: {
      startDate: null,
      endDate: null,
    },
    billDate: moment(),
  }),
  handleSubmit: () => {},
  displayName: 'Roommate Agreement Generator',
});

const AgreementForm = ({
  values,
  setFieldValue,
  handleSubmit,
  handleBlur,
}: FormikProps<any>) => {
  return (
    <form onSubmit={handleSubmit}>
      <Switch>
        <Route path="/agreement/info" component={Info} />
        <Route path="/agreement/landlord" component={Landlord} />
        <Route path="/agreement/roommates" component={Roommates} />
        <Route
          path="/agreement/bills"
          component={() => (
            <Bills
              values={values}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
            />
          )}
        />
        <Route path="/agreement/rentanddeposit" component={RentAndDeposit} />
        <Route
          path="/agreement/signatures"
          component={() => (
            <Signatures
              values={values}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
            />
          )}
        />
        <Route path="/agreement/housekeeping" component={Housekeeping} />
        <Route
          path="/agreement/testDraft"
          component={() => (
            <TestDraft
              values={values}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
            />
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
      <p>main component! something something something</p>​
      <ul>
        <li>
          <Link to="/agreement/title">About the Agreement</Link>
        </li>
        <li>
          <Link to="/agreement/info">Your Address</Link>
        </li>
        <li>
          <Link to="/agreement/landlord">Landlord Information</Link>
        </li>
        <li>
          <Link to="/agreement/roommates">Roommates</Link>
        </li>
        <li>
          <Link to="/agreement/rentanddeposit">Rent and Deposit</Link>
        </li>
        <li>
          <Link to="/agreement/bills">Bills</Link>
        </li>
        <li>
          <Link to="/agreement/housekeeping">Housekeeping</Link>
        </li>
        <li>
          <Link to="/agreement/signatures">Signatures</Link>
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
