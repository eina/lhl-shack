import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as dateFns from 'date-fns';
import { Heading, Box, Textarea, FormControl, Button, Text, Divider } from '@chakra-ui/core';
import { Formik, useField, FormikValues } from 'formik';

import { brandButton } from '../chakra/customTheme';
import { AppContext } from '../Store';
import FieldSet from '../components/FieldSet';

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
  const { state }: { state: any } = useContext(AppContext);
  const { currUser } = state;
  const [ messages, setMessages ] = useState([]);

  useEffect(() => {
    axios.get('/api/messages', { params: { household_id: currUser.household } })
      .then(messages => {
        setMessages(messages.data);
      });
  }, [currUser]);

  const handleSubmitMessage = (values: FormikValues, actions: any) => {
    axios.post('/api/messages', { household_id: currUser.household, author: state.fullName, message_title: values.title, message_text: values.message }).then(addedMessage => {
      actions.setSubmitting(false);
      actions.resetForm();
      setMessages((prev: any) => {
        return prev.concat([addedMessage.data]);
      });
    });
  };

  return (
    <>
      <Box as="section" mb={8}>
        <Heading as="h2" fontSize="md">Write your household a message</Heading>
        <Formik initialValues={{ message: ''}} onSubmit={(values, actions) => handleSubmitMessage(values, actions)}>
          {({values, handleSubmit, isSubmitting}) => (
            <form onSubmit={handleSubmit}>
              <FieldSet type="text" name="title" placeholder="Dinner idea!" />
              <FormikTextArea name="message" placeholder="We should have pizza for dinner!" />
              <Button type="submit" isDisabled={values.message ? false : true} isLoading={isSubmitting} loadingText="Adding Message" {...brandButton}>Add Message</Button>
            </form>
          )}
        </Formik>
      </Box>
      <Box as="section" mr="1em">
        <Heading as="h1" fontSize="2xl">Household Messages</Heading>
        {messages.reverse().map((message: any, index: number) => (
          <Box as="article" key={index} px={4} py={5} mb={3} borderWidth="1px" borderRadius="1em">
            {message.message_title ? (<Text fontFamily="montserrat" fontWeight="bold" fontSize="lg" lineHeight="shorter">
              {message.message_title}
            </Text>) : null}
            <Text mb={4}>{message.message_text}</Text>
            <Divider />
            <Text fontSize="sm">Posted by {message.author} {dateFns.formatDistance(new Date(message.created_at), new Date(), { addSuffix: true })}</Text>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Messages;