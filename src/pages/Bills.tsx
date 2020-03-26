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

const rowDataSelector = (state: any, { griddleKey }: any) => {
  return state
    .get('data')
    .find((rowMap: any) => rowMap.get('griddleKey') === griddleKey)
    .toJSON();
};

const enhancedWithRowData = connect((state, props) => {
  return {
    // rowData will be available into MyCustomComponent
    rowData: rowDataSelector(state, props),
  };
});

const Bills = () => {
  const {
    state,
    updateState,
  }: { state: any; updateState: Function } = useContext(AppContext);
  const toast = useToast();
  const [bills, setBills] = useState([]);
  const [userBillStatus, setUserBilStats] = useState({});
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

  const userPaymentSelect = (props: any) => {
    const { value, griddleKey, rowData } = props;
    const options = [
      { value: 'unpaid', label: 'Unpaid' },
      { value: 'paid', label: 'Paid' },
    ];

    const onChangeHandler = (event: any) => {
      const { id } = rowData;
      console.log('on change handler', event);
      console.log('is there rowData', rowData);
      // 1. do an axios patch request --> need bil.id
      axios.patch(`/api/bills/${id}`, { user_status: value }).then(() =>
        toast({
          title: 'Marked as paid!',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      );
    };

    return (
      <Select
        options={options}
        value={options.find(option => option.value === value)}
        onChange={(e: any) => onChangeHandler(e.value)}
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
              customComponent={enhancedWithRowData(userPaymentSelect)}
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
