import React from "react";

import { FormValues } from "../../interfaces";

import RichEditor from "../RichEditor/RichEditor";
import FormikSelect from "../FormikSelect";
import { FormikDateRange, FormikSingleDatePicker } from "../FormikDates";

const TestDraft = (props: any) => {
  const { values, setFieldValue, handleBlur } = props;
  return (
    <div>
      <h1>Third Party Stuff + Formik!</h1>
      <h1>Draft.js</h1>
      <p>Text Area 1</p>
      <RichEditor
        editorState={values.textArea1}
        editorStateName="textArea1"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />

      <p>Text Area 2: testing to see if you can have more than one</p>
      <RichEditor
        editorState={values.textArea2}
        editorStateName="textArea2"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />

      <h2>React-Select</h2>

      <FormikSelect
        label="Select Bill Status"
        name="bill-status"
        stateName="status"
        stateValue={values.status}
        onChange={setFieldValue}
        onBlur={handleBlur}
        options={[
          { value: "paid", label: "Paid" },
          { value: "pending", label: "Pending" },
          { value: "overdue", label: "Overdue" }
        ]}
      />

      <h2>React-Dates</h2>

      <h3>Date Range Picker</h3>
      <FormikDateRange
        label="Lease Dates"
        name="lease-dates"
        stateName="leaseDates"
        stateValue={values.leaseDates}
        onChange={setFieldValue}
      />

      <h3>Day Input</h3>
      <FormikSingleDatePicker
        label="Bill Date"
        name="bill-date"
        stateName="billDate"
        stateValue={values.billDate}
        onChange={setFieldValue}
        numberOfMonths={1}
      />
    </div>
  );
  // return <div>{/* <Editor editorState={values.editorState} /> */}</div>;
};

export default TestDraft;
