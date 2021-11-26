import styled from "styled-components";

import {
  FaGithubSquare,
  FaLinkedin,
  FaFacebookSquare,
  FaMailBulk,
  FaInstagram,
} from "react-icons/fa";

import { BsGlobe } from "react-icons/bs";
import { Link } from "react-router-dom";

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
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  position: relative;
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

export {
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
};
