/* eslint-disable react/display-name */
/* eslint-disable no-console */
import { mdx } from "@econnessione/shared";
import * as IOE from "fp-ts/lib/IOEither";
import { pipe } from "fp-ts/lib/pipeable";
import RichTextInput from "ra-input-rich-text";
import * as React from "react";
import { InputProps } from "react-admin";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"],
];

const MarkdownInput: React.FC<InputProps> = (props) => {
  console.log(props);
  return (
    <RichTextInput
      options={{
        modules: {
          toolbar: toolbarOptions,
        },
      }}
      format={(v: string) => {
        return pipe(
          mdx.MDXToHTML(v),
          IOE.fold(
            (e) => () => {
              console.error(e);
              return v;
            },
            (value) => () => {
              console.log({ value });
              return value;
            }
          )
        )();
      }}
      parse={(v: string) => {
        return pipe(
          mdx.HTMLToMDX(v),
          IOE.fold(
            (e) => () => {
              console.error(e);
              return v;
            },
            (value) => () => {
              console.log({ value });
              return value;
            }
          )
        )();
      }}
      {...props}
    />
  );
};
export default MarkdownInput;
