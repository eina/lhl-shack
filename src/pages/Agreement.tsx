import React from "react";
import { Box } from "@chakra-ui/core";
import { AppContext } from "../Store";

import AgreementForm from "../components/AgreementForm/AgreementForm";
import Title from "../components/AgreementForm/Title";

const Agreement = () => {
  // const { state, updateState }: { state: any; updateState: Function } = useContext(AppContext);
  // test: 4f261d07-32fc-4b87-878f-8fea900c257b
  return (
    <Box as="section" mt={3}>
      <AgreementForm />
    </Box>
  );
};
export default Agreement;
