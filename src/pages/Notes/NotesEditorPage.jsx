import React from "react";
import RichTextEditor from "../../components/RichTextEditor";
import { generateText, uploadPicture } from "../../utils/common";
import {
  getRawGroupNotes,
  getGroupsNoteContent,
  editGroupNotes,
  postGroupNotes,
} from "../../utils/firebase";
import { useState, useEffect, useRef } from "react";
import { useParams, useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { DisappearedLoading } from "react-loadingg";
import { errorAlert, successAlert } from "../../utils/alert";
import {
  ContainerStyled,
  MainContainer,
  InputCtn,
  SideSetting,
  SettingWrapper,
  EditorArea,
  LabelCtn,
  SideLabel,
  UploadBtn,
  SubmitBtn,
  Introduce,
  PreViewCtn,
} from "./style/NotesEditorPage.style";

const NotesEditorPage = () => {
  const userData = useSelector((state) => state.userData);
  const groupsList = useSelector((state) => state.groupsList);
  const { groupID, postID } = useParams();
  const pathname = useLocation().pathname;
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [introduce, setIntroduce] = useState("");
  const [originContent, setOriginContent] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2Fdefault.jpg?alt=media&token=da2e2f35-7239-4961-94bb-89af13aaca66"
  );
  const editMode = useRef(false);
  const editorHandler = (e) => {
    setValue(e);
  };

  useEffect(() => {
    if (userData === null) {
      history.push("/");
    } else if (Object.keys(userData).length > 0 && groupsList.length > 0) {
      const currentG = groupsList.find((g) => g.groupID === groupID);
      if (
        !currentG.membersList?.includes(userData.uid) &&
        currentG.creatorID !== userData.uid
      ) {
        history.push("/");
      }
    }
  }, [userData, groupsList]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (pathname.includes("edit")) {
        getGroupsNoteContent("groups", groupID, "notes", postID)
          .then((res) => {
            if (Object.keys(userData).length > 0) {
              if (res.creatorID !== userData.uid) {
                history.push("/");
              }
              setTitle(res.title);
              setValue(res.content);
              setIntroduce(res.introduce);
              setPreviewUrl(res.coverImage);
              setOriginContent(res);
              setIsLoading(false);
              editMode.current = true;
            }
          })
          .catch((err) => console.log(err));
      } else if (postID) {
        getRawGroupNotes(groupID, postID).then((res) => {
          const { mainPost, comments } = res;
          const html = generateText(mainPost, comments);
          setIsLoading(false);
          setValue(html);
        });
      }
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [userData, groupsList]);

  const handleSubmit = () => {
    if (introduce.length === 0) {
      errorAlert("請填寫筆記摘要！");
      return;
    }

    if (editMode.current) {
      const data = {
        coverImage: originContent.coverImage,
        content: value,
        title,
        introduce,
      };

      editGroupNotes(
        data,
        file,
        groupID,
        postID,
        originContent.coverImage
      ).then(() => {
        successAlert("編輯成功");
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

      postGroupNotes(groupID, data, file).then((res) => {
        successAlert("建立成功");
        history.push(`/group/${groupID}/notes/${res}`);
      });
    }
  };
  const previewImg = file ? URL.createObjectURL(file) : previewUrl;

  if (userData === undefined || isLoading) {
    return <DisappearedLoading />;
  } else if (!isLoading)
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
              accept="image/*"
              onChange={(e) => {
                uploadPicture(e, setFile);
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
