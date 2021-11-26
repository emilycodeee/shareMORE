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
  width: "1.4rem",
  height: "1.4rem",
  color: "black",
  marginTop: "10px",
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

const SideCard = styled.div`
  margin-top: 3rem;
  padding: 2rem 1rem 1rem 1rem;
  width: 30%;
  display: flex;
  flex-direction: column;
  background: #fffdfd;
  position: relative;

  @media only screen and (max-width: 992px) {
    align-items: center;
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

const CoverDiv = styled.div`
  width: 8rem;
  height: 8rem;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  border: 1px solid red;

  position: absolute;
  top: -65px;
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

const Avatar = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const UserInfo = styled.div`
  margin-top: 3rem;
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

const TagSet = styled.div`
  text-align: center;
`;

const TagWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-around;
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const IconSet = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: space-evenly;
  @media only screen and (max-width: 992px) {
    margin: 0;
    gap: 10px;
  }
`;
const ListCtn = styled.ul`
  padding: 0;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #fffdfd;
  @media only screen and (max-width: 992px) {
    justify-content: center;
  }
`;

const ListItem = styled.li`
  cursor: pointer;
  list-style: none;
  background-color: none;
  font-weight: 600;
  border-bottom: 3px solid
    ${(props) => (props.active === props.children ? "#f27e59" : "none")};
  color: ${(props) => (props.active === props.children ? "#f27e59" : "black")};
  padding: 0.5rem 1rem;
`;

const SettingBtn = styled(Link)`
  text-decoration: none;
  color: #f27e59;
  font-weight: 600;
  cursor: pointer;
  margin: 30px 0;
  padding: 10px 0;
  width: 100%;
  height: 40px;
  display: flex;
  gap: 10px;
  flex-direction: row;
  border-radius: 4px;
  border: 1px solid #f27e59;
  align-items: center;
  justify-content: center;
  &:hover {
    color: white;
    background-color: #f27e59;
  }
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const ContentCtn = styled.div`
  padding: 10px;
`;

const Empty = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 0 10px;
  gap: 1rem;
  div {
    margin-top: 1rem;
    font-weight: 600;
    color: rgb(242, 126, 89);
  }
  @media only screen and (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

const MobileSettingBtn = styled(Link)`
  display: none;
  @media only screen and (max-width: 992px) {
    display: block;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    width: 60%;
    margin: 0 20%;
    flex-direction: row;
    border-radius: 4px;
    border: 1px solid #f27e59;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f27e59;
    &:hover {
      color: white;
      background-color: #f27e59;
    }
  }
`;

export {
  WebIcon,
  MailIcon,
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
  GitIcon,
  SideCard,
  Wrapper,
  ContentWrapper,
  CoverDiv,
  Avatar,
  UserInfo,
  TagSet,
  TagWrapper,
  IconSet,
  ListCtn,
  ListItem,
  SettingBtn,
  ContentCtn,
  Empty,
  MobileSettingBtn,
};
