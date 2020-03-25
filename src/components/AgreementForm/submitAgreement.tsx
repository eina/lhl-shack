import React from "react";
import ReactDOMServer from "react-dom/server";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";
import { FormikValues } from "formik";

import { formatHousekeepingForDB } from "../../helpers/functions";
import Preview from "./AgreementPreview";
// import { userInfo } from "os";

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
          // stop the whole thing here if the user emails are the same
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
                    return createdUser.data.id;
                  });
              } else {
                return axios
                  .patch(`/api/users/${user.data[0].id}`, {
                    ...formVals.roommates[index]
                  })
                  .then(editedUser => {
                    return editedUser.data.id;
                  });
              }
            });
          })
          .then(users => Promise.all(users)) // grab users id
          .then(usersIDs => {
            // account for deleting == formVals.bills is not gonna be the same length as the server (grab it per household and count the keys?)
            // 1. loop through formvals to double check that you're not recreating a bill that's already made (through bill_uuid)
            return formVals.bills.map((bill: any) => {
              const billToSend = {
                ...bill,
                total_amount: bill.total_amount * 1,
                interval: bill.interval.value,
                household_id: householdID
              };
              // 2. check if there is a bill that exists with bill_uuid & household_id & user_id
              return usersIDs.map(userID => {
                return axios
                  .get("/api/bills", {
                    params: {
                      bill_uuid: bill.bill_uuid,
                      household_id: householdID,
                      user_id: userID
                    }
                  })
                  .then(houseBillPerUser => {
                    // check if bill exists for the user or not
                    if (!houseBillPerUser.data.length) {
                      console.log(`creating ${bill.bill_uuid} for userID`);
                      return axios.post("/api/bills/", {
                        ...billToSend,
                        user_id: userID
                      });
                    } else {
                      console.log(`updating (!?!) ${bill.bill_uuid} for userID`);
                      // loop through the created bills with that bill uuidhouseBillPerUser.data
                      return houseBillPerUser.data.map((billToUpdate: any) => {
                        return axios.patch(`/api/bills/${billToUpdate.id}`, {
                          ...billToSend,
                          user_id: userID
                        });
                      });
                    }
                  });
              });
            });

            // return axios.get(`/api/bills?household_id=${householdID}`).then(houseBills => {
            //   // if there are no bills
            //   // make a bill, loop through the usersIDs
            //   if (!houseBills.data.length || houseBills.data.length !== formVals.bills.length) {
            //     return formVals.bills.map((bill: any) => {
            //       const billToSend = {
            //         ...bill,
            //         total_amount: bill.total_amount * 1,
            //         interval: bill.interval.value,
            //         household_id: householdID
            //       };
            //       return usersIDs.map(userID => {
            //         console.log("creating a bill for", userID);
            //         return axios.post("/api/bills/", { ...billToSend, user_id: userID });
            //       });
            //     });
            //   } else {
            //     // have list of bills,
            //     // since am
            //     const billIdentifiers = houseBills.data.map((bill: any) => ({
            //       bill_id: bill.id,
            //       bill_uuid: bill.bill_uuid
            //     }));
            //     console.log("something", billIdentifiers);
            //   }
            // });
          }); // return vals.data;
      } else {
        return vals.data;
      }
    }
  );
};

export default submitAgreement;
