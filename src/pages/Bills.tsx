
import React from 'react';
import ReactDOM from 'react-dom';
import {Column, Table} from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

//Table data as an array of objects
const list = [
  {name: 'Clare Nolan', description: 'Software engineer'},
  // And so on...
];

const Bills = () => {
// Render your table

  // ReactDOM.render(
  //   <Table
  //     width={300}
  //     height={300}
  //     headerHeight={20}
  //     rowHeight={30}
  //     rowCount={list.length}
  //     rowGetter={({index}) => list[index]}>
  //     <Column label="Name" dataKey="name" width={100} />
  //     <Column width={200} label="Description" dataKey="description" />
  //   </Table>,
  //   document.getElementById('example'),
  // );

return (
  <div>
    <h1>Hi There!</h1>
  </div>
)


}

export default Bills;

