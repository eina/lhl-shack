import React from "react";
import { Field, FieldArray, ErrorMessage, useFormikContext, FieldProps } from "formik";
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/core";

import { FormValues } from "../../interfaces";

import FieldSet from "../FieldSet";

const Roommates = (props: any) => {
  const { values }: { values: FormValues } = useFormikContext();
  return (
    <div>
      <h2>Roommates</h2>
      <FieldArray name="roommates">
        {arrayHelpers => (
          <div>
            {values.roommates.map((roomie, index) => (
              <div key={index}>
                <FieldSet type="text" name={`roommates.${index}.firstName`} label="First Name" />
                <FieldSet type="text" name={`roommates.${index}.lastName`} label="Last Name" />
                <FieldSet type="text" name={`roommates.${index}.email`} label="Email" />
                <FieldSet type="text" name={`roommates.${index}.phone`} label="Phone" />
                <p>======== temporary line break ============</p>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                arrayHelpers.push({ firstName: "", lastName: "", email: "", phone: "" })
              }
            >
              Add Roommate
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default Roommates;
