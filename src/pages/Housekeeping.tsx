import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Heading, Divider, Text } from '@chakra-ui/core';
import { Editor } from 'draft-js';

import { AppContext } from '../Store';
import { stringEditorStateToContent } from '../helpers/functions';

interface HousekeepingRule {
  [key: string]: any;
}

const Housekeeping = () => {
  const { state }: { state: any } = useContext(AppContext);
  const emptyHousekeepingRule: HousekeepingRule = {};
  const [housekeeping, setHousekeeping] = useState(emptyHousekeepingRule);
  const { currUser } = state;

  useEffect(() => {
    axios.get(`/api/households/${currUser.household}`).then(vals => {
      setHousekeeping(vals.data.housekeeping);
    });
  }, [currUser.household]);
  
  const boxSettings = {
    pb: 6
  };

  return (
    !housekeeping ? <Text>No housekeeping policies for this household yet. <Link to="/agreement" className="brand-link">Head to the Roommate Agreement Generator to set these up?</Link></Text> : (
      <>
        <Heading as="h1">Housekeeping</Heading>

        <Box {...boxSettings}>
          <Heading as="h3" size="lg">Guest Policy</Heading>
          {housekeeping.guestPolicy && (
            <Editor
              editorState={stringEditorStateToContent(housekeeping.guestPolicy)}
              onChange={() => {}}
              readOnly={true}
            />
          )}
        </Box>

        <Box {...boxSettings}>
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
        </Box>

        <Box {...boxSettings}>
          <Heading as="h3" size="lg">Rooms Policy</Heading>
          {housekeeping.roomsPolicy && (
            <Editor
              editorState={stringEditorStateToContent(housekeeping.roomsPolicy)}
              onChange={() => { }}
              readOnly={true}
            />
          )}
        </Box>
        
        <Box {...boxSettings}>
          <Heading as="h3" size="lg">Spaces Policy</Heading>
          {housekeeping.spacesPolicy && (
            <Editor
              editorState={stringEditorStateToContent(housekeeping.spacesPolicy)}
              onChange={() => {}}
              readOnly={true}
            />
          )}
        </Box>
        
        <Box {...boxSettings}>
          <Heading as="h3" size="lg">Chores Policy</Heading>
          {housekeeping.choresPolicy && (
            <Editor
              editorState={stringEditorStateToContent(housekeeping.choresPolicy)}
              onChange={() => {}}
              readOnly={true}
            />
          )}
        </Box>
        
        <Box {...boxSettings}>
          <Heading as="h3" size="lg">Vacations Policy</Heading>
          {housekeeping.vacationPolicy && (
            <Editor
              editorState={stringEditorStateToContent(housekeeping.vacationPolicy)}
              onChange={() => {}}
              readOnly={true}
            />
          )}
        </Box>

        <Box {...boxSettings}>
          <Heading as="h3" size="lg">Personal Items Policy</Heading>
          {housekeeping.personalItemsPolicy && (
            <Editor
              editorState={stringEditorStateToContent(housekeeping.personalItemsPolicy)}
              onChange={() => {}}
              readOnly={true}
            />
          )}
        </Box>

        <Box {...boxSettings}>
          <Heading as="h3" size="lg">Messages Policy</Heading>
          {housekeeping.messagesPolicy && (
            <Editor
              editorState={stringEditorStateToContent(housekeeping.messagesPolicy)}
              onChange={() => {}}
              readOnly={true}
            />
          )}
        </Box>
        
        <Box {...boxSettings}>
          <Heading as="h3" size="lg">Smoking Policy</Heading>
          {housekeeping.smokingPolicy && (
            <Editor
              editorState={stringEditorStateToContent(housekeeping.smokingPolicy)}
              onChange={() => {}}
              readOnly={true}
            />
          )}
        </Box>

        <Box {...boxSettings}>
          <Heading as="h3" size="lg">Pets Policy</Heading>
          {housekeeping.petsPolicy && (
            <Editor
              editorState={stringEditorStateToContent(housekeeping.petsPolicy)}
              onChange={() => {}}
              readOnly={true}
            />
          )}
        </Box>
      </>
    ));
};

export default Housekeeping;
