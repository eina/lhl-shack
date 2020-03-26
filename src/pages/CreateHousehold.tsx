import React from "react";

import { Box } from "@chakra-ui/core";

import CreateHouseholdForm from '../components/HouseholdForm/CreateHouseholdForm';

const CreateHousehold = () => {
  return (
    <Box as="div" mt={3}>
      <CreateHouseholdForm />
    </Box>
  );
};
export default CreateHousehold;
