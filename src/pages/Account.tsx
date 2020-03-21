import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Formik } from 'formik';

import { Heading, Input } from '@chakra-ui/core';

import initialValues from '../components/AgreementForm/initialValues';
import AxiosHelper from '../utils/AxiosHelper';
import FieldSet from '../components/FieldSet';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string
}

const defaultValues = {
  id: 0,
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
  password: '',
};

const accountValues = {
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
  password: '',
};

const Account = () => {
  const [account, setAccount] = useState<User>(defaultValues);
  useEffect(() => {
    axios.get('/api/users/1').then(vals => {
      // console.log(vals.data.first_name)
      setAccount(vals.data);
    });
  }, []);
  console.log('Here is account: ', account);

  return (
    account && (
      <div>
        <h1>My Account</h1>
        <Formik
          initialValues={{...account}}
          onSubmit={(values, actions) => {
            let { id: _, ...result } = values;
            // AxiosHelper();
            console.log('here is values: ', result);
            return axios
              .patch('/api/users/1', {
                user: {
                  first_name: values.first_name,
                  last_name: values.last_name,
                  phone_number: values.phone_number,
                  email: values.email,
                  password: values.password,
                },
              })
              .then((vals: any) => {
                console.log(vals.data);
                setAccount(vals.data);
              });
          }}
        >
          {(props: any) => (
            <form onSubmit={props.handleSubmit}>
              <Heading as="h3" size="lg">
                Name
              </Heading>
              <div>
                {account.first_name} {account.last_name}
              </div>
              <div>Update Name</div>
              <FieldSet
                type="text"
                name="first_name"
                label="first name"
              />
              <FieldSet
                type="text"
                label="last name"
                name="last_name"
              />
              {props.errors.last_name && (
                <div id="feedback">{props.errors.last_name}</div>
              )}
              <button type="submit">Submit</button>
            </form>
          )}
        </Formik>
      </div>
      // <form>
      //   <Heading>Account Details</Heading>
      //   <div>
      //     <Heading as="h3" size="lg">
      //       Name
      //     </Heading>
      //
      //   </div>
      //   <div>
      //   <Heading as="h3" size="lg">
      //       Email
      //     </Heading>
      //     {account.email}
      //   </div>
      //   <Heading as="h3" size="lg">
      //       Phone Number
      //     </Heading>
      //     {account.phone_number}
      // </form>
    )
  );
};
export default Account;
