import React from "react";
import FieldSet from "../FieldSet";

import { Box, Button, Heading } from "@chakra-ui/core";

import { useHistory } from "react-router-dom";

import RichEditor from "../RichEditor/RichEditor";

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
  const history = useHistory();
  const { values, setFieldValue, handleBlur } = props;

  return (
    <Box>
      <Heading as="h2">Housekeeping Rules</Heading>

      <Heading as="h3">Guests</Heading>
      <p>
        Guests can include mutual friends, visitors, overnight guests, partners, and even parents.
        You should think about whether there should be any reasonable restrictions on how often
        roommates can have guests over, whether there should be special rules for overnight
        guests,if there should be rules about guests' conduct when they are visiting, and similar
        issues.
      </p>
      <p>We agree that the following applies to guests:</p>
      <RichEditor
        editorState={values.housekeeping.guestPolicy}
        editorStateName="housekeeping.guestPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />

      <Heading as="h3">Quiet Times</Heading>
      <FieldSet
        type="number"
        label="We agree that quiet time will be from (PM)"
        name="housekeeping.weekdayPM"
        inputGroup={{ right: { addOn: "PM" } }}
      />
      <FieldSet
        type="number"
        label="to (AM) during the week, and from"
        name="housekeeping.weekdayAM"
        inputGroup={{ right: { addOn: "AM" } }}
      />
      <FieldSet
        type="number"
        label="PM until"
        name="housekeeping.weekendPM"
        inputGroup={{ right: { addOn: "PM" } }}
      />
      <FieldSet
        type="number"
        label="AM on weekends and holidays."
        name="housekeeping.weekendAM"
        inputGroup={{ right: { addOn: "AM" } }}
      />

      <Heading as="h3">Private and Shared Spaces</Heading>
      <Heading as="h4">Room Occupancy Policy</Heading>
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
      <Heading as="h4">Shared Spaces Policy</Heading>
      <p>
        We agree to the following about accessing each roommates' private spaces and rules around
        shared spaces:
      </p>
      <RichEditor
        editorState={values.housekeeping.spacesPolicy}
        editorStateName="housekeeping.spacesPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      <Heading as="h3">Chores</Heading>
      <p>We agree to share the following household responsibilities in the following manner:</p>
      <RichEditor
        editorState={values.housekeeping.choresPolicy}
        editorStateName="housekeeping.choresPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      <Heading as="h3">Vacations &amp; Vacation Policy</Heading>
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
      <Heading as="h3">Personal Items</Heading>
      <p>
        You should think about what rules should be in place regarding roommates' personal
        belongings, both within their own private spaces and in shared common spaces in the rental
        unit.
      </p>

      <p>Regarding furniture and belongings in common and private areas, we agree that:</p>
      <Heading as="h4">Personal Items Policy</Heading>
      <h5>Personal Items Policy</h5>
      <RichEditor
        editorState={values.housekeeping.personalItemsPolicy}
        editorStateName="housekeeping.personalItemsPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      <Heading as="h3">Smoking</Heading>
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
      <Heading as="h3">Messages</Heading>
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
      <Heading as="h3">Pets</Heading>
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
      <div>
        <Button
          // variantColor="orange"
          onClick={() => {
            history.push("/agreement/bills/utilities");
          }}
        >
          Previous Section
        </Button>
        <Button
          // variantColor="pink"
          onClick={() => {
            history.push("/agreement/signatures");
          }}
        >
          Next Section
        </Button>
      </div>
    </Box>
  );
};

export default Housekeeping;
