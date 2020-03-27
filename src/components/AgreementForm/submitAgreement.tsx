import React from "react";
import ReactDOMServer from "react-dom/server";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";
import { FormikValues } from "formik";

import { formatHousekeepingForDB, formatHousekeepingToHTML } from "../../helpers/functions";
import Preview from "./AgreementPreview";

type AgreementProps = {
  formVals: FormikValues;
  householdID: string | number;
  agreementID: string;
  houseID: string;
  userID: number;
  isComplete: boolean;
  formattedHousekeeping?: any;
  previewDetails?: any;
};

const saveAgreement = ({
  formVals,
  householdID,
  agreementID,
  isComplete,
  formattedHousekeeping,
  previewDetails
}: AgreementProps) => {
  let dataToSend;

  const dataWithoutHTML = {
    household_id: householdID,
    form_values: JSON.stringify(formVals),
    is_complete: isComplete,
    is_expired: false
  };

  const previewProps = {
    ...formVals,
    formattedHousekeeping,
    ...previewDetails
  };

  if (isComplete) {
    const htmlString = ReactDOMServer.renderToStaticMarkup(<Preview {...previewProps} />);
    console.log("hello???", isComplete, htmlString);
    dataToSend = { ...dataWithoutHTML, html_string: htmlString };
  } else {
    dataToSend = dataWithoutHTML;
  }

  // dataToSend = dataWithoutHTML;

  const agreementRequest = agreementID
    ? axios.patch(`/api/agreements/${agreementID}`, dataToSend)
    : axios.post("/api/agreements", dataToSend);

  return agreementRequest;
};

type SavingProps = {
  formVals: any;
  currUserID?: number;
  houseID?: string;
  householdID?: any;
  usersIDs?: any;
};
const saveUsers = ({ formVals, currUserID, houseID }: SavingProps) => {
  // save the users
  // check if the users exist first
  const usersPromiseArray = formVals.roommates.map((roomie: any) =>
    // stop the whole thing here if the user emails are the same
    axios.get(`/api/users?email=${roomie.email}`)
  );
  return Promise.all(usersPromiseArray).then(usersData => {
    const saveUserHousehold = (userID: number) => {
      return axios.get('/api/households', { params: { user_id: userID, house_id: houseID } })
        .then(householdUsers => {
          if (!householdUsers.data.length) {
            axios.post('/api/households', { user_id: userID, house_id: houseID, ...formVals.leaseDates, is_active: true, housekeeping: JSON.stringify(formVals.housekeeping)});
          } else {
            axios.patch(`/api/households/${householdUsers.data[0].id}`, { user_id: userID, house_id: houseID, ...formVals.leaseDates, is_active: true, housekeeping: JSON.stringify(formVals.housekeeping) });
          }
        });
    };
    return usersData.map((user: any, index: number) => {
      // if user doesn't exist
      if (user.data.length === 0) {
        return axios
          .post(`/api/users/`, {
            ...formVals.roommates[index],
            password: uuidV4()
          })
          .then(createdUser => {
            saveUserHousehold(createdUser.data.id);
            return createdUser.data.id;
          });
      } else {
        return axios
          .patch(`/api/users/${user.data[0].id}`, {
            ...formVals.roommates[index]
          })
          .then(editedUser => {
            saveUserHousehold(editedUser.data.id);
            return editedUser.data.id;
          });
      }
    });
  });
};

const saveBills = ({ formVals, householdID, usersIDs }: SavingProps) => {
  // 1. loop through formvals to double check that you're not recreating a bill that's already made (through bill_uuid)
  return formVals.bills.map((bill: any) => {
    const billToSend = {
      ...bill,
      total_amount: bill.total_amount * 1,
      interval: bill.interval.value,
      household_id: householdID,
      user_status: "unpaid",
      bill_status: "unpaid"
    };
    // 2. check if there is a bill that exists with bill_uuid & household_id & user_id
    return usersIDs.map((userID: any) => {
      return axios
        .get("/api/bills", {
          params: {
            bill_uuid: bill.bill_uuid,
            household_id: householdID,
            user_id: userID,
          }
        })
        .then(houseBillPerUser => {
          // check if bill exists for the user or not
          // console.log(houseBillPerUser.data, userID);
          if (!houseBillPerUser.data.length) {
            // console.log(`creating ${bill.bill_uuid} for ${userID}`);
            return axios.post("/api/bills/", {
              ...billToSend,
              user_id: userID
            });
          } else {
            // console.log(`updating (!?!) ${bill.bill_uuid} for ${userID}`);
            // loop through the created bills with that bill uuidhouseBillPerUser.data
            return houseBillPerUser.data.map((billToUpdate: any) => {
              return axios.patch(`/api/bills/${billToUpdate.id}`, {
                ...billToSend
                // user_id: userID
              });
            });
          }
        });
    });
  });
};

const submitAgreement = ({
  formVals,
  householdID,
  agreementID,
  userID,
  houseID,
  isComplete,
  previewDetails
}: AgreementProps) => {
  const { housekeeping } = formVals;
  const formattedValues = {
    ...formVals,
    housekeeping: { ...housekeeping, ...formatHousekeepingForDB(housekeeping) }
  };
  let agreementLink: string;

  // save the agreement
  return saveAgreement({
    formVals: formattedValues,
    householdID,
    agreementID,
    userID,
    houseID,
    isComplete,
    formattedHousekeeping: formatHousekeepingToHTML(housekeeping),
    previewDetails
  })
    .then(agreementData => {
      agreementLink = agreementData.data.pdf_link;
      return axios.patch(`/api/households/${householdID}`, {
        housekeeping: JSON.stringify(formVals.housekeeping)
      });
    })
    .then(vals => {
      // only save the other things when submitting from the agreement form (isComplete == true)
      if (isComplete) {
        // save the users
        return saveUsers({ formVals: formattedValues, currUserID: userID, houseID })
          .then(users => Promise.all(users)) // grab users id
          .then(usersIDs => saveBills({ formVals: formattedValues, householdID, usersIDs }))
          .then(() => agreementLink); // save the bills
      } else {
        return vals.data;
      }
    });
};

export default submitAgreement;
