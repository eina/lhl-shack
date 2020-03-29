import React from 'react';
import { Heading, Box, Textarea, FormControl, FormErrorMessage, FormHelperText, Button } from '@chakra-ui/core';
import { Formik, useField, FormikValues } from 'formik';

const FormikTextArea = (props: any) => {
  const { name } = props;
  const [field, meta, helpers] = useField(props);

  return (
    <FormControl
      isInvalid={meta.touched && meta.error ? true : false}
      mb={3}
      maxW="80%"
    >
      <Textarea {...field} {...props} name={name} value={field.value} onChange={(e: any) => helpers.setValue(e.target.value)} />
    </FormControl>
  );
};

const Messages = () => {
  const handleSubmitMessage = (values: FormikValues, actions: any) => {
    console.log('hi is this working', values);
  };
  return (
    <>
      <Heading as="h1">Messages</Heading>
      <Box as="section">
        <Heading as="h2" fontSize="md">Write your household a message</Heading>
        <Formik initialValues={{ message: ''}} onSubmit={(values, actions) => handleSubmitMessage(values, actions)}>
          {({values, handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <FormikTextArea name="message" placeholder="We should have pizza for dinner!" />
              <Button type="submit" isDisabled={values.message ? false : true}>Add Message</Button>
            </form>
          )}
        </Formik>
      </Box>
      <Box as="section"></Box>
    </>
  );
};

export default Messages;