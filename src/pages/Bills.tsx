import React, { useEffect, useContext, useState } from 'react';
import { Cell, Column, Table } from '@blueprintjs/table';
import '../../node_modules/@blueprintjs/table/lib/css/table.css';

import { Heading } from '@chakra-ui/core';
import axios from 'axios';

import { AppContext } from '../Store';

interface Bill {
  [key: string]: any;
}

const getData = (rowIndex: number, bill: any): Bill => {
  return bill[rowIndex];
};

const getCellRenderer = (key: string, bills: any) => {
  return (rowIndex: number) => {
    console.log('rowIndex: ', rowIndex);
    const billRow = getData(rowIndex, bills);
    return <Cell>{`${billRow[key]}`}</Cell>;
  };
};

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
      console.log('params: ', { household_id: currUser.household_id, user_id: currUser.id })
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
  return (
    <div>
      <h1>Bills testing testing 123</h1>
      <Heading as="h1">Bills</Heading>
      {bills.length && (
        <Table numRows={bills.length} enableRowHeader={false}>
          <Column
            key={1}
            name="Name"
            cellRenderer={getCellRenderer('name', bills)}
          />
          <Column
            key={2}
            name="Due Date"
            cellRenderer={getCellRenderer('due_date', bills)}
          />
          <Column
            key={3}
            name="Total Amount"
            cellRenderer={getCellRenderer('total_amount', bills)}
          />
          <Column
            key={4}
            name="Amount per person"
            cellRenderer={getCellRenderer('user_amount', bills)}
          />
        </Table>
      )}
    </div>
  );
};

export default Bills;
