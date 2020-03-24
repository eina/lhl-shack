import React from "react";
import ReactDOMServer from "react-dom/server";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";
import { FormikValues } from "formik";

import { formatHousekeepingForDB } from "../../helpers/functions";
import Preview from "./AgreementPreview";

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
    : axios.post("/api/agreements", dataToSend);

  return agreementRequest.then(() =>
    axios.patch(`/api/households/${householdID}`, {
      housekeeping: formVals.housekeeping
    })
  );
};

const submitAgreement = ({ formVals, householdID, agreementID, isComplete }: AgreementProps) => {
  const { housekeeping } = formVals;
  const formattedValues = {
    ...formVals,
    housekeeping: { ...housekeeping, ...formatHousekeepingForDB(housekeeping) }
  };
  // save the bills
  // save the agreement
  return saveAgreement({ formVals: formattedValues, householdID, agreementID, isComplete }).then(
    vals => {
      // only save the other things when submitting from the agreement form (isComplete == true)
      if (isComplete) {
        // save the users
        // check if the users exist first
        const usersPromiseArray = formVals.roommates.map((roomie: any) =>
          axios.get(`/api/users?email=${roomie.email}`)
        );
        return Promise.all(usersPromiseArray)
          .then(usersData => {
            return usersData.map((user: any, index: number) => {
              // if user doesn't exist
              if (user.data.length === 0) {
                return axios.post(`/api/users/`, {
                  ...formVals.roommates[index],
                  password: uuidV4()
                });
              } else {
                return axios.patch(`/api/users/${user.data[0].id}`, {
                  ...formVals.roommates[index]
                });
              }
            });
          })
          .then(() => {
            return axios.get(`/api/bills?household_id=${householdID}`).then(houseBills => {
              const { portion: rentPortion, ...rentDetails} = formVals.rent;
              const { portion: depositPortion, ...depositDetails } = formVals.securityDeposit;
              // simplified bills table: total_amount, user_amount, name, due_date, interval
              // if there are no bills
              if (!houseBills.data.length) {
                console.log("trying to save bills!", { rentDetails, depositDetails });
                const rent = axios.post("/api/bills", {
                  ...rentDetails,
                  interval: formVals.rent.interval.value,
                  name: "rent",
                  total_amount: formVals.rent.total_amount * 1,
                  household_id: householdID
                });
                const deposit = axios.post("/api/bills", {
                  ...depositDetails,
                  interval: formVals.securityDeposit.interval.value,
                  name: "security deposit",
                  total_amount: formVals.securityDeposit.total_amount * 1,
                  household_id: householdID
                });

                return Promise.all([rent, deposit]);

              } else {
                console.log('something');
              }
            });
          }); // return vals.data;
      } else {
        return vals.data;
      }
    }
  );
};

export default submitAgreement;
