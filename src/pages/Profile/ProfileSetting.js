import React from "react";
import styled from "styled-components";
import camera from "../../sources/camera.png";
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  FaGithubSquare,
  FaLinkedin,
  FaFacebookSquare,
  FaMailBulk,
  FaInstagram,
} from "react-icons/fa";

import { BsGlobe } from "react-icons/bs";
import * as firebase from "../../utils/firebase";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { webRegex } from "../../utils/commonText";
import { DisappearedLoading } from "react-loadingg";

const Wrapper = styled.div`
  max-width: 1560px;
  width: 100%;
  display: flex;

  margin: 0 auto;
  margin-top: 2rem;
  padding: 60px 60px 150px;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  @media only screen and (max-width: 992px) {
    margin-top: 0;
    padding: 0;
    flex-direction: column;
  }
`;

const ContentWrapper = styled.div`
  padding: 10px;
  width: 70%;
  @media only screen and (max-width: 992px) {
    width: 100%;
  }
`;

const SideCard = styled.div`
  margin-top: 3rem;
  padding: 3rem 1rem 1rem 1rem;
  width: 30%;
  display: flex;
  flex-direction: column;
  background: #fffdfd;
  position: relative;

  @media only screen and (max-width: 992px) {
    align-items: center;
    justify-content: center;
    padding: 1rem;
    margin-top: 0;
    width: 100%;
    position: static;
    flex-direction: row;
  }
  @media only screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const AvatarCtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  position: relative;
  /* border: 1px solid red; */
  @media only screen and (max-width: 992px) {
    margin-top: 0;
  }
`;

const Avatar = styled.img`
  width: 10rem;
  height: 10rem;
  position: absolute;
  top: -168px;
  left: 50%;
  border: 2px solid #fff;
  transform: translateX(-50%);
  border-radius: 50%;
  @media only screen and (max-width: 992px) {
    position: static;
    transform: translateX(0);
    width: 5rem;
    height: 5rem;
    align-self: center;
    margin: 1rem;
  }
`;

const UserInfo = styled.div`
  /* margin-top: 2rem; */
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid rgb(219, 216, 214);
  margin-bottom: 10px;
  gap: 1rem;
  h1,
  p {
    margin: 0;
  }
  @media only screen and (max-width: 992px) {
    h1,
    p {
      margin: 0;
    }
    h1 {
      font-size: 1rem;
    }
    padding: 1rem;
    width: 100%;
    margin-top: 0;
    align-items: flex-start;
    margin-bottom: 0;
  }
  border: none;
`;

const TagWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-around;
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const MobileTagWrapper = styled.div`
  display: none;
  @media only screen and (max-width: 992px) {
    align-self: center;
    display: block;
  }
`;

const UploadIcon = styled.img`
  height: 1.8rem;
  position: absolute;
  top: -40px;
  left: 60%;
  @media only screen and (max-width: 992px) {
    top: 73px;
  }
`;

const IconSet = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  justify-content: space-evenly;
`;

const InputField = styled.div`
  display: flex;
  margin: 10px;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: #f27e59;
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

const InputCtn = styled.div`
  width: 75%;
`;

const SpanStyle = styled.span`
  margin-left: 10px;
`;

const InputText = styled.input`
  margin-left: 10px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 5px;
  border: 1px solid rgb(219, 216, 214);
`;

const AreaText = styled.textarea`
  margin-left: 10px;
  width: 100%;
  padding: 5px 10px;
  height: 15vh;
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
  gap: 30px;
`;

const ButtonStyle = styled.button`
  display: flex;
  border-radius: 4px;
  padding: 0.3rem 0.4rem;
  border: 1px solid #f27e59;
  list-style: none;
  font-weight: 600;
  font-size: 1rem;
  height: auto;
  background-color: transparent;
  text-decoration: none;
  cursor: pointer;
  color: #f27e59;

  &:hover {
    background-color: #f27e59;
    color: white;
  }
`;

const LinkNone = styled(Link)`
  text-decoration: none;
  color: #f27e59;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
`;

const PreviewTag = styled.div`
  color: #f27e59;
  font-weight: 600;
`;

const ProfileSetting = () => {
  const d = useDispatch();
  const { userID } = useParams();
  const usersList = useSelector((state) => state.usersList);
  // const currentData = usersList.find((item) => item.uid === userID);
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
  const history = useHistory();

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
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Instagram 網址好像怪怪的！",
        });
        return;
      }
    }

    if (facebookUrl) {
      const fbRegex = /https\:\/\/www\.facebook\.com\//;
      const checkFB = fbRegex.test(facebookUrl);
      if (!checkFB) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Facebook 網址好像怪怪的！",
        });
        return;
      }
    }

    if (linkedinUrl) {
      const lkRegex = /https\:\/\/www\.linkedin\.com\//;
      const checkLK = lkRegex.test(linkedinUrl);
      if (!checkLK) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Linkedin 網址好像怪怪的！",
        });
        return;
      }
    }

    if (githubUrl) {
      const ghRegex = /https\:\/\/github\.com\//;
      const checkGH = ghRegex.test(githubUrl);
      if (!checkGH) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Github 網址好像怪怪的！",
        });
        return;
      }
    }

    if (secondEmail) {
      const emRegex =
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      const checkEM = emRegex.test(secondEmail);
      if (!checkEM) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "信箱格式好像怪怪的！",
        });
        return;
      }
    }

    if (webUrl) {
      const checkWEB = webRegex.test(webUrl);
      if (!checkWEB) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "網址格式好像怪怪的，是不是少了 https 或 http 呢? ",
        });
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

    firebase.UpdateProfile(userID, data, file).then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "更新成功",
        showConfirmButton: false,
        timer: 1500,
      });
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
                id="upload-img"
                style={{ display: "none" }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </UploadLabel>
            {/* </div> */}
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
const style = {
  marginTop: "10px",
  width: "1.4rem",
  height: "1.4rem",
};

const WebIcon = styled(BsGlobe)`
  ${style}
`;

const MailIcon = styled(FaMailBulk)`
  ${style}
`;

const InstagramIcon = styled(FaInstagram)`
  ${style}
`;

const LinkedinIcon = styled(FaLinkedin)`
  ${style}
`;

const FacebookIcon = styled(FaFacebookSquare)`
  ${style}
`;

const GitIcon = styled(FaGithubSquare)`
  ${style}
`;
