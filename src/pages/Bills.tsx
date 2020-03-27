import React, { useEffect, useContext, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Select from 'react-select';
import Griddle, {
  plugins,
  RowDefinition,
  ColumnDefinition,
} from 'griddle-react';
import { Heading, useToast } from '@chakra-ui/core';
import { AppContext } from '../Store';

// const rowDataSelector = (state: any, { griddleKey }: any) => {
//   console.log('what is the state here', state);
//   return state
//     .get('data')
//     .find((rowMap: any) => rowMap.get('griddleKey') === griddleKey)
//     .toJSON();
// };

const enhancedWithRowData = connect((state, props) => {
  return {
    // rowData will be available into MyCustomComponent
    rowData: rowDataSelector(state, props),
  };
});

export const rowDataSelector = (state: any, { griddleKey }: any) => {
  const rowIndex = state.getIn(["lookup", griddleKey.toString()]);
  return state
    .get("data")
    .get(rowIndex)
    .toJSON();
};

const MakeBlueComponent = (props: any) => (
  <div style={{ backgroundColor: "#0000FF" }}>
    {props.value}
    {/* {props.rowData && (
      <small style={{ marginLeft: 5, opacity: 0.5 }}>{props.rowData.company}</small>
    )} */}
  </div>
);

const EnhanceWithRowData = connect((state, props) => ({
  rowData: rowDataSelector(state, props)
}));


const EnhancedCustomComponent = EnhanceWithRowData(MakeBlueComponent);

const UserPaymentSelect = ({ value, griddleKey, rowData }: any) => {
  const options = [
    { value: "unpaid", label: "Unpaid" },
    { value: "paid", label: "Paid" }
  ];
  return (
    <Select
      options={options}
      value={options.find(option => option.value === value)}
    />
  );
};

class Bills extends React.Component<{}, any> {
  static contextType = AppContext;

  constructor(props: any) {
    super(props);

    this.state = {
      bills: []
    };
  }

  componentDidMount() {
    const { state } = this.context;
    const { currUser } = state;
    axios
      .get("/api/bills", {
        params: { household_id: currUser.household, user_id: currUser.id }
      })
      .then(vals => this.setState({ bills: vals.data }));
  }

  render() {
    return (
      <Griddle data={this.state.bills} plugins={[plugins.LocalPlugin]}>
        <RowDefinition>
          <ColumnDefinition id="name" title="Name" />
          <ColumnDefinition id="user_amount" title="Your Amount Due" />
          <ColumnDefinition id="total_amount" title="Total Amount Due" />
          <ColumnDefinition id="interval" title="Interval" />
          <ColumnDefinition id="due_date" title="Due Date" />
          <ColumnDefinition
            id="due_date"
            title="Due Date"
            customComponent={EnhancedCustomComponent}
          />
        </RowDefinition>
      </Griddle>
    );
  }
}


// const BillsFunction = () => {
//   const { state }: { state: any } = useContext(AppContext);
//   const [bills, setBills] = useState([]);
//   // const [userBillStatus, setUserBilStats] = useState({});
//   const { currUser } = state;
//   useEffect(() => {
//     if (currUser) {
//       axios.get('/api/bills', { params: { household_id: currUser.household, user_id: currUser.id } })
//         .then(vals => setBills(vals.data));
//     }
//   }, []);

//   const billPaymentSelect = ({ value }: any) => {
//     const options = [
//       { value: 'unpaid', label: 'Unpaid' },
//       { value: 'paid', label: 'Paid' },
//     ];

//     return (
//       <Select
//         options={options}
//         // value={options.find(option => option.value === value)}
//       />
//     );
//   };

//   return (
//     <div>
//       <Heading as="h1">Bills</Heading>
//       {bills.length && (
//         <Griddle data={bills} plugins={[plugins.LocalPlugin]}>
//           <RowDefinition>
//             <ColumnDefinition id="name" title="Name" />
//             <ColumnDefinition id="user_amount" title="Your Amount Due" />
//             <ColumnDefinition id="total_amount" title="Total Amount Due" />
//             <ColumnDefinition id="interval" title="Interval" />
//             <ColumnDefinition id="due_date" title="Due Date" />
//             <ColumnDefinition
//               id="user_status"
//               title="Your Payment Status"
//               customComponent={EnhancedCustomComponent}
//             />
//             <ColumnDefinition
//               id="bill_status"
//               title="Bill Payment Status"
//               customComponent={billPaymentSelect}
//             />
//           </RowDefinition>
//         </Griddle>
//       )}
//     </div>
//   );
// };

export default Bills;
