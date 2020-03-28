import React from 'react';
import { FormikProps, useFormikContext } from 'formik';
import { Box, Heading } from '@chakra-ui/core';

import { FormikDateRange } from '../FormikDates';
import PrevNextNav from './PrevNextNav';

const LeaseDates = () => {
  const { values, errors, touched, setFieldValue }: FormikProps<any> = useFormikContext();
  const householdErrors = errors && errors.household ? errors.household : null;
  const householdTouched = touched && touched.household ? touched.household : null;

  return (
    <Box as="section">
      <Heading as="h2">Lease Dates</Heading>

      <FormikDateRange
        label="Lease Dates"
        name="leaseDates"
        stateName="leaseDates"
        stateValue={values.leaseDates}
        onChange={setFieldValue}
        error={householdErrors}
        touched={householdTouched}
      />

      <Box as="footer" my={10}>
        <PrevNextNav before="/agreement/title" after="/agreement/roommates" />
      </Box>
    </Box>
  );
};

export default LeaseDates;