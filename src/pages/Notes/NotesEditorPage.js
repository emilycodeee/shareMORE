import React from "react";
import styled from "styled-components";
import RichTextEditor from "../../components/RichTextEditor";
import * as firebase from "../../utils/firebase";
import { useState, useEffect, useRef } from "react";
import { useParams, useHistory, useLocation } from "react-router";
import generateText from "../../utils/commonText";

import { useSelector } from "react-redux";

const ContainerStyled = styled.div`
  max-width: 1560px;
  width: 80%;
  display: flex;
  /* margin: 3rem 5rem; */
  margin: 0 auto;
  margin-top: 3rem;
  /* border: 1px solid red; */
  /* padding: 1rem 2rem; */
  gap: 1rem;
  @media only screen and (max-width: 992px) {
    flex-direction: column;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  @media only screen and (max-width: 992px) {
    width: 100%;
  }
`;

const InputCtn = styled.input`
  /* width: 100%; */
  padding: 10px;
  font-size: 1.2rem;
  margin: 1rem 0;
  border: 1px solid #b5b2b0;
  border-radius: 4px;
`;

const SideSetting = styled.div`
  width: 30%;
  /* padding: 10px; */
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  @media only screen and (max-width: 992px) {
    margin: 0;
    width: 100%;
    align-items: flex-start;
  }
`;

const SettingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  padding: 10px;
  gap: 10px;
  border: 1px solid #b5b2b0;
  border-radius: 4px;
`;

const EditorArea = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const LabelCtn = styled.label`
  font-size: 1.1rem;
  font-weight: 550;
  margin-right: 10px;
`;

const SideLabel = styled.label`
  font-size: 1.1rem;
  font-weight: 550;
  text-align: center;
  margin-bottom: 10px;
`;

const UploadBtn = styled.label`
  background-color: transparent;
`;

const SubmitBtn = styled.button`
  border-radius: 4px;
  list-style: none;
  font-weight: 600;
  font-size: 1rem;
  height: auto;
  text-decoration: none;
  color: #f27e59;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 0 auto;
  margin-bottom: 2rem;
  border: none;
  padding: 0.6rem;
  cursor: pointer;
  border: 1px solid #f27e59;
  background-color: transparent;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
  @media only screen and (max-width: 992px) {
    margin: 0;
    width: 100%;
    align-items: flex-end;
  }
`;

const Introduce = styled.textarea`
  border: none;
  background-color: #fff;
  padding: 10px;
  /* height: 4rem; */
  /* overflow-y: auto; */
  /* margin: 10px; */
  /* width: 300px; */
`;

const NotesEditorPage = () => {
  const userData = useSelector((state) => state.userData);

  const { groupID, postID } = useParams();
  const pathname = useLocation().pathname;
  console.log("pathname", pathname.includes("edit"));
  const history = useHistory();
  console.log(groupID, postID);

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [introduce, setIntroduce] = useState("");
  const [originContent, setOriginContent] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2Fdefault.jpg?alt=media&token=da2e2f35-7239-4961-94bb-89af13aaca66"
  );
  const editMode = useRef(false);
  const editorHandler = (e) => {
    setValue(e);
  };
  console.log(value);
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (pathname.includes("edit")) {
        firebase
          .getGroupsNoteContent("groups", groupID, "notes", postID)
          .then((res) => {
            setTitle(res.title);
            setValue(res.content);
            setIntroduce(res.introduce);
            setPreviewUrl(res.coverImage);
            setOriginContent(res);
            editMode.current = true;
            console.log(res);
          })
          .catch((err) => console.log(err));
      } else if (postID) {
        firebase.getRawGroupNotes(groupID, postID).then((res) => {
          const { mainPost, comments } = res;
          const html = generateText(mainPost, comments);
          setValue(html);
        });
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = () => {
    console.log(groupID, postID);

    if (introduce.length === 0) {
      alert("請填寫筆記摘要");
      return;
    }

    if (editMode.current) {
      const data = {
        coverImage: originContent.coverImage,
        content: value,
        title,
        introduce,
      };
      firebase
        .editGroupNotes(data, file, groupID, postID, originContent.coverImage)
        .then(() => {
          alert("編輯成功");
          history.push(`/group/${groupID}/notes/${postID}`);
        });
    } else {
      const data = {
        creatorID: userData.uid,
        content: value,
        creationTime: new Date(),
        title,
        introduce,
      };

      firebase
        .postGroupNotes(groupID, data, file)
        // .then(() => {
        //   firebase.removeTopLevelPost(groupID, postID);
        // })
        .then(() => {
          alert("建立成功");
          history.push(`/group/${groupID}`);
        });
    }
  };
  const previewImg = file ? URL.createObjectURL(file) : previewUrl;

  // const { groupID, postID } = useParams();
  // console.log(groupID, postID);

  return (
    <ContainerStyled>
      <MainContainer>
        <LabelCtn>建立社群筆記</LabelCtn>

        <InputCtn
          placeholder="請輸入標題..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <EditorArea>
          <RichTextEditor value={value} editorHandler={editorHandler} />
        </EditorArea>
      </MainContainer>
      <SideSetting>
        <SideLabel>筆記文章設定</SideLabel>
        <SettingWrapper>
          <Introduce
            value={introduce}
            placeholder="請輸入文章摘要"
            onChange={(e) => setIntroduce(e.target.value)}
          />
          <input
            type="file"
            id="upload-img"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <UploadBtn htmlFor="upload-img">
            <PreViewCtn src={previewImg} />
          </UploadBtn>
        </SettingWrapper>
        <SubmitBtn onClick={handleSubmit}>確認送出</SubmitBtn>
      </SideSetting>
    </ContainerStyled>
  );
};

export default NotesEditorPage;

const PreViewCtn = styled.img`
  width: 100%;
  margin: 10px 0;
  @media only screen and (max-width: 992px) {
    width: 60%;
  }
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
`;
