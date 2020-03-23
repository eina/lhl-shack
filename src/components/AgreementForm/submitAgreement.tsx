import axios from 'axios';
import { FormikValues } from 'formik';
import { formatHousekeepingForDB } from '../../helpers/functions';

type AgreementProps = {
  formVals: FormikValues;
  householdID: string | number;
  agreementID: string | number;
};
const submitAgreement = ({ formVals, householdID, agreementID }: AgreementProps) => {
  const { housekeeping } = formVals;
  const formattedValues = {
    ...formVals,
    housekeeping: { ...housekeeping, ...formatHousekeepingForDB(housekeeping) }
  };
  const dataToSend = {
    household_id: householdID,
    form_values: JSON.stringify(formattedValues),
    is_complete: false,
    is_expired: false
  };

  const agreementRequest = agreementID
    ? axios.patch(`/api/agreements/${agreementID}`, dataToSend)
    : axios.post("api/agreements", dataToSend);

  return agreementRequest;
};

export default submitAgreement;