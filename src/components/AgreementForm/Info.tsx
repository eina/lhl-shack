import React from 'react';
import { Field } from 'formik';
import { Button } from '@chakra-ui/core';

import { useHistory } from 'react-router-dom';

const Info = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Add your address!</h1>
      <Field type="text" name="address" placeholder="Address" />
      <div>
        <Button
          variantColor="orange"
          onClick={() => {
            history.push('/agreement/title');
          }}
        >
          Previous Section
        </Button>
        <Button
          variantColor="pink"
          onClick={() => {
            history.push('/agreement/landlord');
          }}
        >
          Next Section
        </Button>
      </div>
    </div>
  );
};

export default Info;
