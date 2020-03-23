import React from "react";
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
import submitAgreement from "./submitAgreement";

const FormLeavePrompt = (props: any) => {
  const { onCancel, onConfirm } = props;

  const confirmStay = () => {
    // console.log("aaaaaa staaaaay");
    onCancel();
  };

  const confirmLeave = () => {
    // console.log("aaaa leave", props.currUser);
    const { currUser: { household }, formVals, agreementID } = props;
    
    return submitAgreement({ formVals, householdID: household, agreementID }).then(() => {
      console.log("wow i sent it to the server!");
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
