import React from "react";
import { Box, Flex, Text, Divider, Button } from "@chakra-ui/core";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const AnnouncementsCarousel = () => (
  <CarouselProvider
    naturalSlideWidth={80}
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
          <Divider borderColor="indigo.700" />
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

export default AnnouncementsCarousel;