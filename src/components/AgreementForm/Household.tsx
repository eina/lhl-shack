import React from "react";
import { Field, useFormikContext, FormikProps } from "formik";

import FieldSet from "../FieldSet";
import { FormikDateRange } from "../FormikDates";

const Household = () => {
  const { values, setFieldValue }: { values: any; setFieldValue: Function } = useFormikContext();
  return (
    <div>
      <h2>Rent and Household Information</h2>
      <FieldSet type="text" name="household.address" label="House Address" />
      <FormikDateRange
        label="Lease Dates"
        name="lease-dates"
        stateName="household.leaseDates"
        stateValue={values.household.leaseDates}
        onChange={setFieldValue}
      />
      <FieldSet type="checkbox" name="household.petFriendly" label="Pet Friendly?" />
      <FieldSet type="checkbox" name="household.smokingAllowed" label="Smoking Allowed?" />
      <FieldSet type="number" name="household.bedroomsAmt" label="No. of Bedrooms" />
      <FieldSet type="number" name="household.bathroomsAmt" label="No. of BAthrooms" />
      <FieldSet type="number" name="household.rentAmt" label="Monthly Rent" />
      <FieldSet type="number" name="household.securityDepositAmt" label="Security Deposit" />
    </div>
  );
};

export default Household;
