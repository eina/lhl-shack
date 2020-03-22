import React, { useState } from "react";
import { Formik } from "formik";
import { convertToRaw } from "draft-js";
import { Button } from "@chakra-ui/core";

import { stringEditorStateToContent } from "../helpers/functions";
import RichEditor from "../components/RichEditor/RichEditor";

const Test = () => {
  const [jsonVal, setJsonVal] = useState("");

  const testContent = {
    blocks: [
      {
        key: "cuuk8",
        text: "test test test test test",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [
          { offset: 5, length: 4, style: "BOLD" },
          { offset: 15, length: 4, style: "UNDERLINE" }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "2dsb9",
        text: "test",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
      {
        key: "dvui",
        text: "",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
      {
        key: "20j44",
        text: "test",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [{ offset: 0, length: 4, style: "ITALIC" }],
        entityRanges: [],
        data: {}
      }
    ],
    entityMap: {}
  };

  // stringified - so save convertedToRaw as string
  const stringified = JSON.stringify(testContent);
  // initial values

  const initialVals = {
    // if testContent exists -> must not be an empty string?
    // JSON.parse the string
    // convertFromRaw it
    // createWithContent from it
    // testDraft: testContent ? stringEditorStateToContent("") : EditorState.createEmpty()
    testDraft: stringEditorStateToContent(stringified)
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
