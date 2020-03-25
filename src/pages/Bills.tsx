import React from 'react';
import ReactDOM from 'react-dom';
// import {Column, Table} from 'react-virtualized';
import { Cell, Column, Table } from '@blueprintjs/table';
import '../../node_modules/@blueprintjs/table/lib/css/table.css';

import { Heading } from '@chakra-ui/core';

// Mentor tip: have two ids, one for the row, one for the column when grabbing API data - to help sort
const cellRenderer = (rowIndex: number) => {
  return <Cell>{`static content`}</Cell>;
};
const Bills = () => {
  return (
    <div>
      <Heading as="h1">Bills</Heading>
      <Table numRows={10}>
        <Column name="Name" cellRenderer={cellRenderer} />
        <Column name="Due Date" cellRenderer={cellRenderer} />
        <Column name="Total" cellRenderer={cellRenderer} />
        <Column name="Your Total" cellRenderer={cellRenderer} />
        <Column name="Bill Status" cellRenderer={cellRenderer} />
        <Column name="Your Payment Status" cellRenderer={cellRenderer} />
        <Column name="Roomie Payment Status" cellRenderer={cellRenderer} />
      </Table>
    </div>
  );
};

export default Bills;
