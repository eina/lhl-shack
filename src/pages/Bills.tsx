import React, { useEffect, useContext, useState } from 'react';
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
  const toast = useToast();
  const [bills, setBills] = useState([]);
  const { currUser } = state;
  useEffect(() => {
    console.log("hi", { house_id: currUser.house, user_id: currUser.id });
    if (currUser) {
      axios.get('/api/bills', { params: { house_id: currUser.house, user_id: currUser.id } })
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
      <Select
        options={options}
        value={options.find(option => option.value === selectedValue)}
        onChange={handleOnChange}
      />
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
      <Select
        options={options}
        value={options.find(option => option.value === selectedValue)}
        onChange={handleOnChange}
      />
    );
  };

  const NewLayout = ({ Table, Pagination, Filter, SettingsWrapper }: any) => (
    <>
      <Filter />
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
      {bills.length && (
        <Griddle
          data={bills}
          plugins={[plugins.LocalPlugin]}
          components={{
            Layout: NewLayout
          }}
        >
          <RowDefinition>
            <ColumnDefinition id="name" title="Name" />
            <ColumnDefinition id="user_amount" title="Your Amount Due" />
            <ColumnDefinition id="total_amount" title="Total Amount Due" />
            <ColumnDefinition id="interval" title="Interval" customComponent={FormatInterval} />
            <ColumnDefinition id="due_date" title="Due Date" />
            <ColumnDefinition
              id="id"
              title="Your Payment Status"
              customComponent={UserPaymentSelect}
            />
            <ColumnDefinition
              id="bill_uuid"
              title="Bill Payment Status"
              customComponent={BillPaymentSelect}
            />
          </RowDefinition>
        </Griddle>
      )}
    </div>
  );
};

export default Bills;
