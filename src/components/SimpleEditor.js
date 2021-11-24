import React from "react";
import ReactQuill from "react-quill";
// const Quill = ReactQuill.Quill;
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
      [{ color: [] }],
      [{ background: [] }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  },
};

const SimpleEditor = ({ goal, setGoal }) => {
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
