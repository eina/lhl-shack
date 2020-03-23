import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Heading } from '@chakra-ui/core';

import { displayFullName } from "../helpers/functions";


interface Household {
  id: number;
  total_rent_amt: number;
  total_security_deposit_amt: number;
  address: string;
  number_of_rooms: number;
  number_of_bathrooms: number;
  pet_friendly: boolean;
  smoking_allowed: boolean;
  start_date: string;
  end_date: string;
  user_id: number;
  landlord_id: number;
}

const householdDefaultValues = {
  id: 0,
  total_rent_amt: 0,
  total_security_deposit_amt: 0,
  address: '',
  number_of_rooms: 0,
  number_of_bathrooms: 0,
  pet_friendly: false,
  smoking_allowed: false,
  start_date: '',
  end_date: '',
  user_id: 0,
  landlord_id: 0,
};

interface Landlord {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  email: string;
  company: string;
}

const landlordDefaultValues = {
  id: 0,
  first_name: '',
  last_name: '',
  phone_number: '',
  address: '',
  email: '',
  company: '',
};

const Household = () => {
  const [household, setHousehold] = useState<Household>(householdDefaultValues);
  const [landlord, setLandlord] = useState<Landlord>(landlordDefaultValues);
  useEffect(() => {
    axios.get('/api/houses/484a9270-cde9-4a29-a66a-ecd132fafb3b').then(vals => {
      setHousehold(vals.data);
    });
  }, []);
  useEffect(() => {
    axios.get('/api/landlords/1').then(vals => {
      setLandlord(vals.data);
    });
  }, []);
  return (
    household && (
      <div>
        <Heading as="h1">My Household</Heading>
        <div>{household.address}</div>
        <div>
          {household.start_date} - {household.end_date}
        </div>
        ${household.total_rent_amt}/month
        <div>
          <Heading as="h1">My Landlord</Heading>
          <div>{landlord.first_name}{' '}{landlord.last_name}</div>
          <div>{landlord.phone_number}</div>
          <div>{landlord.email}</div>
          <div>{landlord.address}</div>
        </div>
      </div>
    )
  );
};

export default Household;
