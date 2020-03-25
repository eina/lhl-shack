import React from 'react';
import ReactDOM from 'react-dom';
// import {Column, Table} from 'react-virtualized';
import { Cell, Column, Table } from '@blueprintjs/table';
import '../../node_modules/@blueprintjs/table/lib/css/table.css'
//Table data as an array of objects
const list = [
  { name: 'Clare Nolan', description: 'Software engineer' },
  // And so on...
];
// have two ids, one for the row, one for the column when grabbing API data - to help sort
const cellRenderer = (rowIndex: number) => {
  return <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>;
};
const Bills = () => {
  // Render your table

  return (
      <Table numRows={10}>
        <Column name="Name" cellRenderer={cellRenderer} />
        <Column name="Due Date" cellRenderer={cellRenderer} />
      </Table>
  );
};

export default Bills;
