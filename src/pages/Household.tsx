import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { Box, Heading, Text, Flex, Avatar, Link, SimpleGrid, Icon, Grid } from '@chakra-ui/core';

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

const roomieInitialValues: any = [];

export const FlexDLItem = ({ title, value }: { title: string; value: any }) => (
  <Flex>
    <Text as="dt" fontWeight="semibold" mr={1}>
      {title}:
    </Text>
    <Text as="dd">{value}</Text>
  </Flex>
);

const Household = () => {
  const { state }: { state: any } = useContext(AppContext);
  const [house, setHouse] = useState<House>(houseDefaultValues);
  const [landlord, setLandlord] = useState<Landlord>(landlordDefaultValues);
  const [roomies, setRoomies] = useState(roomieInitialValues);
  const { currUser } = state;
  console.log(state);

  useEffect(() => {
    //get house info
    axios.get(`api/houses/${currUser.house}`).then(vals => {
      console.log("hi", vals.data);
      setHouse(vals.data);
    });

    //get landlord info
    axios.get(`api/landlords/${currUser.landlord}`).then(vals => {
      setLandlord(vals.data);
    });

    //get roomies
    axios
      .get(`/api/households?house_id=${currUser.house}`)
      .then((tenants: any) => {
        const usersId = tenants.data.map((tenant: any) => tenant.user_id);
        return usersId;
      })
      .then((usersId: any) => {
        const promisesArray: any = [];
        usersId.forEach((userId: any) => {
          promisesArray.push(axios.get(`/api/users/${userId}`));
        });
        return Promise.all(promisesArray);
      })
      .then(usersPromises => {
        usersPromises.forEach((user: any) => {
          setRoomies((prev: any) => [...prev, user.data]);
        });
      });
  }, [currUser.household]);

  return (
    house && (
      <Box>
        <Box as="section" mb={8}>
          <Heading as="h3" fontSize="3xl">
            House
          </Heading>

          <dl>
            <FlexDLItem title="Address" value={house.address} />
            <FlexDLItem title="Number of Rooms" value={house.number_of_rooms} />
            <FlexDLItem title="Number of Bathrooms" value={house.number_of_bathrooms} />
            <FlexDLItem title="Pet Friendly" value={house.pet_friendly ? "Yes" : "No"} />
            <FlexDLItem title="Smoking Allowed" value={house.smoking_allowed ? "Yes" : "No"} />
          </dl>
        </Box>

        <Box as="section" mb={8}>
          <Heading as="h3" fontSize="3xl">
            My Landlord
          </Heading>
          <dl>
            <FlexDLItem title="Landlord" value={`${landlord.first_name} ${landlord.last_name}`} />
            <FlexDLItem title="Address" value={landlord.address} />
            {landlord.company && <FlexDLItem title="Company" value={landlord.company} />}
            <FlexDLItem title="Phone number" value={landlord.phone_number} />
            <FlexDLItem title="Email" value={landlord.email} />
          </dl>
        </Box>

        <Box as="section" mb={8}>
          <Heading as="h3" fontSize="3xl">
            Roommates
          </Heading>
          <Grid templateColumns="repeat(3, 1fr)" gridGap={10}>
            {roomies.map((roomie: any) => (
              <Flex key={roomie.id} align="center" bg="white" p={6} rounded="lg">
                <Avatar name={`${roomie.first_name} ${roomie.last_name}`} size="xl" />

                <Box ml={3} as="dl">
                  <FlexDLItem title="Name" value={`${roomie.first_name} ${roomie.last_name}`} />
                  <FlexDLItem
                    title="Phone"
                    value={<Link href={`tel: roomie.phone_number`}>{roomie.phone_number}</Link>}
                  />
                  <FlexDLItem title="Email" value={roomie.email} />
                </Box>
              </Flex>
            ))}
          </Grid>
        </Box>
      </Box>
    )
  );
};

export default Household;
