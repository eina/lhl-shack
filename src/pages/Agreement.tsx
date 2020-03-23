import React from "react";
import { Box } from "@chakra-ui/core";
import { AppContext } from "../Store";

import AgreementForm from "../components/AgreementForm/AgreementForm";
import Title from "../components/AgreementForm/Title";

const Agreement = () => {
  // const { state, updateState }: { state: any; updateState: Function } = useContext(AppContext);
  return (
    <Box as="section" mt={3}>
      <AgreementForm />
    </Box>
  );
};
export default Agreement;
