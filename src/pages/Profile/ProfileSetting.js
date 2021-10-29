import React from "react";
import styled from "styled-components";
import facebookTag from "../../sources/facebookTag.png";
import email from "../../sources/email.png";
import ig from "../../sources/ig.png";
import linkedin from "../../sources/linkedin.png";
import web from "../../sources/web.png";
import github from "../../sources/github.png";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Wrapper = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 2rem;
  width: 100%;
  max-width: 1000px;
  padding: 60px 60px 150px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  padding: 10px;
  width: 100%;
  box-shadow: 0 2px 10px #a2a2a2;
`;

const SideCard = styled.div`
  padding: 1rem;
  width: 400px;
  /* height: 550px; */
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  box-shadow: 0 2px 10px #a2a2a2;
`;

const AvatarCtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
`;

const Avatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid rgb(219, 216, 214);
  margin-bottom: 10px;
`;

const TagWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-around;
`;

const Icon = styled.img`
  height: 1.8rem;
`;

const IconSet = styled.div`
  margin: 10px;
  width: 100%;

  display: flex;
  justify-content: space-evenly;
`;

const SettingBtn = styled.button`
  cursor: pointer;
  margin: 30px 0;
  padding: 10px 0;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  border: 1px solid rgb(219, 216, 214);
  /* -webkit-box-align: center; */
  align-items: center;
  /* -webkit-box-pack: center; */
  justify-content: center;
`;

const InputField = styled.div`
  display: flex;
  margin: 10px;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: rgb(255 182 0);
`;

const TagName = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  color: #333;
  white-space: nowrap;
  overflow: visible;
  margin-top: 7px;
  flex-grow: 1;
`;

// border: 1 px solid #a0a0a0;
const InputCtn = styled.div`
  width: 75%;
`;

const InputText = styled.input`
  width: 100%;
`;

const AreaText = styled.textarea`
  width: 100%;
`;

const ProfileSetting = () => {
  const { userID } = useParams();
  const usersList = useSelector((state) => state.usersList);
  const currentData = usersList.find((item) => item.userID === userID);
  const [displayName, setDisplayName] = useState(currentData?.displayName);
  const [facebook, setFacebook] = useState(currentData?.facebook);

  console.log("dddddddddddd", currentData);
  console.log(userID);
  return (
    <Wrapper>
      <SideCard>
        <div>
          <AvatarCtn>
            <Avatar src={currentData?.avatar} alt="" />
          </AvatarCtn>
        </div>
        <div>
          <UserInfo>
            <h1>{currentData?.displayName}</h1>
            <p>{currentData?.introduce || "我還在想😜"}</p>
            <IconSet>
              <Icon src={ig} />
              <Icon src={facebookTag} />
              <Icon src={linkedin} />
              <Icon src={github} />
              <Icon src={email} />
              <Icon src={web} />
            </IconSet>
          </UserInfo>
        </div>
        <div>
          <p>Follow me on popular social media sites.</p>
        </div>
        <TagWrapper>
          <div>預覽中，更改後記得儲存送出喔！</div>
        </TagWrapper>
      </SideCard>
      <hr />
      <ContentWrapper>
        <div>
          <Title>個人資料設定</Title>
          <InputField>
            <TagName>帳號</TagName>
            <InputCtn>
              <span>{currentData?.email}</span>
            </InputCtn>
          </InputField>
          <InputField>
            <TagName>暱稱</TagName>
            <InputCtn>
              <InputText value={displayName}></InputText>
            </InputCtn>
          </InputField>
          <InputField>
            <TagName>自我介紹</TagName>
            <InputCtn>
              <AreaText></AreaText>
            </InputCtn>
          </InputField>
        </div>
        <hr />
        <div>
          <Title>社群連結設定</Title>
          <div>
            <InputField>
              <TagName>Instagram</TagName>
              <InputCtn>
                <InputText></InputText>
              </InputCtn>
            </InputField>
            <InputField>
              <TagName>Facebook</TagName>
              <InputCtn>
                <InputText></InputText>
              </InputCtn>
            </InputField>
            <InputField>
              <TagName>linkedin</TagName>
              <InputCtn>
                <InputText></InputText>
              </InputCtn>
            </InputField>
            <InputField>
              <TagName>GIthub</TagName>
              <InputCtn>
                <InputText></InputText>
              </InputCtn>
            </InputField>
            <InputField>
              <TagName>聯絡信箱</TagName>
              <InputCtn>
                <InputText></InputText>
              </InputCtn>
            </InputField>
            <InputField>
              <TagName>個人網站</TagName>
              <InputCtn>
                <InputText></InputText>
              </InputCtn>
            </InputField>
          </div>
        </div>
      </ContentWrapper>
    </Wrapper>
  );
};

export default ProfileSetting;
