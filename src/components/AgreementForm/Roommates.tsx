import React from "react";
import { Field, FieldArray, useFormikContext } from "formik";
import { FormValues } from "../../interfaces";

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
                <Field name={`roommates.${index}.firstName`} type="text" />
                <Field name={`roommates.${index}.lastName`} type="text" />
                <Field name={`roommates.${index}.email`} type="email" />
                <Field name={`roommates.${index}.phone`} type="phone" />
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
