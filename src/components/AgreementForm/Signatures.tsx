import React from 'react';
import { FieldArray, useFormikContext } from 'formik';

import { FormValues } from '../../interfaces';
import { FormikSingleDatePicker } from '../FormikDates';

import FieldSet from '../FieldSet';

const Signatures = (props: any) => {
  const { values, setFieldValue, handleBlur } = props;
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
                    label="Full Name"
                  />
                  <FormikSingleDatePicker
                    stateValue={values.signatures[index].date}
                    stateName={`signatures.${index}.date`}
                    name={`signatures.${index}.date`}
                    onChange={setFieldValue}
                    numberOfMonths={1}
                    label="Date Signed"
                  />
                  <p>======== temporary line break ============</p>
                  <FieldSet
                    type="text"
                    name={`signatures.${index}.fullName`}
                    label="Full Name"
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
              onClick={() =>
                arrayHelpers.push({ fullName: '', date: 'YYYY-MM-DD' })
              }
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
