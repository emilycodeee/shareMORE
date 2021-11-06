import React from "react";
import styled from "styled-components";
import RichTextEditor from "../../components/RichTextEditor";
import * as firebase from "../../utils/firebase";
import { useState, useEffect, useRef } from "react";
import { useParams, useHistory, useLocation } from "react-router";
import generateText from "../../utils/commonText";

import { useSelector } from "react-redux";

const ContainerStyled = styled.div`
  border-radius: 20px;
  border: 1px solid #3e2914;
  display: flex;
  margin: 3rem 5rem;
  padding: 3rem 5rem;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputCtn = styled.input`
  border-radius: 10px;
  padding: 3px 10px;
  font-size: 1.2rem;
  margin: 1rem 0;
  border: 1px solid #b5b2b0;
`;

const SideSetting = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border-radius: 10px;
  border: 1px solid rgb(219, 216, 214);
  /* align-items: center;
  justify-content: center; */
`;

const EditorArea = styled.div`
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
`;

const UploadBtn = styled.label`
  background-color: transparent;
`;

const SubmitBtn = styled.button`
  align-self: end;
  margin: 0 auto;
  padding: 10px;
`;

const Introduce = styled.textarea`
  border: none;
  background-color: #f5f5f5;
  padding: 10px;
  resize: none;
  margin: 10px;
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
    "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2Fimage.png?alt=media&token=7b4118c2-46f8-41e9-a5de-de954c4aeb48"
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
    <div>
      <ContainerStyled>
        <MainContainer>
          <LabelCtn>建立社群筆記</LabelCtn>
          <div>※將留言串收藏為筆記後，該筆留言串將從留言板刪除。</div>
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
            <img src={previewImg} style={{ width: "300px" }} />
          </UploadBtn>

          <SubmitBtn onClick={handleSubmit}>確認送出</SubmitBtn>
        </SideSetting>
      </ContainerStyled>
    </div>
  );
};

export default NotesEditorPage;
