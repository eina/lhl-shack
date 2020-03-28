import React, { useContext } from "react";
import { Heading, Box, Flex, Text } from "@chakra-ui/core";
import './Dashboard.scss';
import manWithLaptop from '../assets/person-on-laptop.png';

import { AppContext } from '../Store';

const Home = () => {
  const { state } = useContext(AppContext);
  
  // console.log(state);

  return (
    <>
      <Box w="75%" bg="brand" color="white" className="dashboard-box" d="flex" justifyContent="space-between">
        <Box>
          <Text fontFamily="montserrat" fontWeight="bold" fontSize="3xl">
            Welcome back, Andy!
          </Text>
          <Text>Something something about something here.</Text>
        </Box>

        <img src={manWithLaptop} className="person-on-laptop" />
      </Box>
      {/* <Box w="25%" bg="teal.300">
          Announcements
      </Box>
      <Box w="45%" bg="pink.500">
          Is it quiet time yet
      </Box>
      <Box w="65%" bg="red.500">
          Landlord Contact
      </Box>
      <Box>Upcoming Bills</Box> */}
    </>
  );
};

export default Home;
