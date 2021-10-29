import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import RichTextEditor from "../../components/RichTextEditor";
import * as firebase from "../../utils/firebase";
import Select from "react-select";
import Switch from "../../components/Switch";
import { useHistory } from "react-router-dom";
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

const SideSetting = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const LabelCtn = styled.label`
  font-size: 1.1rem;
  font-weight: 550;
  margin-right: 10px;
`;

const InputCtn = styled.input`
  border-radius: 10px;
  padding: 3px 10px;
  font-size: 1.2rem;
  margin: 1rem 0;
  border: 1px solid #b5b2b0;
`;

const UploadBtn = styled.label`
  background-color: transparent;
  margin: 0 auto;
`;

const SubmitBtn = styled.button`
  align-self: end;
  margin: 0 auto;
  padding: 10px;
  border-radius: 10px;
`;

const SwitchCtn = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const SettingLb = styled.label`
  align-self: center;
  font-size: 1.1rem;
  font-weight: 550;
  margin-bottom: 10px;
`;

const PreViewCtn = styled.img`
  width: 300px;
  margin: 10px 0;
`;

const WrapperStyled = styled.div`
  padding: 10px;
`;

const SettingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #b5b2b0;
  border-radius: 10px;
`;

const Introduce = styled.textarea`
  border: none;
  background-color: #f5f5f5;
  padding: 10px;
  resize: none;
  margin: 10px;
`;

const Miles = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [groupsName, setgroupsName] = useState("");
  const [selected, setSelected] = useState(null);
  const [check, setCheck] = useState(true);

  const userData = useSelector((state) => state.userData);

  const editorHandler = (e) => {
    setValue(e);
  };

  const handleSubmit = () => {
    if (value.length === 0 || introduce.length === 0) {
      alert("請填寫完整內容");
      return;
    }

    if (selected === null) {
      alert("請選擇社群名稱");
      return;
    }

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
      alert("建立成功");
      history.push("/");
    });
  };

  useEffect(() => {
    if (!userData) {
      // alert("目前沒有任何所屬社群耶，到廣場看看有興趣的主題吧！");
      history.push("/");
    }
    if (userData) {
      firebase.getMyGroupsName(userData?.uid).then((res) => {
        // console.log("😁😁😀😀", res);
        setgroupsName(res);

        if (res.length === 0) {
          alert("目前沒有任何所屬社群耶，到廣場看看有興趣的主題吧！");
          history.push("/");
        }
      });
    }
  }, []);

  const previewImg = file
    ? URL.createObjectURL(file)
    : "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image.jpg";
  // console.log(selected);
  return (
    <ContainerStyled>
      <MainContainer>
        <LabelCtn>分享新的里程碑</LabelCtn>
        <InputCtn
          placeholder="請輸入標題..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <WrapperStyled>
          <RichTextEditor value={value} editorHandler={editorHandler} />
        </WrapperStyled>
      </MainContainer>
      <SideSetting>
        <SettingLb> 文章設定</SettingLb>
        <SettingWrapper>
          <SwitchCtn>
            <div>設為公開</div>
            <Switch check={check} setCheck={setCheck} />
          </SwitchCtn>
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

export default Miles;
