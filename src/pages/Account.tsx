import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";

import { Heading, Button, Alert, AlertIcon, AlertDescription, CloseButton } from "@chakra-ui/core";

import FieldSet from "../components/FieldSet";

interface User {
  id?: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password?: string;
}

const defaultValues = {
  first_name: "",
  last_name: "",
  phone_number: "",
  email: ""
  // password: ""
};

const Account = () => {
  const formStatusDefault = { visible: false, success: true, message: "" };
  const [account, setAccount] = useState<User>(defaultValues);
  const [formAlert, setFormAlert] = useState(formStatusDefault);

  useEffect(() => {
    axios.get("/api/users/1").then(vals => {
      setAccount(vals.data);
    });
  }, []);
<<<<<<< HEAD

  const submitHandler = (values: any, actions: any) => {
    let { id, ...result } = values;
    return axios
      .patch(`/api/users/${id}`, {
        user: result
      })
      .then((vals: any) => {
        setAccount(vals.data);
        setFormAlert({
          visible: true,
          success: true,
          message: "Account successfully updated!"
        });
        actions.setSubmitting(false);
      })
      .catch(error => {
        setFormAlert({ visible: true, success: false, message: "Account could not be updated" });
        console.error("Could not update info: ", error);
      });
  };

=======
>>>>>>> feature/household-view
  return (
    account && (
      <div>
        <Heading as="h1">My Account</Heading>
        {formAlert.visible && (
          <Alert status={formAlert.success ? "success" : "error"} variant="left-accent">
            <AlertIcon />
            <AlertDescription>{formAlert.message}</AlertDescription>
            <CloseButton
              onClick={() => setFormAlert(formStatusDefault)}
              position="absolute"
              right="8px"
              top="8px"
            />
          </Alert>
        )}
        <Formik
          enableReinitialize
<<<<<<< HEAD
          initialValues={account}
          onSubmit={(values, actions) => submitHandler(values, actions)}
=======
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
>>>>>>> feature/household-view
        >
          {(props: any) => (
            <form onSubmit={props.handleSubmit}>
              <FieldSet type="text" label="First Name" name="first_name" />
              <FieldSet type="text" label="Last Name" name="last_name" />
              <FieldSet type="text" label="Phone Number" name="phone_number" />
              <FieldSet type="text" label="Email" name="email" />
              {/* <FieldSet type="text" label="password" name="password" /> */}
              {props.errors.last_name && <div id="feedback">{props.errors.last_name}</div>}
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
