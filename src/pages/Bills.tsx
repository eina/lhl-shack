import React from 'react';
import ReactDOM from 'react-dom';
// import {Column, Table} from 'react-virtualized';
import { Cell, Column, Table } from '@blueprintjs/table';
import '../../node_modules/@blueprintjs/table/lib/css/table.css';

import { Heading } from '@chakra-ui/core';

interface Bill {
  [key: string]: any
}


const testData = [{name: 'TELUS Internet', dueDate: '2020-03-23', total: 120, yourTotal: 60, billStatus: 'unpaid', yourPaymentStatus: 'late', roomiePaymentStatus: 'late'},
{name: 'BC Hydro', dueDate: '2020-04-01', total: 80, yourTotal: 40, billStatus: 'unpaid', yourPaymentStatus: 'upcoming', roomiePaymentStatus: 'upcoming'},
{name: 'Netflix', dueDate: '2020-04-30', total: 20, yourTotal: 10, billStatus: 'unpaid', yourPaymentStatus: 'upcoming', roomiePaymentStatus: 'upcoming'},
{name: 'Utilities', dueDate: '2020-04-30', total: 100, yourTotal: 50, billStatus: 'unpaid', yourPaymentStatus: 'upcoming', roomiePaymentStatus: 'upcoming'},
{name: 'TELUS Cable', dueDate: '2020-03-23', total: 120, yourTotal: 60, billStatus: 'unpaid', yourPaymentStatus: 'late', roomiePaymentStatus: 'late'}]

const getData = (rowIndex: number): Bill => {
  return testData[rowIndex]
}

// Mentor tip: have two ids, one for the row, one for the column when grabbing API data - to help sort
const getCellRenderer = (key: any) => {
  return (rowIndex: number) => {
    const bill = getData(rowIndex)
    return <Cell>{`${bill[key]}`}</Cell>;
  };
}

const Bills = () => {
  return (
    <div>
      <Heading as="h1">Bills</Heading>
      <Table numRows={5}>
        <Column name="Name" cellRenderer={getCellRenderer('name')} />
        <Column name="Due Date" cellRenderer={getCellRenderer('dueDate')} />
        <Column name="Total" cellRenderer={getCellRenderer('total')} />
        <Column name="Your Total" cellRenderer={getCellRenderer('yourTotal')} />
        <Column name="Bill Status" cellRenderer={getCellRenderer('billStatus')} />
        <Column name="Your Payment Status" cellRenderer={getCellRenderer('yourPaymentStatus')} />
        <Column name="Roomie Payment Status" cellRenderer={getCellRenderer('roomiePaymentStatus')} />
      </Table>
    </div>
  );
};

export default Bills;
