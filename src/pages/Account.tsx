import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Heading } from '@chakra-ui/core';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
}

const defaultValues = {
  id: 0,
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
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
      <form>
        <Heading>Account Details</Heading>
        <div>
          <Heading as="h3" size="lg">
            Name
          </Heading>
          {account.first_name}{' '}{account.last_name}
        </div>
        <div>
        <Heading as="h3" size="lg">
            Email
          </Heading>
          {account.email}
        </div>
        <Heading as="h3" size="lg">
            Phone Number
          </Heading>
          {account.phone_number}
      </form>
    )
  );
};
export default Account;
