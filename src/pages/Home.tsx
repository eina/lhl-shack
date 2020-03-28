import React, { useContext } from "react";
import { Heading, Box, Flex, Text, Image, Divider, Button } from "@chakra-ui/core";
import Clock from "react-live-clock";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import { AppContext } from "../Store";

import "./Dashboard.scss";
import manWithLaptop from "../assets/person-on-laptop.png";

const AnnouncementsCarousel = () => (
  <CarouselProvider
    naturalSlideWidth={100}
    naturalSlideHeight={125}
    totalSlides={3}
    isIntrinsicHeight={true}
  >
    <Slider>
      <Slide index={0}>
        <Box>
          <Text fontFamily="montserrat" fontWeight="bold" fontSize="lg" lineHeight="shorter">
            New garbage days!
          </Text>
          <Text>
            Toffee tiramisu sweet. Cookie chocolate bar candy toffee brownie halvah lemon drops
            chocolate jelly. Jujubes toffee lemon drops cupcake gingerbread chocolate.
          </Text>
          <ul>
            <li>Brownie jelly oat cake</li>
            <li>
              tootsie roll donut cheesecake tootsie roll croissant sweet. Chupa chups chocolate
              brownie cheesecake macaroon tart pudding cupcake brownie. Liquorice wafer croissant.
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
      <Button
        as={ButtonBack}
        bg="brand"
        color="white"
        _hover={{ bg: "indigo.800" }}
        _focus={{ bg: "indigo.800" }}
      >
        Back
      </Button>
      <Button
        as={ButtonNext}
        bg="brand"
        color="white"
        _hover={{ bg: "indigo.800" }}
        _focus={{ bg: "indigo.800" }}
      >
        Next
      </Button>
    </Flex>
  </CarouselProvider>
);

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

        {/* <Image src={manWithLaptop} className="person-on-laptop" /> */}
      </Box>
      <Flex flexDirection={["column", "column", "row"]}>
        {/* change blue to orange depending on time */}
        <Box
          bg="blue.100"
          className="dashboard-box"
          d="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mr={[0, 0, "1em"]}
        >
          <Text
            fontFamily="montserrat"
            fontWeight="bold"
            fontSize="6xl"
            color="blue.900"
            lineHeight="shorter"
            className="dashboard-clock"
          >
            <Clock format={"h:mm A"} ticking={true} timezone={"US/Pacific"} />
          </Text>
          <Text>Quiet time has started. It will end at 8 AM.</Text>
        </Box>

        <Box className="dashboard-box" w={["100%", "100%", "80%"]} bg="white">
          <Heading as="p" fontSize="3xl" color="red.700">
            Bills
          </Heading>
          <Text>Rent is due in 5 days. (Mark as paid?)</Text>
          <Text>Rent is due in 5 days. (Mark as paid?)</Text>
          <Text>Rent is due in 5 days. (Mark as paid?)</Text>
          <Text>Rent is due in 5 days. (Mark as paid?)</Text>
        </Box>
      </Flex>

      <Box color="cyan.900" className="dashboard-box" w={["100%", "100%", "60%"]}>
        <Heading as="p" fontSize="3xl">
          Announcements
        </Heading>

        <AnnouncementsCarousel />
      </Box>
    </>
  );
};

export default Home;
