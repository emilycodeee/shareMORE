import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
// import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module-react";
import Compressor from "compressorjs";
import "react-quill/dist/quill.snow.css";
import ReactHtmlParser from "react-html-parser";
import * as firebase from "../../utils/firebase";
import Select from "react-select";
import Switch from "../../components/Switch";
//init quillReact
const Quill = ReactQuill.Quill;
// Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);
let quillRef = null;

const ContainerStyled = styled.div`
  max-width: 80%;
  border: 2px solid salmon;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
`;

const MainContainer = styled.div`
  border: 2px solid yellow;
  display: flex;
  flex-direction: column;
`;

const SideSetting = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: salmon;
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

const LabelCtn = styled.label`
  font-size: 20px;
  font-weight: 600;
`;

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

const Miles = () => {
  const [showData, setShowData] = useState(false);
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [groupsName, setgroupsName] = useState("");
  const [selected, setSelected] = useState(null);
  const [check, setCheck] = useState(false);

  const editorHandler = (e) => {
    setValue(e);
  };

  const handleSubmit = () => {
    firebase.postArticles(value, file);
  };

  useEffect(() => {
    firebase.getOptionsName("groups", setgroupsName);
    // console.log(groupsName);
  }, []);

  const previewImg = file
    ? URL.createObjectURL(file)
    : "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image.jpg";

  return (
    <ContainerStyled>
      <MainContainer>
        <h2>寫下你的里程碑吧!</h2>

        <LabelCtn>文章標題</LabelCtn>
        <input placeholder="請輸入標題..." />
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
            placeholder="開始建立里程碑吧..."
          />
        </EditorArea>
      </MainContainer>
      <SideSetting>
        <LabelCtn> 文章設定</LabelCtn>
        <Switch check={check} setCheck={setCheck} />

        <Select
          defaultValue={selected}
          onChange={(e) => {
            console.log(e);
            setSelected(e.value);
          }}
          options={groupsName}
        />
        <input
          type="file"
          id="upload-img"
          style={{ display: "none" }}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <img src={previewImg} style={{ width: "300px" }} />
        <label htmlFor="upload-img">上傳文章圖片</label>
        <button
          onClick={() => {
            setShowData(!showData);
          }}
        >
          {showData ? "隱藏資料" : "顯示資料"}
        </button>
        <button onClick={handleSubmit}>寫入資料庫</button>
        <div>{showData ? value : ""}</div>
        <h1>轉譯後</h1>
        <div>{showData ? ReactHtmlParser(value) : ""}</div>
      </SideSetting>
    </ContainerStyled>
  );
};

export default Miles;
