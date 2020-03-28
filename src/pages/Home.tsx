import React, { useContext } from "react";
import { Heading, Box, Flex, Text, Image, Divider, Button } from "@chakra-ui/core";
import Clock from "react-live-clock";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import { AppContext } from "../Store";

import "./Dashboard.scss";
import manWithLaptop from "../assets/person-on-laptop.png";

const Home = () => {
  const { state } = useContext(AppContext);

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

      <Box bg="cyan.300" color="cyan.900" className="dashboard-box">
        <Heading>Announcements</Heading>

        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={3}
          isIntrinsicHeight={true}
        >
          <Slider>
            <Slide index={0}>
              <Box>
                <Text fontFamily="montserrat" fontWeight="bold" fontSize="xl" lineHeight="shorter">
                  New garbage days!
                </Text>
                <Text>
                  Toffee tiramisu sweet. Cookie chocolate bar candy toffee brownie halvah lemon
                  drops chocolate jelly. Jujubes toffee lemon drops cupcake gingerbread chocolate.
                </Text>
                <ul>
                  <li>Brownie jelly oat cake</li>
                  <li>
                    tootsie roll donut cheesecake tootsie roll croissant sweet. Chupa chups
                    chocolate brownie cheesecake macaroon tart pudding cupcake brownie. Liquorice
                    wafer croissant.
                  </li>
                </ul>
                <Divider borderColor="cyan.700" />
                <Text>Posted on Wednesday, March 25th, 8:00 PM</Text>
              </Box>
            </Slide>
            <Slide index={1}>I am the second Slide.</Slide>
            <Slide index={2}>I am the third Slide.</Slide>
          </Slider>
          <Flex justify="space-between">
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          </Flex>
        </CarouselProvider>
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
