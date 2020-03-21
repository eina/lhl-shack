import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const defaultValues = {
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

const Household = () => {
  const [household, setHousehold] = useState<Household>(defaultValues);
  useEffect(() => {
    axios
      .get('/api/households/0fd50fe7-e21b-4b33-8f2b-3293d0770ca5')
      .then(vals => {
        setHousehold(vals.data);
      });
  }, []);
  return (
    household && (
      <div>
        <div>{household.address}</div>
        <div>
          {household.start_date} - {household.end_date}
        </div>
        ${household.total_rent_amt}/month
      </div>
    )
  );
};

export default Household;
