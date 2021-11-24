import React from "react";
import ReactQuill from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import Compressor from "compressorjs";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
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
    if (file) {
      if (!file.type.includes("image")) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "圖片格式怪怪的",
        });
        return;
      }
    }
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
      [
        {
          align: ["", "center", "right", "justify"],
        },
      ],
      ["link", "image"],
      ["clean"],
    ],
    handlers: { image: () => imageCallBack() },
  },
  clipboard: {
    matchVisual: false,
  },
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
        placeholder="開始分享吧..."
      />
    </>
  );
};

export default RichTextEditor;
