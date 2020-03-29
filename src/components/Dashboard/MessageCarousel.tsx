import React from "react";
import { formatDistance } from 'date-fns';
import { Flex, Text, Divider, Button } from "@chakra-ui/core";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import { brandButton } from '../../chakra/customTheme';

const AnnouncementsCarousel = (props: any) => (
  <CarouselProvider
    naturalSlideWidth={80}
    naturalSlideHeight={125}
    totalSlides={3}
    isIntrinsicHeight={true}
  >
    <Slider>
      {props.messages.map((message: any, index: number) => (
        <Slide index={index} key={index}>
          {message.message_title ? (<Text fontFamily="montserrat" fontWeight="bold" fontSize="lg" lineHeight="shorter">
            {message.message_title}
          </Text>) : null }
          <Text>{message.message_text}</Text>
          <Divider borderColor="indigo.700" />
          <Text fontSize="sm">Posted by {message.author} {formatDistance(new Date(message.created_at), new Date(), { addSuffix: true })}</Text>
        </Slide>
      ))}

    </Slider>
    <Flex justify="space-between" mt={5}>
      <Button
        as={ButtonBack}
        {...brandButton}
      >
        Back
      </Button>
      <Button
        as={ButtonNext}
        {...brandButton}
      >
        Next
      </Button>
    </Flex>
  </CarouselProvider>
);

export default AnnouncementsCarousel;