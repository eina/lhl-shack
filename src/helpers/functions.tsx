import { EditorState, convertFromRaw } from "draft-js";

export const displayFullName = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}`;
};

/**
 * Convert string initial value for Draft.js
 * as usable content.
 * @param editorState string
 */
export const stringEditorStateToContent = (editorState: string) => {
  // console.log("whaaaat", editorState);
  if (typeof editorState === "string" && editorState !== "") {
    // 1. convert editor state to JSON
    const stringState = JSON.parse(editorState);
    // 2. make state to raw content
    const stringContent = convertFromRaw(stringState);
    // 3. plop to EditorState
    return EditorState.createWithContent(stringContent);
  }
  return EditorState.createEmpty();
};
