import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Formik } from 'formik';

import {
  Heading,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/core';

import initialValues from '../components/AgreementForm/initialValues';
import AxiosHelper from '../utils/AxiosHelper';
import FieldSet from '../components/FieldSet';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
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
  const [formAlert, setFormAlert] = useState(false);
  useEffect(() => {
    axios.get('/api/users/1').then(vals => {
      setAccount(vals.data);
    });
  }, []);
  return (
    account && (
      <div>
        <h1>My Account</h1>
        {setFormAlert && (
          <Alert status="success">
            <AlertIcon />
            Account info saved!
          </Alert>
        )}
        <Formik
          enableReinitialize
          initialValues={{ ...account }}
          onSubmit={(values, actions) => {
            let { id: _, ...result } = values;
            return axios
              .patch('/api/users/1', {
                user: { ...result },
              })
              .then((vals: any) => {
                setAccount(vals.data);
                setFormAlert(true);
              })
              .catch(error => {
                console.error('Could not update info: ', error);
              });
          }}
        >
          {(props: any) => (
            <form onSubmit={props.handleSubmit}>
              <Heading as="h3" size="lg">
                Account Info
              </Heading>
              <Heading as="h2" size="md">
                {account.first_name} {account.last_name}
              </Heading>
              <Heading as="h4" size="md">
                Update Account Info:
              </Heading>
              <FieldSet type="text" name="first_name" label="first name" />
              <FieldSet type="text" label="last name" name="last_name" />
              <FieldSet type="text" label="phone number" name="phone_number" />
              <FieldSet type="text" label="email" name="email" />
              <FieldSet type="text" label="password" name="password" />
              {props.errors.last_name && (
                <div id="feedback">{props.errors.last_name}</div>
              )}
              <Button type="submit" variantColor="pink">
                Save
              </Button>
            </form>
          )}
        </Formik>
      </div>
    )
  );
};
export default Account;
