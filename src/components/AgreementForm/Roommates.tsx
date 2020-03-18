import React from "react";
import { FieldArray, useFormikContext } from "formik";

import { FormValues } from "../../interfaces";

import FieldSet from "../FieldSet";

const Roommates = () => {
  const { values }: { values: FormValues } = useFormikContext();
  return (
    <div>
      <h2>Roommates</h2>
      <FieldArray name="roommates">
        {arrayHelpers => (
          <div>
            <ol>
              {values.roommates.map((roomie, index) => (
                <li key={index}>
                  <FieldSet type="text" name={`roommates.${index}.firstName`} label="First Name" />
                  <FieldSet type="text" name={`roommates.${index}.lastName`} label="Last Name" />
                  <FieldSet type="text" name={`roommates.${index}.email`} label="Email" />
                  <FieldSet type="text" name={`roommates.${index}.phone`} label="Phone" />
                  <p>======== temporary line break ============</p>
                </li>
              ))}
            </ol>
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
