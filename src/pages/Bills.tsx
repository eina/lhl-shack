import React, { useEffect, useContext, useState } from 'react';
// import { Cell, Column, Table } from '@blueprintjs/table';
// import '../../node_modules/@blueprintjs/table/lib/css/table.css';

import Griddle, { plugins } from 'griddle-react';

import { Heading } from '@chakra-ui/core';
import axios from 'axios';

import { AppContext } from '../Store';


const Bills = () => {
  const {
    state,
    updateState,
  }: { state: any; updateState: Function } = useContext(AppContext);
  // const emptyBills: Bills = [];
  const [bills, setBills] = useState([]);
  const { currUser } = state;
  useEffect(() => {
    if (currUser) {
      console.log('params: ', {
        household_id: currUser.household_id,
        user_id: currUser.id,
      });
      axios
        .get('/api/bills', {
          params: { household_id: currUser.household, user_id: currUser.id },
        })
        .then(vals => {
          console.log('here are vals: ', vals.data);
          setBills(vals.data);
        });
    }
  }, []);
  console.log('here are bills: ', bills);
  console.log('bils length: ', bills.length);
  const data: any[] = bills;
  return (
    <div>
      <h1>Bills testing testing 123</h1>
      <Heading as="h1">Bills</Heading>
      {bills.length && <Griddle data={data} plugins={[plugins.LocalPlugin]} />}
    </div>
  );
};

export default Bills;
