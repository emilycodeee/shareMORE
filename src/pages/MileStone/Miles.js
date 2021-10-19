import React from "react";
import styled from "styled-components";
import { useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import ReactHtmlParser from "react-html-parser";

const Quill = ReactQuill.Quill;
let quillRef = null;

const ContainerStyled = styled.div`
  max-width: 80%;
  border: 2px solid salmon;
  margin: 0 auto;
`;

const EditorArea = styled.div`
  margin: 0 auto;
`;

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
  "image",
  "video",
  "code-block",
  "formula",
  "audio", // audio must be added for the next step
];

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "video", "image"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const Miles = () => {
  const [addData, setAddData] = useState("");
  const [showData, setShowData] = useState(false);
  const [value, setValue] = useState("");

  const editorHandler = (e) => {
    setValue(e);
  };

  return (
    <ContainerStyled>
      <h2>寫下你的里程碑吧!</h2>
      <button
        onClick={() => {
          setShowData(!showData);
        }}
      >
        {showData ? "隱藏資料" : "顯示資料"}
      </button>
      <button>寫入資料庫</button>
      <EditorArea>
        <ReactQuill
          ref={(el) => {
            quillRef = el;
          }}
          theme="snow"
          value={value}
          onChange={editorHandler}
          modules={modules}
          formats={formats}
        />
      </EditorArea>

      <div>{showData ? value : ""}</div>
      <h1>轉譯後</h1>
      <div>{showData ? ReactHtmlParser(value) : ""}</div>
    </ContainerStyled>
  );
};

export default Miles;
