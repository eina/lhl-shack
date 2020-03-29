import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import Select from 'react-select';
import Griddle, {
  plugins,
  RowDefinition,
  ColumnDefinition,
} from 'griddle-react';
import { Heading, Box, Spinner, useToast } from '@chakra-ui/core';
import { AppContext } from '../Store';

import './Bills.scss';

const Bills = () => {
  const { state }: { state: any } = useContext(AppContext);
  const toast = useToast();
  const [bills, setBills] = useState([]);
  const { currUser } = state;
  useEffect(() => {
    if (currUser) {
      axios.get('/api/bills', { params: { household_id: currUser.household, user_id: currUser.id } })
        .then(vals => setBills(vals.data));
    }
  }, [currUser]);

  const options = [
    { value: "unpaid", label: "Unpaid" },
    { value: "paid", label: "Paid" }
  ];

  const UserPaymentSelect = (props: any) => {
    const { value } = props;
    const bill: any = bills.find(({ id }: any) => id === value);
    const [selectedValue, setSelectedValue] = useState(bill.user_status);

    const handleOnChange = (optObj: any) => {
      axios
        .patch(`/api/bills/${bill.id}`, { user_status: optObj.value })
        .then(() => {
          setSelectedValue(optObj);
          toast({
            title: `${bill.name} marked as ${optObj.value}!`,
            status: "success",
            position: "top-right",
            duration: 4500,
            isClosable: true
          });
        })
        .catch(() => {
          toast({
            title: `Could not mark ${bill.name} as ${optObj.value}`,
            description: `Please try again later.`,
            status: "error",
            position: "top-right",
            duration: 4500,
            isClosable: true
          });
        });
    };

    return (
      <Box maxW="150px">
        <Select
          options={options}
          value={options.find(option => option.value === selectedValue)}
          onChange={handleOnChange}
        />
      </Box>
    );
  };

  const BillPaymentSelect = ({ value }: any) => {
    const bill: any = bills.find(({ bill_uuid }: any) => bill_uuid === value);
    const [selectedValue, setSelectedValue] = useState(bill.user_status);

    const handleOnChange = (optObj: any) => {
      axios.patch(`/api/bills/${bill.id}`, { user_status: optObj.value }).then(() => {
        setSelectedValue(optObj);
        toast({
          title: `${bill.name} marked as ${optObj.value}!`,
          status: "success",
          position: "top-right",
          duration: 4500,
          isClosable: true
        });
      }).catch(() => {
        toast({
          title: `Could not mark ${bill.name} as ${optObj.value}`,
          description: `Please try again later.`,
          status: "error",
          position: "top-right",
          duration: 4500,
          isClosable: true
        });
      });
    };

    return (
      <Box maxW="150px">
        <Select
          options={options}
          value={options.find(option => option.value === selectedValue)}
          onChange={handleOnChange}
        />
      </Box>
    );
  };

  const NewLayout = ({ Table, Filter }: any) => (
    <>
      {/* <Filter /> */}
      <Table />
      {/* <Pagination /> */}
    </>
  );

  const FormatInterval = ({ value }: any) => {
    switch (value) {
    case 'monthly':
      return <span>Monthly</span>;
    case '2monthly':
      return <span>Every 2 Months</span>;
    case 'annually':
      return <span>Annually</span>;
    default:
      return <span>Once</span>;
    }
  };

  return (
    <div>
      <Heading as="h1">Bills</Heading>
      {!bills.length ? <Spinner /> : (
        <Box className="griddle-container">
          <Griddle
            data={bills}
            plugins={[plugins.LocalPlugin]}
            components={{
              Layout: NewLayout
            }}
            styleConfig={{
              icons: {
                TableHeadingCell: {
                  sortDescendingIcon: "↓",
                  sortAscendingIcon: "↑"
                }
              }
            }}
          >
            <RowDefinition>
              <ColumnDefinition id="name" title="Name" />
              <ColumnDefinition
                id="user_amount"
                title="Your Amount Due"
                customComponent={({ value }) => <span>${value}</span>}
              />
              <ColumnDefinition
                id="total_amount"
                title="Total Amount Due"
                customComponent={({ value }) => <span>${value}</span>}
              />
              <ColumnDefinition id="interval" title="Interval" customComponent={FormatInterval} />
              <ColumnDefinition
                id="due_date"
                title="Due Date"
                customComponent={({ value }) => (
                  <span>{moment(value).format("dd MMM Do, YYYY")}</span>
                )}
              />
              <ColumnDefinition
                id="id"
                title="Portion Status"
                customComponent={UserPaymentSelect}
              />
              <ColumnDefinition
                id="bill_uuid"
                title="Total Status"
                customComponent={BillPaymentSelect}
              />
            </RowDefinition>
          </Griddle>
        </Box>
      )}
    </div>
  );
};

export default Bills;
