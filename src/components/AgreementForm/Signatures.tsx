import React from "react";
import moment from "moment";
import { FieldArray, useFormikContext } from "formik";

import { FormValues } from "../../interfaces";
import { FormikSingleDatePicker } from "../FormikDates";
import { displayFullName } from "../../helpers/functions";
import FieldSet from "../FieldSet";

const Signatures = (props: any) => {
  const { values, setFieldValue, handleBlur } = props;

  const roommateName = values.roommates.map((roomie: any) =>
    displayFullName(roomie.firstName, roomie.lastName)
  );
  return (
    <div>
      <h2>Signatures</h2>
      <FieldArray name="signatures">
        {arrayHelpers => (
          <div>
            <ol>
              {values.signatures.map((signature: any, index: any) => (
                <li key={index}>
                  <FieldSet
                    type="text"
                    name={`signatures.${index}.fullName`}
                    label={roommateName[index]}
                    formHelper={`Please match name inputted with ${roommateName[index]}`}
                  />

                  <FieldSet
                    type="checkbox"
                    name={`signatures.${index}.agreed`}
                    label="I have agreed to what has been written in this agreement."
                  />

                  <FormikSingleDatePicker
                    stateValue={values.signatures[index].date}
                    stateName={`signatures.${index}.date`}
                    name={`signatures.${index}.date`}
                    onChange={setFieldValue}
                    numberOfMonths={1}
                    label="Date Signed"
                  />
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => arrayHelpers.push({ fullName: "", agreed: false, date: moment() })}
            >
              Add Signature
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default Signatures;
