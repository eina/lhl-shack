import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import { FormikValues } from 'formik';

import { formatHousekeepingForDB } from '../../helpers/functions';
import Preview from './AgreementPreview';

type AgreementProps = {
  formVals: FormikValues;
  householdID: string | number;
  agreementID: string;
  isComplete: boolean;
};

const saveAgreement = ({ formVals, householdID, agreementID, isComplete }: AgreementProps) => {
  const { housekeeping } = formVals;
  let dataToSend: any;
  const formattedValues = {
    ...formVals,
    housekeeping: { ...housekeeping, ...formatHousekeepingForDB(housekeeping) }
  };
  const dataWithoutHTML = {
    household_id: householdID,
    form_values: JSON.stringify(formattedValues),
    is_complete: isComplete,
    is_expired: false
  };

  if (isComplete) {
    const htmlString = ReactDOMServer.renderToStaticMarkup(<Preview agreementID={agreementID} />);
    dataToSend = { ...dataWithoutHTML, html_string: htmlString };
  } else {
    dataToSend = dataWithoutHTML;
  }
  const agreementRequest = agreementID
    ? axios.patch(`/api/agreements/${agreementID}`, dataToSend)
    : axios.post("/api/agreements", dataToSend);

  return agreementRequest;
};
const submitAgreement = ({ formVals, householdID, agreementID, isComplete }: AgreementProps) => {
  const { landlord } = formVals;

  /* Landlord Saving */

  if (householdID) {
  /* Agreement Saving */
    return saveAgreement({ formVals, householdID, agreementID, isComplete });
  } else {
    console.log('i have to create a household sigh, here a landlord');
    // i have a user
    // need to save landlord -> need landlord_id for house
    return axios.post('/api/landlords', landlord);
    // need to save house -> for house_id for household
    // need to save household -> household_id for agreement
    // need to
  }

  

 
};

export default submitAgreement;