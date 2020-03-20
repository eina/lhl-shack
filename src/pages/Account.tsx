import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  }

const defaultValues = {id: 0,
first_name: "",
last_name: "",
phone_number: "",
email: ""}

const Account = () => {
  const [account, setAccount] = useState<User>(defaultValues);
  useEffect(() => {
    axios.get('/api/users/1').then(vals => {
      // console.log(vals.data.first_name)
      setAccount(vals.data)});
  }, []);
  console.log('Here is account: ', account)
  
return account && <div>{account.first_name}</div>;
};
export default Account;
