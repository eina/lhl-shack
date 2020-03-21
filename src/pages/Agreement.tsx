import React, { useContext } from "react";
import { Button, Box, Heading, Drawer, useDisclosure } from "@chakra-ui/core";
// import { FormValues } from "../interfaces";

import AgreementMenu from "../components/AgreementForm/AgreementMenu";
import AgreementForm from "../components/AgreementForm/AgreementForm";
// import TestDraft from "../components/AgreementForm/TestDraft";

const Agreement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Heading as="h1">Roommate Agreement Generator</Heading>
      <p>main component! something something something</p>​{/* <AgreementMenu /> */}
      <Box mt={10}>
        <AgreementForm />
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          test
        </Drawer>
      </Box>
    </div>
  );
};
export default Agreement;
