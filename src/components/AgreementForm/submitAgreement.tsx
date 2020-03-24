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
                return axios
                  .post(`/api/users/`, {
                    ...formVals.roommates[index],
                    password: uuidV4()
                  })
                  .then(createdUser => {
                    console.log("createdUser", createdUser);
                    return createdUser.data[0].id;
                  });
              } else {
                return axios
                  .patch(`/api/users/${user.data[0].id}`, {
                    ...formVals.roommates[index]
                  })
                  .then(editedUser => {
                    console.log("editedUser", editedUser);
                    return editedUser.data.id;
                  });
              }
            });
          })
          .then(users => Promise.all(users)) // grab users id
          .then(usersIDs => {
            const billIdentifier = uuidV4();
            return axios.get(`/api/bills?household_id=${householdID}`).then(houseBills => {
              console.log("houseBills.data", houseBills.data);
              // if there are no bills
              // make a bill, loop through the usersIDs
              return usersIDs.map((userID, index) => {
                if (!houseBills.data.length) {
                  const billToSend = {
                    ...formVals.bills[index],
                    total_amount: formVals.bills[index].total_amount * 1,
                    interval: formVals.bills[index].interval.value,
                    bill_uuid: billIdentifier,
                    user_id: userID,
                    household_id: householdID
                  };
                  return axios.post("/api/bills/", billToSend);
                } else {
                  console.log("something");
                }
              });
            });
          }); // return vals.data;
      } else {
        return vals.data;
      }
    }
  );
};

export default submitAgreement;
