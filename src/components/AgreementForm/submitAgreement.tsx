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
  let dataToSend;
  const dataWithoutHTML = {
    household_id: householdID,
    form_values: JSON.stringify(formVals),
    is_complete: isComplete,
    is_expired: false
  };
  // if (isComplete) {
  //   const htmlString = ReactDOMServer.renderToStaticMarkup(<Preview agreementID={agreementID} />);
  //   dataToSend = { ...dataWithoutHTML, html_string: htmlString };
  // } else {
  //   dataToSend = dataWithoutHTML;
  // }

  dataToSend = dataWithoutHTML;
  
  const agreementRequest = agreementID
    ? axios.patch(`/api/agreements/${agreementID}`, dataToSend)
      .then(() => axios.patch(`/api/households/${householdID}`, { housekeeping: JSON.stringify(formVals.housekeeping)}))
    : axios.post("/api/agreements", dataToSend);
  
  return agreementRequest;
};

const submitAgreement = ({ formVals, householdID, agreementID, isComplete }: AgreementProps) => {
  const { housekeeping } = formVals;
  const formattedValues = {
    ...formVals,
    housekeeping: { ...housekeeping, ...formatHousekeepingForDB(housekeeping) }
  };
  // save the users
  // save the bills
  // save the agreement
  return saveAgreement({ formVals: formattedValues, householdID, agreementID, isComplete });
   
};

export default submitAgreement;