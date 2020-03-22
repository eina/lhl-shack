import React from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@chakra-ui/core";

const FormLeavePrompt = (props: any) => {
  const { onCancel, onConfirm } = props;

  const confirmStay = () => {
    console.log("aaaaaa staaaaay");
    onCancel();
  };

  const confirmLeave = () => {
    console.log("aaaa leave", props.currUser);
    const {
      currUser: { household },
      formVals
    } = props;

    console.log("what is here tho", formVals);
    /* 
      1. get the most recent agreement that matches the household 
      2. check if it's expired
      3. if it's not expired, set that as expired
      4. save the new values with is_complete: false, is_expired: false
     */
    axios
      .post("/api/agreements", {
        household_id: household,
        form_values: JSON.stringify(formVals),
        is_complete: false,
        is_expired: false
      })
      .then(() => {
        console.log("wow i sent it to the server!");
        onConfirm();
      });
  };

  return (
    <Modal isOpen={true} onClose={confirmStay}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>

        <ModalFooter>
          <Button variantColor="blue" mr={3} onClick={confirmStay}>
            Stay on Page
          </Button>
          <Button variantColor="blue" mr={3} onClick={confirmLeave}>
            Leave Page
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FormLeavePrompt;
