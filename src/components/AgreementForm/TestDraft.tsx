import React from "react";
import { useFormikContext } from "formik";
import { Editor } from "draft-js";

import { FormValues } from "../../interfaces";

import RichEditor from "../RichEditor/RichEditor";

const TestDraft = (props: any) => {
  const { values, setFieldValue, handleBlur } = props;
  return (
    <div>
      <h1>Draft.js</h1>
      <p>Text Area 1</p>
      <RichEditor
        editorState={values.textArea1}
        editorStateName="textArea1"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      {/* <Editor
        editorState={values.textArea1}
        onChange={editorState => setFieldValue("textArea1", editorState)}
      /> */}

      <p>Text Area 2</p>
      <Editor
        editorState={values.textArea2}
        onChange={editorState => setFieldValue("textArea2", editorState)}
      />
    </div>
  );
  // return <div>{/* <Editor editorState={values.editorState} /> */}</div>;
};

export default TestDraft;
