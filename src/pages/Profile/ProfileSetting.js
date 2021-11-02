import React from "react";
import styled from "styled-components";
import facebookTag from "../../sources/facebookTag.png";
import email from "../../sources/email.png";
import ig from "../../sources/ig.png";
import linkedin from "../../sources/linkedin.png";
import web from "../../sources/web.png";
import github from "../../sources/github.png";
import camera from "../../sources/camera.png";
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsersList } from "../../redux/actions";
import { useState } from "react";
import * as firebase from "../../utils/firebase";
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
  position: relative;
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
  cursor: pointer;
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

const UploadIcon = styled.img`
  height: 1.8rem;
  position: absolute;
  top: 185px;
  left: 165px;
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
  width: 80%;
  height: 40px;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  border: 1px solid rgb(219, 216, 214);
  align-items: center;
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

const SpanStyle = styled.span`
  margin-left: 10px;
`;

const InputText = styled.input`
  margin-left: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid rgb(219, 216, 214);
`;

const AreaText = styled.textarea`
  margin-left: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid rgb(219, 216, 214);
`;

const UploadLabel = styled.label`
  margin: 0 auto;
`;

const ButtonSet = styled.div`
  display: flex;
  margin: 2rem 0 1rem;
  justify-content: center;
`;

const ButtonStyle = styled.button`
  text-decoration: none;
  color: black;
  /* font-weight: 600; */
  cursor: pointer;
  margin-left: 30px;
  padding: 0 10px;
  background-color: #f1f1f1;
  /* width: 80%; */
  height: 40px;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  border: 1px solid rgb(219, 216, 214);
  align-items: center;
  justify-content: center;
  &:hover {
    color: gray;
  }
`;

const LinkNone = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: gray;
  }
`;

const PreviewTag = styled.div`
  color: rgb(255 182 0);
  font-weight: 600;
`;

const ProfileSetting = () => {
  const d = useDispatch();
  const { userID } = useParams();
  const usersList = useSelector((state) => state.usersList);
  const currentData = usersList.find((item) => item.uid === userID);
  const [displayName, setDisplayName] = useState(currentData?.displayName);
  const [secondEmail, setSecondEmail] = useState(currentData?.secondEmail);
  const [linkedinUrl, setLinkedin] = useState(currentData?.linkedin);
  const [instagramUrl, setInstagram] = useState(currentData?.instagram);
  const [introduce, setIntroduce] = useState(currentData?.introduce);
  const [facebookUrl, setFacebook] = useState(currentData?.facebook);
  const [webUrl, setWebUrl] = useState(currentData?.webUrl);
  const [githubUrl, setGithubUrl] = useState(currentData?.github);
  const [file, setFile] = useState(null);

  const previewImg = file ? URL.createObjectURL(file) : currentData?.avatar;
  const history = useHistory();

  const handleSubmit = () => {
    const data = {
      displayName,
      introduce: introduce || "",
      linkedin: linkedinUrl || "",
      instagram: instagramUrl || "",
      facebook: facebookUrl || "",
      github: githubUrl || "",
      secondEmail: secondEmail || "",
      webUrl: webUrl || "",
      lastEditedTime: new Date(),
    };

    firebase.UpdateProfile(userID, data, file).then(() => {
      alert("更新成功");
      firebase
        .getTotalDocList("users")
        .then((res) => d(getUsersList(res)))
        .catch((err) => console.log(err));
      history.push(`/profile/${userID}`);
    });
  };

  return (
    <Wrapper>
      <SideCard>
        <div>
          <UploadLabel htmlFor="upload-img">
            <AvatarCtn>
              <Avatar src={previewImg} alt="" />
            </AvatarCtn>
            {/* <div> */}
            <input
              type="file"
              id="upload-img"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />

            <UploadIcon src={camera} />
          </UploadLabel>
          {/* </div> */}
        </div>
        <div>
          <UserInfo>
            <h1>{displayName}</h1>
            <p>{introduce || "我還在想😜"}</p>
            <IconSet>
              {instagramUrl && <Icon src={ig} />}
              {facebookUrl && <Icon src={facebookTag} />}
              {linkedinUrl && <Icon src={linkedin} />}
              {githubUrl && <Icon src={github} />}
              {secondEmail && <Icon src={email} />}
              {webUrl && <Icon src={web} />}
            </IconSet>
          </UserInfo>
        </div>
        {/* <div>
          <p>Follow me on popular social media sites.</p>
        </div> */}
        <TagWrapper>
          <PreviewTag>預覽中，更改後記得儲存送出喔！</PreviewTag>
        </TagWrapper>
      </SideCard>
      <hr />
      <ContentWrapper>
        <div>
          <Title>個人資料設定</Title>
          <InputField>
            <TagName>帳號</TagName>
            <InputCtn>
              <SpanStyle>{currentData?.email}</SpanStyle>
            </InputCtn>
          </InputField>
          <InputField>
            <TagName>暱稱</TagName>
            <InputCtn>
              <InputText
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="請輸入暱稱"
              ></InputText>
            </InputCtn>
          </InputField>
          <InputField>
            <TagName>自我介紹</TagName>
            <InputCtn>
              <AreaText
                value={introduce}
                onChange={(e) => setIntroduce(e.target.value)}
                placeholder="請輸入自我介紹"
              ></AreaText>
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
                <InputText
                  value={instagramUrl}
                  onChange={(e) => setInstagram(e.target.value)}
                ></InputText>
              </InputCtn>
            </InputField>
            <InputField>
              <TagName>Facebook</TagName>
              <InputCtn>
                <InputText
                  value={facebookUrl}
                  onChange={(e) => setFacebook(e.target.value)}
                ></InputText>
              </InputCtn>
            </InputField>
            <InputField>
              <TagName>linkedin</TagName>
              <InputCtn>
                <InputText
                  value={linkedinUrl}
                  onChange={(e) => setLinkedin(e.target.value)}
                ></InputText>
              </InputCtn>
            </InputField>
            <InputField>
              <TagName>GitHub</TagName>
              <InputCtn>
                <InputText
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                ></InputText>
              </InputCtn>
            </InputField>
            <InputField>
              <TagName>其他聯絡信箱</TagName>
              <InputCtn>
                <InputText
                  value={secondEmail}
                  onChange={(e) => setSecondEmail(e.target.value)}
                ></InputText>
              </InputCtn>
            </InputField>
            <InputField>
              <TagName>個人網站</TagName>
              <InputCtn>
                <InputText
                  value={webUrl}
                  onChange={(e) => setWebUrl(e.target.value)}
                ></InputText>
              </InputCtn>
            </InputField>
          </div>
        </div>
        <ButtonSet>
          <ButtonStyle onClick={handleSubmit}>確認送出</ButtonStyle>
          {/* <ButtonStyle>取消</ButtonStyle> */}
          <ButtonStyle>
            <LinkNone to={`/profile/${userID}`}>返回個人頁面</LinkNone>
          </ButtonStyle>
        </ButtonSet>
      </ContentWrapper>
    </Wrapper>
  );
};

export default ProfileSetting;
