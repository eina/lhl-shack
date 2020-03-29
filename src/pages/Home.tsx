import React, { useState, useContext, useEffect } from "react";
import { isWeekend } from "date-fns";
import axios from "axios";
import { Heading, Box, Flex, Text } from "@chakra-ui/core";

import { AppContext } from "../Store";
import { isItQuietHours } from "../helpers/functions";
import MessageCarousel from '../components/Dashboard/MessageCarousel';
import QuietTime from '../components/Dashboard/QuietTime';

import "./Dashboard.scss";

const Home = () => {
  const { state } = useContext(AppContext);
  const { currUser }: any = state;
  const [quietTime, setQuietTime] = useState({ active: false, startTime: "", endTime: ""});

  useEffect(() => {
    axios.get(`/api/households/${currUser.household}`).then(household => {
      if (household && household.data) {
        const {
          housekeeping: { weekdayAM, weekdayPM, weekendAM, weekendPM }
        } = household.data;
        setQuietTime({ active: isItQuietHours(weekdayAM, weekdayPM, weekendAM, weekendPM),
          startTime: isWeekend(new Date()) ? weekendPM : weekdayPM,
          endTime: isWeekend(new Date()) ? weekendAM : weekdayAM });
      }
    });
  }, [currUser.household]);

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
            Welcome back, {currUser.first_name}!
          </Text>
          <Text>Something something about something here.</Text>
        </Box>
      </Box>

      <Flex flexDirection={["column", "column", "row-reverse"]}>
        <Flex flexDirection={"column"}>
          <Box className="dashboard-box" bg="white">
            <Heading as="p" fontSize="3xl" color="red.700">
            Bills
            </Heading>
            <Text>Rent is due in 5 days. (Mark as paid?)</Text>
          </Box>

          <QuietTime {...quietTime} />
        </Flex>

        <Box color="cyan.900" className="dashboard-box" w={["100%", "100%", "70%"]}>
          <Heading as="p" fontSize="3xl">
          Announcements
          </Heading>

          <MessageCarousel />
        </Box>
      </Flex>
    </>
  );
};

export default Home;
