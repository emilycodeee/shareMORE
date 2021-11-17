import React from "react";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import RichTextEditor from "../../components/RichTextEditor";
import * as firebase from "../../utils/firebase";
import Select from "react-select";
import Switch from "../../components/Switch";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2/dist/sweetalert2.js";
const ContainerStyled = styled.div`
  gap: 1rem;
  max-width: 1560px;
  width: 80%;
  /* border: 1px solid red; */
  display: flex;
  /* padding: 3rem 5rem; */
  margin: 0 auto;
  margin-top: 3rem;
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

const SideSetting = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  @media only screen and (max-width: 992px) {
    margin: 0;
    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

const LabelCtn = styled.label`
  font-size: 1.1rem;
  font-weight: 550;
  margin-right: 10px;
`;

const InputCtn = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  margin: 1rem 0;
  border: 1px solid #b5b2b0;
  border-radius: 4px;
  /* border: 1px solid #b5b2b0; */
`;

const InputWrapper = styled.div`
  border-radius: 4px;
  /* padding: 8px; */
`;

const UploadBtn = styled.label`
  background-color: transparent;
  margin: 0 auto;
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

const SwitchCtn = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  div {
    font-weight: 550;
  }
`;

const SettingLb = styled.label`
  align-self: center;
  font-size: 1.1rem;
  font-weight: 550;
  margin-bottom: 10px;
  @media only screen and (max-width: 992px) {
    align-self: flex-start;
  }
`;

const PreViewCtn = styled.img`
  cursor: pointer;
  width: 100%;
  margin: 10px 0;
  @media only screen and (max-width: 992px) {
    width: 60%;
  }
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
`;

const EditorArea = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const SettingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #b5b2b0;
  border-radius: 4px;
  gap: 10px;
`;

const Introduce = styled.textarea`
  border: none;
  background-color: #fff;
  padding: 10px;
  /* resize: none; */
  /* margin: 10px; */
`;

const OriginLabel = styled.label`
  font-weight: 550;
  text-align: center;
  color: rgb(255 182 0);
`;

const MilestoneEditor = () => {
  const history = useHistory();
  const groupsList = useSelector((state) => state.groupsList);
  const { milestoneID } = useParams();
  const [originContent, setOriginContent] = useState(null);
  const [title, setTitle] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [groupsName, setgroupsName] = useState("");
  const [selected, setSelected] = useState(null);
  const [check, setCheck] = useState(true);
  const [originLabel, setOriginLabel] = useState("");
  const [previewUrl, setPreviewUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2Fdefault.jpg?alt=media&token=da2e2f35-7239-4961-94bb-89af13aaca66"
  );
  // init
  const editMode = useRef(false);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (!userData) {
        history.push("/");
      }
      if (userData) {
        firebase.getMyGroupsName(userData?.uid).then((res) => {
          setgroupsName(res);

          if (res.length === 0) {
            Swal.fire("目前沒有任何所屬社群，到廣場看看有興趣的主題吧！");
            history.push("/");
          }
        });
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (milestoneID) {
        firebase.getMilestone("articles", milestoneID).then((res) => {
          setTitle(res.title);
          setIntroduce(res.introduce);
          setOriginLabel(
            groupsList.find((item) => item.groupID === res.groupID)?.name
          );
          setSelected(res.groupID);
          setValue(res.content);
          setCheck(res.public);
          setOriginContent(res);
          console.log(res.coverImage);
          setPreviewUrl(res.coverImage);
          editMode.current = true;
        });
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const userData = useSelector((state) => state.userData);

  const editorHandler = (e) => {
    setValue(e);
  };

  const handleSubmit = () => {
    if (value.length === 0 || introduce.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "請填寫完整內容!",
      });
      // alert("請填寫完整內容");
      return;
    }

    if (selected === null) {
      // alert("請選擇社群名稱");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "請選擇社群名稱!",
      });
      return;
    }

    if (editMode.current) {
      const data = {
        coverImage: originContent.coverImage,
        content: value,
        groupID: selected,
        public: check,
        title,
        introduce,
      };

      firebase
        .editArticles(data, file, milestoneID, originContent.coverImage)
        .then(() => {
          // alert("編輯成功");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "編輯成功",
            showConfirmButton: false,
            timer: 1500,
          });
          history.push(`/milestone/${milestoneID}`);
        });
    } else {
      const data = {
        creatorID: userData.uid,
        content: value,
        groupID: selected,
        public: check,
        creationTime: new Date(),
        title,
        introduce,
      };

      firebase.postArticles(data, file).then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "建立成功",
          showConfirmButton: false,
          timer: 1500,
        });
        // alert("建立成功");
        history.push("/");
      });
    }
  };

  const previewImg = file ? URL.createObjectURL(file) : previewUrl;

  return (
    <ContainerStyled>
      <MainContainer>
        <LabelCtn>分享我的學習成果</LabelCtn>
        <InputCtn
          placeholder="請輸入標題..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* </InputWrapper> */}
        <EditorArea>
          <RichTextEditor value={value} editorHandler={editorHandler} />
        </EditorArea>
      </MainContainer>
      <SideSetting>
        <SettingLb> 文章設定</SettingLb>
        <SettingWrapper>
          <SwitchCtn>
            <div>設為公開</div>
            <Switch check={check} setCheck={setCheck} />
          </SwitchCtn>
          {editMode.current && (
            <OriginLabel>原社團設定為：{originLabel}</OriginLabel>
          )}
          <Select
            defaultValue={selected}
            onChange={(e) => {
              setSelected(e.value);
            }}
            options={groupsName}
          />
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

export default MilestoneEditor;
