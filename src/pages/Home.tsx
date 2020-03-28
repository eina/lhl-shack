import React, { useContext } from "react";
import Clock from "react-live-clock";
import { Heading, Box, Flex, Text, Image } from "@chakra-ui/core";
import "./Dashboard.scss";
import manWithLaptop from "../assets/person-on-laptop.png";

import { AppContext } from "../Store";

const Home = () => {
  const { state } = useContext(AppContext);

  // console.log(state);

  return (
    <>
      <Box
        bg="brand"
        color="white"
        className="dashboard-box hero-box"
        d="flex"
        justifyContent="space-between"
      >
        <Box>
          <Text fontFamily="montserrat" fontWeight="bold" fontSize="4xl" lineHeight="shorter">
            Welcome back, Andy!
          </Text>
          <Text>Something something about something here.</Text>
        </Box>

        <Image src={manWithLaptop} className="person-on-laptop" />
      </Box>
      {/* change blue to orange depending on time */}
      <Box
        bg="blue.100"
        className="dashboard-box"
        d="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Text
          fontFamily="montserrat"
          fontWeight="bold"
          fontSize="5xl"
          color="blue.900"
          lineHeight="shorter"
          className="dashboard-clock"
        >
          <Clock format={"h:mm A"} ticking={true} timezone={"US/Pacific"} />
        </Text>
        <Text>Quiet time has started. It will end at 8 AM.</Text>
      </Box>

      <Box bg="indigo.500" color="white" className="dashboard-box">
        <Text fontFamily="montserrat" fontWeight="bold" fontSize="3xl" lineHeight="shorter">
          Announcements
        </Text>
      </Box>
      {/* <Box w="25%" bg="teal.300">
          Announcements
      </Box>
      <Box w="65%" bg="red.500">
          Landlord Contact
      </Box>
      <Box>Upcoming Bills</Box> */}
    </>
  );
};

export default Home;
