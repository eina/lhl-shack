import React from 'react'
import { FieldArray, useFormikContext } from "formik";

import { FormValues } from "../../interfaces";

import FieldSet from "../FieldSet";

const RentAndDeposit = () => {
  const { values }: { values: FormValues } = useFormikContext();
  return (
    <div>
      <h2>Rent and Security Deposit</h2>
      <FieldArray name="RentAndDeposit">
        {arrayHelpers => (
          <div>
            <ol>
              {values.RentAndDeposit.map((monies, index) => (
                <li key={index}>
                  <FieldSet type="number" name={`rentAndDeposits.${index}.rent`} label="Total Monthly Rent Amount" />
                  <FieldSet type="number" name={`rentAndDeposits.${index}.deposit`} label="Total Security Deposit Amount" />
                </li>
              ))}
            </ol>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default RentAndDeposit;
