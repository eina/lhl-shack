import React from "react";
import { Box } from "@chakra-ui/core";

import AgreementForm from "../components/AgreementForm/AgreementForm";

const Agreement = () => {
  return (
    <Box as="section" mt={3}>
      <AgreementForm />
    </Box>
  );
};
export default Agreement;
