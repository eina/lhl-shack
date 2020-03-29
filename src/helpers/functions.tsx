import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { draftJSKeys } from "./data";
import { set, isWeekend } from "date-fns";

export const displayFullName = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}`;
};

/**
 * Creates a new Date object from a time string
 * (date-fns dependent)
 * @param timeString String "hh:mm"
 */
export const generateTime = (timeString: any, pm = false) => {
  const timeStringSplit = timeString.split(":");

  return set(new Date(), {
    hours: pm ? timeStringSplit[0] * 1 + 12 : timeStringSplit[0] * 1,
    minutes: timeStringSplit[1],
    seconds: 0
  });
};

/**
 * (date-fns dependent) Compares a start date and an end date to check if it's quiet hours
 * PM is the start time, AM is the end time (day added for comparison)
 * @param weekdayAM String hh:mm
 * @param weekdayPM String hh:mm
 * @param weekendAM String hh:mm
 * @param weekendPM String hh:mm
 */
export const isItQuietHours = (
  weekdayAM: string,
  weekdayPM: string,
  weekendAM: string,
  weekendPM: string
) => {
  const currentDay = new Date();
  const isItAWeekend = isWeekend(currentDay);
  // const weekdayStart = generateTime(weekdayPM, true);
  // const weekdayEnd = generateTime(weekdayAM);
  // const weekendStart = generateTime(weekendPM, true);
  // const weekendEnd = generateTime(weekendAM);

  if (isItAWeekend) {
    // console.log({ start: weekendStart, end: weekendEnd });
    return true;
    // return isWithinInterval(new Date(), { start: weekendStart, end: weekendEnd });
  } else {
    // return isWithinInterval(new Date(), { start: weekdayStart, end: weekdayEnd });
  }
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

/**
 * Format Housekeeping sections to HMTL
 * @param housekeeping object
 */
export const formatHousekeepingToHTML = (housekeeping: any) => {
  const result: any = {};

  // update housekeeping draft js to better saveable values
  for (const housekeepingKey in housekeeping) {
    if (draftJSKeys.includes(housekeepingKey)) {
      const draftJSContent = housekeeping[housekeepingKey].getCurrentContent();
      result[housekeepingKey] = stateToHTML(draftJSContent);
    }
  }
  return result;
};
