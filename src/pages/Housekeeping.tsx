import React, {useState, useEffect, useContext} from 'react'

import axios from "axios";

import { AppContext } from "../Store";

// import RichEditor from "../components/RichEditor/RichEditor";

import { Heading } from "@chakra-ui/core"
import { Editor, EditorState, convertFromRaw } from 'draft-js';


interface HousekeepingRule {
  [key: string]: any
}

const Housekeeping = () => {

  const { state, updateState }: { state: any; updateState: Function } = useContext(AppContext);
  const emptyHousekeepingRule: HousekeepingRule = {};
  const [housekeeping, setHousekeeping] = useState(emptyHousekeepingRule)
  const { currUser } = state;

  useEffect(() => {
    let houseId: string;
    axios
      .get(`/api/households/${currUser.household}`)
      .then((vals) => {
        console.log('here is housekeeping: ', vals.data.agreements[0].form_values.housekeeping)
        setHousekeeping(vals.data.agreements[0].form_values.housekeeping)
      })
  }, []);
  // const contentState = convertFromRaw(housekeeping);
  // const editorState = EditorState.createWithContent(contentState);
  return (
    <div>
      <h1>Housekeeping</h1>
      {housekeeping.guestPolicy && <Editor
        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(housekeeping.guestPolicy)))}
        // editorStateName="housekeeping.guestPolicy"
        // focus={() => {}}
        onChange={() => {}}
        readOnly={true}
      />}

    </div>
  )
}

export default Housekeeping;