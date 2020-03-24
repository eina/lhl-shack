import React from "react";
import { useFormikContext } from 'formik';
import { Heading, Box, List, ListItem } from '@chakra-ui/core';
import { displayFullName } from '../../helpers/functions';

const LandlordPreview = ({landlord}: {landlord: any}) => {
  console.log(landlord);
  return (
    <Box as="section">
      <Heading as="h1">Landlord</Heading>
      <List as="dl">
        <ListItem as="div">
          <dt>Name</dt>
          <dd>{displayFullName(landlord.firstName, landlord.lastName)}</dd>
        </ListItem>

        <ListItem as="div">
          <dt>Phone</dt>
          <dd>{landlord.phone}</dd>
        </ListItem>

        <ListItem as="div">
          <dt>Email</dt>
          <dd>{landlord.email}</dd>
        </ListItem>
      </List>
    </Box>
  );
};

type PreviewProps = {
  agreementID: string;
}

// add date_saved column
const AgreementPreview = ({ agreementID }: PreviewProps) => {
  const { values, values: {account, roommates, rent, securityDeposit, bills, housekeeping, signatures} } = useFormikContext();

  // const landlordString = ReactDOMServer.renderToStaticMarkup(<LandlordPreview landlord={landlord}/>);
  // it woooooooooooooorks
  // build them separately and return as one string and send them to the server somehow!!!
  // console.log('does this work', landlordString);

  return (
    <Box>
      <Heading as="h1">Rommate Agreement</Heading>

      {/* <LandlordPreview landlord={landlord} /> */}
      {/* {JSON.stringify(values)} */}

      <button>Create Household</button>
    </Box>
  );
};

export default AgreementPreview;
