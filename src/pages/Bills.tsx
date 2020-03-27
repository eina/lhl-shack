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

const Bills = () => {
  const { state }: { state: any } = useContext(AppContext);
  const [bills, setBills] = useState([]);
  // const [userBillStatus, setUserBilStats] = useState({});
  const { currUser } = state;
  useEffect(() => {
    if (currUser) {
      axios.get('/api/bills', { params: { household_id: currUser.household, user_id: currUser.id } })
        .then(vals => setBills(vals.data));
    }
  }, []);

  const userPaymentSelect = ({ value }: any) => {
    console.log('what is this', value);
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

  const billPaymentSelect = ({ value }: any) => {
    const options = [
      { value: 'unpaid', label: 'Unpaid' },
      { value: 'paid', label: 'Paid' },
    ];

    return (
      <Select
        options={options}
        value={options.find(option => option.value === value)}
      />
    );
  };
  

  return (
    <div>
      <Heading as="h1">Bills</Heading>
      {bills.length && (
        <Griddle data={bills} plugins={[plugins.LocalPlugin]}>
          <RowDefinition>
            <ColumnDefinition id="name" title="Name" />
            <ColumnDefinition id="user_amount" title="Your Amount Due" />
            <ColumnDefinition id="total_amount" title="Total Amount Due" />
            <ColumnDefinition id="interval" title="Interval" />
            <ColumnDefinition id="due_date" title="Due Date" />
            <ColumnDefinition
              id="user_status"
              title="Your Payment Status"
              customComponent={userPaymentSelect}
            />
            <ColumnDefinition
              id="bill_status"
              title="Bill Payment Status"
              customComponent={billPaymentSelect}
            />
          </RowDefinition>
        </Griddle>
      )}
    </div>
  );
};

export default Bills;
