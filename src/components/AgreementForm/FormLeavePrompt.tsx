import React from "react";
import axios from "axios";
import {
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@chakra-ui/core";

import { formatDraftJSForDB } from "../../helpers/functions";

const FormLeavePrompt = (props: any) => {
  const { onCancel, onConfirm } = props;

  const confirmStay = () => {
    console.log("aaaaaa staaaaay");
    onCancel();
  };

  const confirmLeave = () => {
    console.log("aaaa leave", props.currUser);
    const draftJSKeys = [
      "guestPolicy",
      "spacesPolicy",
      "roomsPolicy",
      "choresPolicy",
      "vacationPolicy",
      "personalItemsPolicy",
      "smokingPolicy",
      "messagesPolicy",
      "petsPolicy"
    ];
    const {
      currUser: { household },
      formVals: { housekeeping },
      formVals
    } = props;
    let updatedHousekeeping = { ...housekeeping };

    // update housekeeping draft js to better saveable values
    for (const housekeepingKey in housekeeping) {
      if (draftJSKeys.includes(housekeepingKey)) {
        const draftJSValue = housekeeping[housekeepingKey];
        updatedHousekeeping = {
          ...updatedHousekeeping,
          [housekeepingKey]: formatDraftJSForDB(draftJSValue)
        };
      }
    }

    const formattedValues = { ...formVals, housekeeping: updatedHousekeeping };
    console.log("pls save properly", formattedValues);
    /* 
      1. get the most recent agreement that matches the household 
      2. check if it's expired
      3. if it's not expired, set that as expired
      4. save the new values with is_complete: false, is_expired: false
     */
    // axios
    //   .patch("/api/agreements", {
    //     household_id: household,
    //     form_values: JSON.stringify(formattedValues),
    //     is_complete: false,
    //     is_expired: false
    //   })
    //   .then(() => {
    //     console.log("wow i sent it to the server!");
    //     onConfirm();
    //   });
    onConfirm();
  };

  return (
    <Modal isOpen={true} onClose={confirmStay}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Leave Roommate Agreement Generator?</ModalHeader>
        <ModalBody>Your form values will be saved when you navigate away.</ModalBody>

        <ModalFooter>
          <Button size="sm" mr={3} onClick={confirmStay}>
            Stay on Page
          </Button>
          <Button size="sm" variantColor="red" onClick={confirmLeave}>
            <Icon name="warning" mr={2} /> Leave Page
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FormLeavePrompt;
