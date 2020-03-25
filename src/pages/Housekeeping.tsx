import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';

import { AppContext } from '../Store';

// import RichEditor from "../components/RichEditor/RichEditor";

import { Heading, Divider } from '@chakra-ui/core';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

interface HousekeepingRule {
  [key: string]: any;
}

const Housekeeping = () => {
  const {
    state,
    updateState,
  }: { state: any; updateState: Function } = useContext(AppContext);
  const emptyHousekeepingRule: HousekeepingRule = {};
  const [housekeeping, setHousekeeping] = useState(emptyHousekeepingRule);
  const { currUser } = state;

  useEffect(() => {
    let houseId: string;
    axios.get(`/api/households/${currUser.household}`).then(vals => {
      // { guestPolicy: EditorState.createWithContent(convertFromRaw(JSON.parse(vals.data.agreements[0].form_values.housekeeping.guestPolicy)))}
      console.log('here is vals: ', vals.data.housekeeping);
      setHousekeeping(vals.data.housekeeping);
    });
  }, []);
  // const contentState = convertFromRaw(housekeeping);
  // const editorState = EditorState.createWithContent(contentState);
  return (
    <div>
      <Heading as="h1">Housekeeping</Heading>
      <Divider />
      <Heading as="h3" size="lg">
        Guest Policy
      </Heading>
      {housekeeping.guestPolicy && (
        <Editor
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(housekeeping.guestPolicy))
          )}
          onChange={() => {}}
          readOnly={true}
        />
      )}
      <Heading as="h3" size="lg">
        Noise Policy
      </Heading>
      {housekeeping.weekdayAM && (
        <div>
          <p>
            <b>Weekday Quiet Times: </b>
            {housekeeping.weekdayPM}PM - {housekeeping.weekdayAM}AM
          </p>
          <Divider />
          <p>
            <b>Weekend Quiet Times: </b>
            {housekeeping.weekendPM}PM - {housekeeping.weekendAM}AM
          </p>
        </div>
      )}
      <Divider />
      <Heading as="h3" size="lg">
        Rooms Policy
      </Heading>
      {housekeeping.roomsPolicy && (
        <Editor
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(housekeeping.roomsPolicy))
          )}
          onChange={() => {}}
          readOnly={true}
        />
      )}
      <Divider />
      <Heading as="h3" size="lg">
        {' '}
        Spaces Policy
      </Heading>
      {housekeeping.spacesPolicy && (
        <Editor
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(housekeeping.spacesPolicy))
          )}
          onChange={() => {}}
          readOnly={true}
        />
      )}
      <Divider />
      <Heading as="h3" size="lg">
        Chores Policy
      </Heading>
      {housekeeping.choresPolicy && (
        <Editor
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(housekeeping.choresPolicy))
          )}
          onChange={() => {}}
          readOnly={true}
        />
      )}
      <Divider />
      <Heading as="h3" size="lg">
        Vacations Policy
      </Heading>
      {housekeeping.vacationPolicy && (
        <Editor
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(housekeeping.vacationPolicy))
          )}
          onChange={() => {}}
          readOnly={true}
        />
      )}
      <Divider />
      <Heading as="h3" size="lg">
        Personal Items Policy
      </Heading>
      {housekeeping.personalItemsPolicy && (
        <Editor
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(housekeeping.personalItemsPolicy))
          )}
          onChange={() => {}}
          readOnly={true}
        />
      )}
      <Divider />
      <Heading as="h3" size="lg">
        Messages Policy
      </Heading>
      {housekeeping.messagesPolicy && (
        <Editor
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(housekeeping.messagesPolicy))
          )}
          onChange={() => {}}
          readOnly={true}
        />
      )}
      <Divider />
      <Heading as="h3" size="lg">
        Smoking Policy
      </Heading>
      {housekeeping.smokingPolicy && (
        <Editor
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(housekeeping.smokingPolicy))
          )}
          onChange={() => {}}
          readOnly={true}
        />
      )}
      <Divider />
      <Heading as="h3" size="lg">
        Pets Policy
      </Heading>
      {housekeeping.petsPolicy && (
        <Editor
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(housekeeping.petsPolicy))
          )}
          onChange={() => {}}
          readOnly={true}
        />
      )}
    </div>
  );
};

export default Housekeeping;
