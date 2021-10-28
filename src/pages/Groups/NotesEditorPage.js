import React, { useEffect } from "react";
import styled from "styled-components";
import RichTextEditor from "../../components/RichTextEditor";
import * as firebase from "../../utils/firebase";
import { useState } from "react";
import { useParams, useHistory } from "react-router";
import generateText from "../../utils/commonText";

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
`;

const EditorArea = styled.div`
  margin: 0 auto;
`;

const LabelCtn = styled.label`
  font-size: 1.1rem;
  font-weight: 550;
  margin-right: 10px;
`;

const UploadBtn = styled.label`
  background-color: transparent;
`;

const SubmitBtn = styled.button`
  align-self: end;
  margin: 0 auto;
  padding: 10px;
`;

const NotesEditorPage = ({ user }) => {
  const { groupID, postID } = useParams();
  const history = useHistory();
  console.log(groupID, postID);

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);

  const editorHandler = (e) => {
    setValue(e);
  };
  console.log(value);
  useEffect(() => {
    firebase.getRawGroupNotes(groupID, postID).then((res) => {
      const { mainPost, comments } = res;
      // console.log(res);
      // console.log(mainPost);
      // console.log(comments);
      const html = generateText(mainPost, comments);
      setValue(html);
    });
  }, []);

  const handleSubmit = () => {
    console.log(groupID, postID);

    const data = {
      creatorID: user.uid,
      content: value,
      creationTime: new Date(),
      title,
    };

    firebase
      .postGroupNotes(groupID, data, file)
      .then(() => {
        firebase.removeTopLevelPost(groupID, postID);
      })
      .then(() => {
        alert("建立成功");
        history.push(`/group/${groupID}`);
      });
  };
  const previewImg = file
    ? URL.createObjectURL(file)
    : "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image.jpg";

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
          <LabelCtn> 設定筆記封面</LabelCtn>
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
