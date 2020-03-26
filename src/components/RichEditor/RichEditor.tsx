import React from "react";
import { Editor, RichUtils } from "draft-js";
import { Flex } from "@chakra-ui/core";

import "draft-js/dist/Draft.css";
import "./RichEditor.css";

interface RichEditorProps {
  onChange: Function;
  focus: Function;
  onBlur: Function;
  editorState: any;
  editorStateName: string;
}

export class RichEditor extends React.Component<RichEditorProps> {
  onChange = (editorState: any) => {
    this.props.onChange(this.props.editorStateName, editorState);
  };

  // focus = () => this.refs.editor.focus();

  handleKeyCommand = (command: any) => {
    const { editorState } = this.props;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      // return true;
    }
    // return false;
  };

  onTab = (e: any) => {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.props.editorState, maxDepth));
  };
  toggleBlockType = (blockType: any) => {
    this.onChange(RichUtils.toggleBlockType(this.props.editorState, blockType));
  };
  toggleInlineStyle = (inlineStyle: any) => {
    this.onChange(RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle));
  };
  render() {
    const { editorState } = this.props;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    const className = "RichEditor-editor";
    // let contentState = editorState.getCurrentContent();
    // if (!contentState.hasText()) {
    //   if (
    //     contentState
    //       .getBlockMap()
    //       .first()
    //       .getType() !== "unstyled"
    //   ) {
    //     className += " RichEditor-hidePlaceholder";
    //   }
    // }
    return (
      <div className="RichEditor-root">
        <Flex>
          <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType} />
          <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} />
        </Flex>
        <div className={className}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            // handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder=""
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};
function getBlockStyle(block: any) {
  switch (block.getType()) {
  case "blockquote":
    return "RichEditor-blockquote";
  default:
    return "";
  }
}

interface StyleButtonProps {
  active: any;
  onToggle: Function;
  style: any;
  label: any;
}

class StyleButton extends React.Component<StyleButtonProps> {
  constructor(props: any) {
    super(props);
    // this.onToggle = (e: any) => {
    //   e.preventDefault();
    //   this.props.onToggle(this.props.style);
    // };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(e: any) {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
const BLOCK_TYPES = [
  // { label: "H1", style: "header-one" },
  // { label: "H2", style: "header-two" },
  // { label: "H3", style: "header-three" },
  // { label: "H4", style: "header-four" },
  // { label: "H5", style: "header-five" },
  // { label: "H6", style: "header-six" },
  // { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" }
  // { label: "Code Block", style: "code-block" }
];
const BlockStyleControls = (props: any) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" }
  // { label: "Monospace", style: "CODE" }
];
const InlineStyleControls = (props: any) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default RichEditor;
