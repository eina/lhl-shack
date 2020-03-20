import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {
  const [account, setAccount] = useState({});

  useEffect(() => {
    axios.get('/api/users/1').then(vals => setAccount(vals.data));
  }, []);
  return <div>{account}</div>;
};
export default Account;
