import React from "react";
import camera from "../../sources/camera.png";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateProfile } from "../../utils/firebase";
import { successAlert, errorAlert } from "../../utils/alert";
import { webRegex } from "../../utils/common";
import { DisappearedLoading } from "react-loadingg";
import {
  WebIcon,
  MailIcon,
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
  GitIcon,
  Wrapper,
  ContentWrapper,
  SideCard,
  AvatarCtn,
  Avatar,
  UserInfo,
  TagWrapper,
  MobileTagWrapper,
  UploadIcon,
  IconSet,
  InputField,
  Title,
  TagName,
  InputCtn,
  SpanStyle,
  InputText,
  AreaText,
  UploadLabel,
  ButtonSet,
  ButtonStyle,
  LinkNone,
  PreviewTag,
} from "./style/ProfileSetting.style";

const ProfileSetting = () => {
  const history = useHistory();
  const { userID } = useParams();
  const usersList = useSelector((state) => state.usersList);
  const userData = useSelector((state) => state.userData);
  const [currentData, setCurrentData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [secondEmail, setSecondEmail] = useState("");
  const [linkedinUrl, setLinkedin] = useState("");
  const [instagramUrl, setInstagram] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [facebookUrl, setFacebook] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [file, setFile] = useState(null);

  const previewImg = file ? URL.createObjectURL(file) : currentData?.avatar;

  useEffect(() => {
    if (userData === null) {
      history.push("/");
    } else if (
      userData !== undefined &&
      Object.keys(userData).length > 0 &&
      usersList.length > 0
    ) {
      const checkUser = usersList.findIndex((p) => p.uid === userID);
      if (checkUser < 0) {
        history.push("/404");
      } else {
        const owner = usersList.find((item) => item.uid === userID);
        if (owner.uid !== userData.uid) {
          history.push("/");
        } else {
          setCurrentData(owner);
          setDisplayName(owner.displayName);
          setSecondEmail(owner.secondEmail);
          setLinkedin(owner.linkedin);
          setInstagram(owner.instagram);
          setIntroduce(owner.introduce);
          setFacebook(owner.facebook);
          setWebUrl(owner.webUrl);
          setGithubUrl(owner.github);
          setIsLoading(false);
        }
      }
    }
  }, [usersList, userData]);

  const handleSubmit = () => {
    if (instagramUrl) {
      const igRegex = /https\:\/\/www\.instagram\.com\//;
      const checkIG = igRegex.test(instagramUrl);
      if (!checkIG) {
        errorAlert("Instagram 網址好像怪怪的！");
        return;
      }
    }

    if (facebookUrl) {
      const fbRegex = /https\:\/\/www\.facebook\.com\//;
      const checkFB = fbRegex.test(facebookUrl);
      if (!checkFB) {
        errorAlert("Facebook 網址好像怪怪的！");
        return;
      }
    }

    if (linkedinUrl) {
      const lkRegex = /https\:\/\/www\.linkedin\.com\//;
      const checkLK = lkRegex.test(linkedinUrl);
      if (!checkLK) {
        errorAlert("Linkedin 網址好像怪怪的！");
        return;
      }
    }

    if (githubUrl) {
      const ghRegex = /https\:\/\/github\.com\//;
      const checkGH = ghRegex.test(githubUrl);
      if (!checkGH) {
        errorAlert("Github 網址好像怪怪的！");
        return;
      }
    }

    if (secondEmail) {
      const emRegex =
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      const checkEM = emRegex.test(secondEmail);
      if (!checkEM) {
        errorAlert("信箱格式好像怪怪的！");
        return;
      }
    }

    if (webUrl) {
      const checkWEB = webRegex.test(webUrl);
      if (!checkWEB) {
        errorAlert("網址格式好像怪怪的，是不是少了 https 或 http 呢? ");
        return;
      }
    }

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

    updateProfile(userID, data, file).then(() => {
      successAlert("更新成功");
      history.push(`/profile/${userID}`);
    });
  };

  if (userData === undefined || isLoading) {
    return <DisappearedLoading />;
  } else if (!isLoading)
    return (
      <Wrapper>
        <SideCard>
          <div>
            <UploadLabel htmlFor="upload-img">
              <AvatarCtn>
                <Avatar src={previewImg} alt="" />
                <UploadIcon src={camera} />
              </AvatarCtn>
              <input
                type="file"
                accept="image/*"
                id="upload-img"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files[0]) {
                    if (!e.target.files[0].type.includes("image")) {
                      errorAlert("圖片格式怪怪的");
                      return;
                    }
                  }
                  setFile(e.target.files[0]);
                }}
              />
            </UploadLabel>
          </div>

          <UserInfo>
            <h1>{displayName}</h1>
            <p>{introduce || "我還在想😜"}</p>
            <IconSet>
              {instagramUrl && <InstagramIcon />}
              {facebookUrl && <FacebookIcon />}
              {linkedinUrl && <LinkedinIcon />}
              {githubUrl && <GitIcon />}
              {secondEmail && <MailIcon />}
              {webUrl && <WebIcon />}
            </IconSet>
            <MobileTagWrapper>
              <PreviewTag>預覽中，更改後記得儲存送出喔！</PreviewTag>
            </MobileTagWrapper>
          </UserInfo>
          <TagWrapper>
            <PreviewTag>預覽中，更改後記得儲存送出喔！</PreviewTag>
          </TagWrapper>
        </SideCard>

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
            <ButtonStyle>
              <LinkNone to={`/profile/${userID}`}>返回個人頁面</LinkNone>
            </ButtonStyle>
          </ButtonSet>
        </ContentWrapper>
      </Wrapper>
    );
};

export default ProfileSetting;
