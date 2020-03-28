import React from 'react';
import { Link } from 'react-router-dom';
import { Heading, Box } from '@chakra-ui/core';

const Logo = () => (
  <Heading
    as="h1"
    size="lg"
    fontFamily="logo"
    fontSize="6xl"
    fontWeight="black"
    px="1em"
    py="10"
    mb={0}
  >
    <Link to="/">
      <Box as="span" color="brand">
                  shack
      </Box>
    </Link>
  </Heading>
);

export default Logo;