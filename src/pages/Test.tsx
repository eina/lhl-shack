import React, { useState } from "react";
import { Formik } from "formik";
import { Button } from "@chakra-ui/core";

import { stringEditorStateToContent, formatDraftJSForDB } from "../helpers/functions";
// import { stringDraftJS } from "../helpers/data";
import RichEditor from "../components/RichEditor/RichEditor";

const Test = () => {
  const [jsonVal, setJsonVal] = useState("");

  const initialVals = {
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
          setJsonVal(formatDraftJSForDB(values.testDraft));
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
