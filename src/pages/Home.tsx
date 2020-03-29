import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { isWeekend, format as datefnsFormat, formatDistanceToNow } from "date-fns";
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
  const [billDueSoon, setBillDueSoon] = useState<any>({});

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

  useEffect(() => {
    const { id, household } = currUser;
    axios.get('/api/bills', {
      params: { date_to_check: datefnsFormat(new Date(), "yyyy-MM-dd"), user_id: id, household_id: household }
    }).then(bills => {
      if (bills.data.length) {
        setBillDueSoon(bills.data[0]);
      }
    });
  }, [currUser]);

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
            { billDueSoon.due_date ? (
              <>
                <Heading as="p" fontSize="3xl" color="red.700">{billDueSoon.name}</Heading>
                <Text>is due <strong>{formatDistanceToNow(new Date(billDueSoon.due_date), { addSuffix: true })}</strong>. <Link to="/bills">Mark as paid?</Link></Text>
              </>
            ) : (
              <>
                <Heading as="p" fontSize="3xl" color="red.700">No bills due soon!</Heading>
                <Text>Nice! <Link to="/bills">Check out all your upcoming bills?</Link></Text>
              </>
            )}
          </Box>

          <QuietTime {...quietTime} />
        </Flex>

        <Box color="cyan.900" className="dashboard-box" w={["100%", "100%", "70%"]}>
          <Heading as="p" fontSize="3xl">
          Messages
          </Heading>

          <MessageCarousel />
        </Box>
      </Flex>
    </>
  );
};

export default Home;
