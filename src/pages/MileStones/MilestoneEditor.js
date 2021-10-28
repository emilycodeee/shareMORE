import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import RichTextEditor from "../../components/RichTextEditor";
import * as firebase from "../../utils/firebase";
import Select from "react-select";
import Switch from "../../components/Switch";
import { useHistory } from "react-router-dom";

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
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #b5b2b0;
  border-radius: 10px;
`;

const Miles = ({ user, groupList }) => {
  const history = useHistory();

  // const [showData, setShowData] = useState(false);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [groupsName, setgroupsName] = useState("");
  const [selected, setSelected] = useState(null);
  const [check, setCheck] = useState(false);

  const editorHandler = (e) => {
    setValue(e);
  };

  const handleSubmit = () => {
    const data = {
      creatorID: user.uid,
      content: value,
      groupID: selected,
      public: check,
      creationTime: new Date(),
      title,
    };

    firebase.postArticles(data, file).then(() => {
      alert("建立成功");
      history.push("/");
    });
  };

  useEffect(() => {
    firebase.getMyGroupsName(user?.uid).then((res) => console.log(res));
    // , setgroupsName
    // firebase.getOptionsName("groups", setgroupsName);
  }, []);

  const previewImg = file
    ? URL.createObjectURL(file)
    : "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image.jpg";
  // console.log(selected);
  return (
    <ContainerStyled>
      <MainContainer>
        {/* <h2>分享新的里程碑</h2> */}
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
            options={groupList.map((item) => {
              return {
                value: item.groupID,
                label: item.name,
              };
            })}
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
