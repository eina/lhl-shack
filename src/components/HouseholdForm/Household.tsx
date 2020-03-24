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
      <FieldSet type="checkbox" name="household.pet_friendly" label="Pet Friendly?" />
      <FieldSet type="checkbox" name="household.smoking_allowed" label="Smoking Allowed?" />
      <FieldSet type="number" name="household.number_of_bedrooms" label="No. of Bedrooms" />
      <FieldSet type="number" name="household.number_of_bathrooms" label="No. of Bathrooms" />
      <FieldSet type="number" name="household.total_rent_amt" label="Monthly Rent" inputGroup={{ left: { addOn: "$" } }} />
      <FieldSet type="number" name="household.total_security_deposit_amt" label="Security Deposit" inputGroup={{ left: { addOn: "$" } }} />

    </Box>
  );
};

export default Household;
