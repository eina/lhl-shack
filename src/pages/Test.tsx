import React, { useState } from "react";
import { Formik } from "formik";
import { convertToRaw } from "draft-js";
import { Button } from "@chakra-ui/core";

import { stringEditorStateToContent } from "../helpers/functions";
import RichEditor from "../components/RichEditor/RichEditor";

const Test = () => {
  const [jsonVal, setJsonVal] = useState("");

  const initialVals = {
    // if testContent exists -> must not be an empty string?
    // JSON.parse the string
    // convertFromRaw it
    // createWithContent from it
    // testDraft: testContent ? stringEditorStateToContent("") : EditorState.createEmpty()
    testDraft: stringEditorStateToContent("")
  };

  return (
    <>
      <h1>Test</h1>
      <p>This is a test component for routing purposes.</p>

      <p>{jsonVal}</p>

      <Formik
        initialValues={initialVals}
        onSubmit={values => {
          // convert to raw when saving
          const toRaw = convertToRaw(values.testDraft.getCurrentContent());
          const toString = JSON.stringify(toRaw);
          setJsonVal(toString);
          // console.log(toRaw);
          // alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ handleSubmit, handleBlur, setFieldValue, values }) => (
          <form onSubmit={handleSubmit}>
            <RichEditor
              editorState={values.testDraft}
              editorStateName="testDraft"
              onChange={setFieldValue}
              onBlur={handleBlur}
              focus={() => {}}
            />
            <Button type="submit">Submit</Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Test;
