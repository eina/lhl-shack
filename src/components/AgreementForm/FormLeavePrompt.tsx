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

import { formatHousekeepingForDB, formatDraftJSForDB } from "../../helpers/functions";

const FormLeavePrompt = (props: any) => {
  const { onCancel, onConfirm } = props;

  const confirmStay = () => {
    // console.log("aaaaaa staaaaay");
    onCancel();
  };

  const confirmLeave = () => {
    // console.log("aaaa leave", props.currUser);
    const {
      currUser: { household },
      formVals: { housekeeping },
      formVals,
      agreementID
    } = props;

    const formattedValues = {
      ...formVals,
      housekeeping: { ...housekeeping, ...formatHousekeepingForDB(housekeeping) }
    };
    const dataToSend = {
      household_id: household,
      form_values: JSON.stringify(formattedValues),
      is_complete: false,
      is_expired: false
    };
    // console.log("what is the agreement id", agreementID);
    const agreementRequest = agreementID
      ? axios.patch(`/api/agreements/${agreementID}`, dataToSend)
      : axios.post("api/agreements", dataToSend);

    agreementRequest.then(() => {
      // console.log("wow i sent it to the server!");
      onConfirm();
    });
    // onConfirm();
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
