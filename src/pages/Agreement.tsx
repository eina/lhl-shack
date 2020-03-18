import React from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { Switch, Route, Link } from 'react-router-dom';

import { FormValues } from '../interfaces';

import Info from '../components/AgreementForm/Info';
import Landlord from '../components/AgreementForm/Landlord';
import Title from '../components/AgreementForm/Title';
import Roommates from '../components/AgreementForm/Roommates';
import Housekeeping from '../components/AgreementForm/Housekeeping';
import Bills from '../components/AgreementForm/Bills';
import RentAndDeposit from '../components/AgreementForm/RentandDeposit';
import Signatures from '../components/AgreementForm/Signatures';

const initialValues: FormValues = {
  roommates: [
    { firstName: '', lastName: '', email: '', phone: '' },
    { firstName: '', lastName: '', email: '', phone: '' },
  ],
  bills: [{ name: '', totalAmount: 0, dueDate: '', interval: '' }],
  RentAndDeposit: [{ rent: 0, deposit: 0 }],
  signatures: [{ fullName: '', date: 'YYYY-MM-DD' }],
};

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
      </ul>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {(props: FormikProps<FormValues>) => (
          <Form>
            <Switch>
              <Route path="/agreement/title" component={Title} />
              <Route path="/agreement/info" component={Info} />
              <Route path="/agreement/landlord" component={Landlord} />
              <Route path="/agreement/roommates" component={Roommates} />
              <Route path="/agreement/housekeeping" component={Housekeeping} />
              <Route path="/agreement/bills" component={Bills} />
              <Route
                path="/agreement/rentanddeposit"
                component={RentAndDeposit}
              />
              <Route path="/agreement/signatures" component={Signatures} />
            </Switch>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Agreement;
