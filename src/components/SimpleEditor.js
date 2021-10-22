import React from "react";
import styled from "styled-components";

import ReactQuill from "react-quill";
import { useState } from "react";
import ReactHtmlParser from "react-html-parser";

import Select from "react-select";
import Switch from "./Switch";
//init quillReact
const Quill = ReactQuill.Quill;
// Quill.register("modules/imageDrop", ImageDrop);
// Quill.register("modules/imageResize", ImageResize);
let quillRef = null;

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "code-block",
  "formula",
  "color",
  "background",
  "align",
];

const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["code-block"],
      [({ color: [] }, { background: [] })],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  },
};

const SimpleEditor = ({ goal, setGoal }) => {
  // const [value, setValue] = useState("");

  const editorHandler = (e) => {
    setGoal(e);
  };
  return (
    <>
      <ReactQuill
        ref={(el) => {
          quillRef = el;
        }}
        theme="snow"
        value={goal}
        onChange={editorHandler}
        modules={modules}
        formats={formats}
      />
    </>
  );
};

export default SimpleEditor;
