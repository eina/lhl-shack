import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import {
  Heading,
  Grid,
  Box,
  Avatar,
  Divider,
  SimpleGrid,
  Flex,
} from '@chakra-ui/core';

import { displayFullName } from '../helpers/functions';

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

interface Roomie {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
}
const roomieInitialValues: any = [];

const Household = () => {
  const {
    state,
    updateState,
  }: { state: any; updateState: Function } = useContext(AppContext);
  const [house, setHouse] = useState<House>(houseDefaultValues);
  const [landlord, setLandlord] = useState<Landlord>(landlordDefaultValues);
  const [roomies, setRoomies] = useState(roomieInitialValues);
  const { currUser } = state;
  let houseId: string;
  console.log(currUser);
  useEffect(() => {
    axios
      .get(`/api/households/${currUser.household}`)
      .then(vals => {
        // console.log("Here is vals data: ",vals.data)
        houseId = vals.data.house_id;
        // console.log("here is houseId: ", houseId)
        return houseId;
        // setHousehold(vals.data);
      })
      .then(houseId => axios.get(`/api/houses/${houseId}`))
      .then(house => {
        // console.log("this is house data: ", house.data);
        setHouse(house.data);
        return house.data.landlord_id;
      })
      .then(landlordId => axios.get(`/api/landlords/${landlordId}`))
      .then(landlord => {
        // console.log("here is landlord: ", landlord.data)
        setLandlord(landlord.data);
      })
      .then(() => axios.get(`/api/households?house_id=${houseId}`))
      .then(tenants => {
        // console.log('here are the tenants: ', tenants.data)
        const usersId = tenants.data.map((tenant: any) => tenant.user_id);
        // console.log('here are users id: ', usersId)
        return usersId;
      })
      .then(usersId => {
        console.log('Here is usersId: ', usersId);
        const promisesArray: any = [];
        usersId.forEach((userId: any) => {
          promisesArray.push(axios.get(`/api/users/${userId}`));
        });
        console.log('here promises arrray! ', promisesArray);
        return Promise.all(promisesArray);
      })
      .then(usersPromises => {
        console.log('here is userspromises: ', usersPromises);
        usersPromises.forEach((user: any) => {
          setRoomies((prev: any) => [...prev, user.data]);
        });
        // users promises is an array. loop through it & put usersPromises.data into the state.
      });
  }, []);

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
          {roomies.map((roomie: any) => (
            <div key={roomie.id}>
              <SimpleGrid columns={2} spacing={5}>
                <span>
                  <Avatar src={roomie.avatar} />
                  <p>
                    {roomie.first_name} {roomie.last_name}
                  </p>
                  <p>{roomie.phone_number}</p>
                  <p>{roomie.email}</p>
                </span>
              </SimpleGrid>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Household;
