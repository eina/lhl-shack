import React from "react";
import { useFormikContext, FormikProps } from "formik";
import { Box, Heading } from "@chakra-ui/core";

import FieldSet from "../FieldSet";
import { FormikDateRange } from "../FormikDates";

const Household = () => {
  const { values, errors, touched, setFieldValue }: FormikProps<any> = useFormikContext();
  const householdErrors = errors && errors.household ? errors.household : null;
  const householdTouched = touched && touched.household ? touched.household : null;

  return (
    <Box as="section">
      <Heading as="h2">Rent and Household Information</Heading>
      <FieldSet type="text" name="household.address" label="House Address" />
      <FormikDateRange
        label="Lease Dates"
        name="leaseDates"
        stateName="household.leaseDates"
        stateValue={values.household.leaseDates}
        onChange={setFieldValue}
        error={householdErrors}
        touched={householdTouched}
      />
      <FieldSet type="checkbox" name="household.petFriendly" label="Pet Friendly?" />
      <FieldSet type="checkbox" name="household.smokingAllowed" label="Smoking Allowed?" />
      <FieldSet type="number" name="household.bedroomsAmt" label="No. of Bedrooms" />
      <FieldSet type="number" name="household.bathroomsAmt" label="No. of Bathrooms" />
      <FieldSet type="number" name="household.rentAmt" label="Monthly Rent" inputGroup={{ left: { addOn: "$" } }} />
      <FieldSet type="number" name="household.securityDepositAmt" label="Security Deposit" inputGroup={{ left: { addOn: "$" } }} />

    </Box>
  );
};

export default Household;