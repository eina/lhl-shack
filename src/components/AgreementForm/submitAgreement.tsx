import axios from 'axios';
import { FormikValues } from 'formik';
import { formatHousekeepingForDB } from '../../helpers/functions';

type AgreementProps = {
  formVals: FormikValues;
  householdID: string | number;
  agreementID: string | number;
  isComplete: boolean;
};
const submitAgreement = ({ formVals, householdID, agreementID, isComplete }: AgreementProps) => {
  const { housekeeping } = formVals;
  const formattedValues = {
    ...formVals,
    housekeeping: { ...housekeeping, ...formatHousekeepingForDB(housekeeping) }
  };
  const dataToSend = {
    household_id: householdID,
    form_values: JSON.stringify(formattedValues),
    is_complete: isComplete,
    is_expired: false
  };

  // console.log('i need this', JSON.stringify(formattedValues, null, 2));

  const agreementRequest = agreementID
    ? axios.patch(`/api/agreements/${agreementID}`, dataToSend)
    : axios.post("api/agreements", dataToSend);

  return agreementRequest;
};

export default submitAgreement;