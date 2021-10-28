import React from "react";
import ReactQuill from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import Compressor from "compressorjs";
import "react-quill/dist/quill.snow.css";

import * as firebase from "../utils/firebase";

const Quill = ReactQuill.Quill;

Quill.register("modules/imageResize", ImageResize);
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
  "image",
  "video",
  "link",
  "formula",
  "audio",
  "color",
  "background",
  "align",
];

const fileCompress = (file) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      file: "File",
      quality: 0.5,
      maxWidth: 640,
      maxHeight: 640,
      success(file) {
        return resolve({
          success: true,
          file: file,
        });
      },
      error(err) {
        return reject({
          success: false,
          message: err.message,
        });
      },
    });
  });
};

const imageCallBack = () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  input.onchange = async () => {
    const file = input.files[0];
    const compressState = await fileCompress(file);
    if (compressState.success) {
      firebase.uploadReactQuillImage(compressState.file, quillRef);
    }
  };
};

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
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      // ["link"],
      ["link", "video", "image"],
      ["clean"],
    ],
    handlers: { image: () => imageCallBack() },
  },
  clipboard: {
    matchVisual: false,
  },
  // imageDrop: true,
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
};

const RichTextEditor = ({ value, editorHandler }) => {
  return (
    <>
      <ReactQuill
        ref={(el) => {
          quillRef = el;
        }}
        theme="snow"
        value={value}
        onChange={editorHandler}
        modules={modules}
        formats={formats}
        placeholder="開始建立社群筆記..."
      />
    </>
  );
};

export default RichTextEditor;
