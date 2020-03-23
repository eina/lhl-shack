import React from "react";
import { Box } from "@chakra-ui/core";
// import { FormValues } from "../interfaces";

// import AgreementMenu from "../components/AgreementForm/AgreementMenu";
import AgreementForm from "../components/AgreementForm/AgreementForm";
// import TestDraft from "../components/AgreementForm/TestDraft";

const Agreement = () => {
  return (
    <div>
      {/* <Heading as="h1">Roommate Agreement Generator</Heading>​ */}
      {/* <AgreementMenu /> */}
      <Box as="section" mt={3}>
        <AgreementForm />
      </Box>
    </div>
  );
};
export default Agreement;
