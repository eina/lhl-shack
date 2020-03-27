import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { Heading, Avatar, Divider, SimpleGrid } from '@chakra-ui/core';

// import { displayFullName } from "../helpers/functions";

import { AppContext } from '../Store';

interface House {
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

const houseDefaultValues = {
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

// interface Roomie {
//   first_name: string;
//   last_name: string;
//   phone_number: string;
//   email: string;
// }
const roomieInitialValues: any = [];

const Household = () => {
  const { state }: { state: any } = useContext(AppContext);
  const [house, setHouse] = useState<House>(houseDefaultValues);
  const [landlord, setLandlord] = useState<Landlord>(landlordDefaultValues);
  const [roomies, setRoomies] = useState(roomieInitialValues);
  const { currUser } = state;
  console.log(state);

  /* 
    data you have:
    houseID, userID, landlordID, householdID

    data you need to show:
    x house information 
    x landlord info
    - rooommates info
  */
  useEffect(() => {
    //get house info
    axios.get(`api/houses/${currUser.house}`).then(vals => {
      setHouse(vals.data);
    });

    //get landlord info
    axios.get(`api/landlords/${currUser.landlord}`).then(vals => {
      setLandlord(vals.data);
    });

    axios.get(`api/agreements?house_id=${currUser.house}`).then(vals => {
      setRoomies(vals.data[0].form_values.roommates)
      console.log('agreements roomies?: ', vals.data[0].form_values.roommates)
    })
    // axios
    //   .get(`/api/households?house_id=${currUser.house}`)
    //   .then(tenants => {
    //     const usersId = tenants.data.map((tenant: any) => tenant.user_id);
    //     return usersId;
    //   })
    //   .then(usersId => {
    //     const promisesArray: any = [];
    //     usersId.forEach((userId: any) => {
    //       promisesArray.push(axios.get(`/api/users/${userId}`));
    //     });
    //     return Promise.all(promisesArray);
    //   })
    //   .then(usersPromises => {
    //     usersPromises.forEach((user: any) => {
    //       setRoomies((prev: any) => [...prev, user.data]);
    //     });
    //   });
  }, [currUser.household]);

  return (
    house && (
      <div>
        <dl>
          <Heading as="h3">Household</Heading>
        </dl>
        <Divider />
        <dd>{house.address}</dd>
        {/* <dd>
          {house.start_date} - {house.end_date}
        </dd> */}
        {/* <dd>${house.total_rent_amt}/month</dd> */}
        <dl>
          <Heading as="h3">My Landlord</Heading>
          <Divider />
          <dd>
            <b>Landlord:</b> {landlord.first_name} {landlord.last_name}
          </dd>
          <dd>
            <b>Phone number:</b> {landlord.phone_number}
          </dd>
          <dd>
            <b>Email:</b> {landlord.email}
          </dd>
          <dd>
            <b>Address:</b> {landlord.address}
          </dd>
        </dl>
        <div>
          <Heading as="h3">Roommates</Heading>
          <Divider />
          <SimpleGrid columns={2} spacing={5}>
            {roomies.map((roomie: any) => (
              <div key={roomie.id}>
                <Avatar src={roomie.avatar} />
                <p>
                  {roomie.first_name} {roomie.last_name}
                </p>
                <p>{roomie.phone_number}</p>
                <p>{roomie.email}</p>
              </div>
            ))}
          </SimpleGrid>
        </div>
      </div>
    )
  );
};

export default Household;
