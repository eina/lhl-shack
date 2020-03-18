import React from 'react';
import { FieldArray, useFormikContext } from 'formik';

import { FormValues } from '../../interfaces';

import FieldSet from '../FieldSet';

const Signatures = () => {
  const { values }: { values: FormValues } = useFormikContext();
  return (
    <div>
      <h2>Signatures</h2>
      <FieldArray name="signatures">
        {arrayHelpers => (
          <div>
            <ol>
              {values.signatures.map((signature, index) => (
                <li key={index}>
                  <FieldSet
                    type="text"
                    name={`signatures.${index}.fullName`}
                    label="Full Name"
                  />
                  <FieldSet
                    type="date"
                    name={`signatures.${index}.date`}
                    label="Today's Date"
                  />
                  <p>======== temporary line break ============</p>
                  <FieldSet
                    type="text"
                    name={`signatures.${index}.fullName`}
                    label="Full Name"
                  />
                  <FieldSet
                    type="date"
                    name={`signatures.${index}.date`}
                    label="Today's Date"
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
