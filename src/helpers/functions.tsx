import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { draftJSKeys } from './data';

export const displayFullName = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}`;
};

/**
 * Convert string initial value for Draft.js
 * as usable content.
 * @param editorState string
 */
export const stringEditorStateToContent = (editorState: string) => {
  // https://stackoverflow.com/a/32278428
  // check first if input is a valid JSON string
  const isValidJSONString = (checkString: string) => {
    try {
      return JSON.parse(checkString) && !!checkString;
    } catch (e) {
      return false;
    }
  };

  // make sure that the parsed object returns an object
  // "[]" is not valid for this use case
  const isObj = (toTest: any) => {
    const testJSON = JSON.parse(toTest);
    return !Array.isArray(testJSON) && testJSON instanceof Object ? true : false;
  };

  if (isValidJSONString(editorState) && isObj(editorState)) {
    // 1. convert editor state to JSON
    const stringState = JSON.parse(editorState);
    // 2. make state to raw content
    const stringContent = convertFromRaw(stringState);
    // 3. plop to EditorState
    return EditorState.createWithContent(stringContent);
  }
  return EditorState.createEmpty();
};

/**
 * Returns a stringified JSON of Draft JS's raw elements
 * @param toSaveDraftJS Draft JS state content
 * @returns string (JSON string)
 */
export const formatDraftJSForDB = (toSaveDraftJS: any) => {
  const toRaw = convertToRaw(toSaveDraftJS.getCurrentContent());
  const toString = JSON.stringify(toRaw);
  return toString;
};


/**
 * Formats Agreement Form's Draft JS housekeeping {} values
 * @param housekeeping { object } see: initialValues.tsx
 * @returns object
 */
export const formatHousekeepingForDB = (housekeeping: any) => {
  const result: any = {};

  // update housekeeping draft js to better saveable values
  for (const housekeepingKey in housekeeping) {
    if (draftJSKeys.includes(housekeepingKey)) {
      const draftJSValue = housekeeping[housekeepingKey];
      result[housekeepingKey] = formatDraftJSForDB(draftJSValue);
    }
  }

  return result;
};
