import React from "react";
import moment from "moment";
import { Box, Heading, List, ListItem, Text } from "@chakra-ui/core";

const AgreementPreview = (props: any) => {
  const updateFormat = "dddd, MMMM Do YYYY, h:mm:ss a";
  const momentFormat = "dddd, MMMM Do YYYY";
  const {
    created_at,
    updated_at,
    landlord,
    house,
    household,
    roommates,
    bills,
    housekeeping,
    formattedHousekeeping,
    signatures
  } = props;
  const [rent, securityDeposit, ...utilities] = bills;
  const { weekdayAM, weekdayPM, weekendAM, weekendPM } = housekeeping;
  const {
    guestPolicy,
    spacesPolicy,
    roomsPolicy,
    choresPolicy,
    vacationPolicy,
    personalItemsPolicy,
    smokingPolicy,
    messagesPolicy,
    petsPolicy
  } = formattedHousekeeping;

  const sectionProps = {
    mt: 3,
    // mb: 2
  };

  return (
    <Box>
      <Heading as="h1">Roommate Agreement</Heading>
      <Text>Created on: {moment(created_at).format(updateFormat)}</Text>
      {updated_at !== created_at && (
        <Text>Last updated on: {moment(updated_at).format(updateFormat)}</Text>
      )}
      <Box as="section" {...sectionProps}>
        <Heading as="h2">Roommates</Heading>
        <Text>
          <strong>This agreement is entered into by:</strong>
        </Text>
        <List as="ol" styleType="decimal">
          {roommates.map((roommie: any, index: number) => (
            <ListItem key={index}>
              {roommie.first_name} {roommie.last_name}
            </ListItem>
          ))}
        </List>

        <Box {...sectionProps}>
          <Text>
            We the roommates of {house.address}, agree that this document represents a binding
            agreement between us with respect to our tenancy beginning on{" "}
            {moment(household.start_date).format(momentFormat)}.
          </Text>
          <Text>
            We further agree that if this agreement conflicts with any of our rights and obligations
            under the Tenancy Agreement, with respect to the above rental unit or with the
            provisions4 of any applicable laws, the said Tenancy Agreement and the applicable law(s)
            will prevail in all respects.
          </Text>
        </Box>
      </Box>

      <Box as="section" {...sectionProps}>
        <Heading as="h2">Landlord Contact Information</Heading>
        <List>
          <ListItem>
            {landlord.first_name} {landlord.last_name}
          </ListItem>
          <ListItem>{landlord.address}</ListItem>
          <ListItem>{landlord.email}</ListItem>
          <ListItem>{landlord.phone_number}</ListItem>
          {landlord.company && <ListItem>{landlord.company}</ListItem>}
        </List>
      </Box>

      <Box as="section" {...sectionProps}>
        <Heading as="h2">Rent</Heading>

        <Text>We agree that the our rent obligations will be apportioned as follows:</Text>
        <List>
          <ListItem>Total amount: ${rent.total_amount}</ListItem>
          <ListItem>Roommate amount: ${rent.user_amount}</ListItem>
          <ListItem>
            To be paid: {rent.interval.label} starting {moment(rent.due_date).format(momentFormat)}
          </ListItem>
        </List>
      </Box>

      <Box as="section" {...sectionProps}>
        <Heading as="h2">Security Deposit</Heading>
        <Text>
          We agree that the our security deposit obligations will be apportioned as follows:
        </Text>
        <List>
          <ListItem>Total amount: ${securityDeposit.total_amount}</ListItem>
          <ListItem>Roommate amount: ${securityDeposit.user_amount}</ListItem>
          <ListItem>
            To be paid: {securityDeposit.interval.label} starting{" "}
            {moment(securityDeposit.due_date).format(momentFormat)}
          </ListItem>
        </List>
      </Box>

      {utilities.length ? (
        <Box as="section" {...sectionProps}>
          <Heading as="h2">Other Charges</Heading>
          {utilities.map((utility: any, index: any) => (
            <Box key={index} {...sectionProps}>
              <Heading as="h3">{utility.name}</Heading>
              <List>
                <ListItem>Total amount: ${utility.total_amount}</ListItem>
                <ListItem>Roommate amount: ${utility.user_amount}</ListItem>
                <ListItem>
                  To be paid: {utility.interval.label} starting{" "}
                  {moment(utility.due_date).format(momentFormat)}
                </ListItem>
              </List>
            </Box>
          ))}
        </Box>
      ) : null}

      <Box as="section" {...sectionProps}>
        <Heading as="h2">Noise</Heading>
        <Text>
          Early morning or late night noise can have a significant effect on a living
          arrangementbetween roommates. It is important to think about what restrictions on noise
          make sense for yourliving arrangement, and to check your municipal noise bylaws to ensure
          no roommates are puttingthe tenancy at risk by violating them.
        </Text>
        <Text>
          We agree that “quiet time” will be from <strong>{weekdayPM} pm</strong> until{" "}
          <strong>{weekdayAM} am</strong> during the week, and from <strong>{weekendPM} pm</strong>{" "}
          until <strong>{weekendAM} am</strong> on weekends and holidays.
        </Text>
      </Box>

      {guestPolicy ? (
        <Box as="section" {...sectionProps}>
          <Heading as="h2">Guest Policy</Heading>
          <div dangerouslySetInnerHTML={{ __html: guestPolicy }} />
        </Box>
      ) : null}

      {spacesPolicy ? (
        <Box as="section" {...sectionProps}>
          <Heading as="h2">Spaces Policy</Heading>
          <div dangerouslySetInnerHTML={{ __html: spacesPolicy }} />
        </Box>
      ) : null}

      {roomsPolicy ? (
        <Box as="section" {...sectionProps}>
          <Heading as="h2">Rooms Policy</Heading>
          <div dangerouslySetInnerHTML={{ __html: roomsPolicy }} />
        </Box>
      ) : null}

      {choresPolicy ? (
        <Box as="section" {...sectionProps}>
          <Heading as="h2">Chores Policy</Heading>
          <div dangerouslySetInnerHTML={{ __html: choresPolicy }} />
        </Box>
      ) : null}

      {vacationPolicy ? (
        <Box as="section" {...sectionProps}>
          <Heading as="h2">Vacation Policy</Heading>
          <div dangerouslySetInnerHTML={{ __html: vacationPolicy }} />
        </Box>
      ) : null}

      {personalItemsPolicy ? (
        <Box as="section" {...sectionProps}>
          <Heading as="h2">Personal Items Policy</Heading>
          <div dangerouslySetInnerHTML={{ __html: personalItemsPolicy }} />
        </Box>
      ) : null}

      {smokingPolicy ? (
        <Box as="section" {...sectionProps}>
          <Heading as="h2">Smoking Policy</Heading>
          <div dangerouslySetInnerHTML={{ __html: smokingPolicy }} />
        </Box>
      ) : null}

      {messagesPolicy ? (
        <Box as="section" {...sectionProps}>
          <Heading as="h2">Messages Policy</Heading>
          <div dangerouslySetInnerHTML={{ __html: messagesPolicy }} />
        </Box>
      ) : null}

      {petsPolicy ? (
        <Box as="section" {...sectionProps}>
          <Heading as="h2">Pets Policy</Heading>
          <div dangerouslySetInnerHTML={{ __html: petsPolicy }} />
        </Box>
      ) : null}

      <Box as="section" {...sectionProps}>
        <Heading as="h2">Acknowledgement</Heading>
        <Text>
          Each of us has received a copy of and read our Tenancy Agreement. (Note that your landlord
          is required by law to provide each tenant with a copy of the Tenancy Agreement.)
        </Text>
        <Text>
          The signing of this agreement indicates our full understanding and acceptance of the above
          provisions and terms.
        </Text>

        <List as="ol" styleType="decimal">
          {signatures.map((roomie: any, index: number) => (
            <ListItem key={index}>
              {roomie.fullName} digitally signed this agreement on{" "}
              {moment(roomie.date).format(momentFormat)} as <em>{signatures[index].fullName}</em>.
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default AgreementPreview;
