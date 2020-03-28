/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/core";

import FieldSet from "../FieldSet";
import RichEditor from "../RichEditor/RichEditor";
import PrevNextNav from "./PrevNextNav";

export interface HousekeepingValues {
  guests: string;
  weekdayPM: any;
  weekdayAM: any;
  weekendPM: any;
  weekendAM: any;
  rooms: string;
  privateSpaces: string;
  vacations: string;
  personalItems: string;
  smoking: string;
  chores: string;
  choresResolve: string;
  messages: string;
  pets: string;
}

const Housekeeping = (props: any) => {
  const { values, setFieldValue, handleBlur } = props;

  return (
    <Box>
      <Heading as="h2">Housekeeping Rules</Heading>

      <Heading as="h3" fontSize="2xl">
        Guests
      </Heading>
      <p>
        Guests can include mutual friends, visitors, overnight guests, partners, and even parents.
        You should think about whether there should be any reasonable restrictions on how often
        roommates can have guests over, whether there should be special rules for overnight
        guests,if there should be rules about guests&rsquo; conduct when they are visiting, and
        similar issues.
      </p>
      <p>We agree that the following applies to guests:</p>
      <RichEditor
        editorState={values.housekeeping.guestPolicy}
        editorStateName="housekeeping.guestPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />

      <Heading as="h3" fontSize="2xl">
        Quiet Times
      </Heading>
      <Flex align="center" flexWrap="wrap">
        <Box as="span" mr={2}>
          We agree that quiet time will be from
        </Box>
        <FieldSet
          type="number"
          name="housekeeping.weekdayPM"
          inputGroup={{ right: { addOn: "PM" } }}
        />
      </Flex>
      <Flex align="center" flexWrap="wrap">
        <Box as="span" mr={2}>
          to
        </Box>
        <FieldSet
          type="number"
          name="housekeeping.weekdayAM"
          inputGroup={{ right: { addOn: "AM" } }}
        />
        <Box ml={2}>during the week,</Box>
      </Flex>
      <Flex align="center" flexWrap="wrap">
        <Box as="span" mr={2}>
          and from{" "}
        </Box>
        <FieldSet
          type="number"
          name="housekeeping.weekendPM"
          inputGroup={{ right: { addOn: "PM" } }}
        />
      </Flex>
      <Flex align="center" flexWrap="wrap">
        <Box as="span" mr={2}>
          until
        </Box>
        <FieldSet
          type="number"
          name="housekeeping.weekendAM"
          inputGroup={{ right: { addOn: "AM" } }}
        />
        <Box as="span" ml={2}>
          on weekends and holidays.
        </Box>
      </Flex>

      <Heading as="h3" fontSize="2xl" mt={6}>
        Private and Shared Spaces
      </Heading>
      <Heading as="h4" fontSize="xl">
        Room Occupancy Policy
      </Heading>
      <p>
        We agree that the following persons shall occupy the following bedrooms during our tenancy
      </p>
      <RichEditor
        editorState={values.housekeeping.roomsPolicy}
        editorStateName="housekeeping.roomsPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      <Heading as="h4" fontSize="xl">
        Shared Spaces Policy
      </Heading>
      <p>
        We agree to the following about accessing each roommates&rsquo; private spaces and rules
        around shared spaces:
      </p>
      <RichEditor
        editorState={values.housekeeping.spacesPolicy}
        editorStateName="housekeeping.spacesPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      <Heading as="h3" fontSize="2xl">
        Chores
      </Heading>
      <p>We agree to share the following household responsibilities in the following manner:</p>
      <RichEditor
        editorState={values.housekeeping.choresPolicy}
        editorStateName="housekeeping.choresPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      <Heading as="h3" fontSize="2xl">
        Vacations &amp; Vacation Policy
      </Heading>
      <p>
        We agree to the following rules regarding times some or all roommates will be living away
        from the shared property:
      </p>
      <RichEditor
        editorState={values.housekeeping.vacationPolicy}
        editorStateName="housekeeping.vacationPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      <Heading as="h3" fontSize="2xl">
        Personal Items
      </Heading>
      <p>
        You should think about what rules should be in place regarding roommates&rsquo; personal
        belongings, both within their own private spaces and in shared common spaces in the rental
        unit.
      </p>

      <p>Regarding furniture and belongings in common and private areas, we agree that:</p>
      <Heading as="h4" fontSize="xl">
        Personal Items Policy
      </Heading>
      <RichEditor
        editorState={values.housekeeping.personalItemsPolicy}
        editorStateName="housekeeping.personalItemsPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      <Heading as="h3" fontSize="2xl">
        Smoking
      </Heading>
      <p>
        If smoking is permitted, decide if roommates can smoke and if so, where. Also consider vapes
        and marijuana. We agree to the following rules regarding the smoking of different substances
        on and around the premises:
      </p>
      <RichEditor
        editorState={values.housekeeping.smokingPolicy}
        editorStateName="housekeeping.smokingPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      <Heading as="h3" fontSize="2xl">
        Messages
      </Heading>
      <p>
        It is always important to have good communication between roommates. Designate an area to
        leave messages for each other, and to leave messges from the landlord. We agree that any
        messages for other roommates will:
      </p>
      <RichEditor
        editorState={values.housekeeping.messagesPolicy}
        editorStateName="housekeeping.messagesPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      <Heading as="h3" fontSize="2xl">
        Pets
      </Heading>
      <p>
        If pets are allowed, decide whether visitors can bring pets in. Tenants, under the
        Residential Tenancy Act, have the right to determine the rules in the rental unit about
        pets, within what is allowed by the tenancy agreement. Be sure to determine in advance if
        any roommates have allergies to animals.
      </p>
      <RichEditor
        editorState={values.housekeeping.petsPolicy}
        editorStateName="housekeeping.petsPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      <Box as="footer" my={10}>
        <PrevNextNav before="/agreement/bills/utilities" after="/agreement/signatures" />
      </Box>
    </Box>
  );
};

export default Housekeeping;
