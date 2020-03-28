import React, { useContext } from 'react';
import moment from 'moment';
import { Box, Heading } from '@chakra-ui/core';

import { AppContext } from '../Store';
import { FlexDLItem } from './Household';

interface PastHouseholdData {
  user_id: number;
  address: string;
  lease_period: any;
  landlord_name: string;
  landlord_phone: string;
}

const pastHouseholdData = [
  {
    user_id: 1,
    address: `335-550 Taylor St, Vancouver, BC, V6B 1R1, Canada`,
    lease_dates: {
      start_date: "2016-08-01",
      end_date: "2018-08-01"
    },
    landlord_name: "Kyle Jones",
    landlord_phone: "778-552-4492"
  },
  {
    user_id: 1,
    address: `328 Eglinton Ave, Toronto, ON, M4P 1A6, Canada`,
    lease_dates: {
      start_date: "2013-08-01",
      end_date: "2016-08-01"
    },
    landlord_name: "Tracie McDonald",
    landlord_phone: "416-555-0134"
  },
  {
    user_id: 2,
    address: `601-258 6th St, New Westminster, BC, V3L 4U8, Canada`,
    lease_dates: {
      start_date: "2015-08-01",
      end_date: "2016-08-01"
    },
    landlord_name: "Linda Parker",
    landlord_phone: "604-555-6251"
  },
  {
    user_id: 2,
    address: `1647 Semlin Dr, Vancouver, BC V5L 3J8, Canada`,
    lease_dates: {
      start_date: "2010-02-01",
      end_date: "2015-02-01"
    },
    landlord_name: "Ryan Woods",
    landlord_phone: "778-993-2211"
  }
];

const PreviousHousehold = () => {
  const { state }: { state: any } = useContext(AppContext);
  const { currUser } = state;

  return (
    <div>
      <Heading as="h1">My Previous Houeholds</Heading>
      {pastHouseholdData
        .filter(pastPlace => pastPlace.user_id === currUser.id)
        .map((pastPlace, index) => (
          <Box as="dl" key={index} mb={4} borderWidth="1px" p="1.25em" borderRadius="1em">
            <FlexDLItem title="Address" value={pastPlace.address} />
            <FlexDLItem
              title="Lease Period"
              value={`${moment(pastPlace.lease_dates.start_date).format("MMM Do YYYY")} - ${moment(
                pastPlace.lease_dates.end_date
              ).format("MMM Do YYYY")}`}
            />
            <FlexDLItem title="Landlord" value={pastPlace.landlord_name} />
            <FlexDLItem title="Landlord Contact" value={pastPlace.landlord_phone} />
          </Box>
        ))}
    </div>
  );
};

export default PreviousHousehold;
