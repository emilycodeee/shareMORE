import styled from "styled-components";
import { FiShare2 } from "react-icons/fi";
import { ImBooks } from "react-icons/im";
import { AiOutlineTrophy } from "react-icons/ai";
import { BsFillFolderFill, BsPencilSquare, BsCheckLg } from "react-icons/bs";
import { Link } from "react-router-dom";

const FolderIcon = {
  width: "1.2rem",
  height: " 1.2rem",
  color: "white",
};

const Bookshelf = styled(ImBooks)`
  ${FolderIcon}
  width: 1.3rem;
  height: 1.3rem;
  @media only screen and (max-width: 992px) {
    width: 1rem;
    height: 1rem;
  }
  @media only screen and (max-width: 500px) {
    width: 0.8rem;
    height: 0.8rem;
  }
`;

const Miles = styled(AiOutlineTrophy)`
  ${FolderIcon}
  width: 1.3rem;
  height: 1.3rem;
  @media only screen and (max-width: 992px) {
    width: 1rem;
    height: 1rem;
  }
  @media only screen and (max-width: 500px) {
    width: 0.8rem;
    height: 0.8rem;
  }
`;

const Folder = styled(BsFillFolderFill)`
  ${FolderIcon}
  @media only screen and (max-width: 992px) {
    width: 1rem;
    height: 1rem;
  }
  @media only screen and (max-width: 500px) {
    width: 0.8rem;
    height: 0.8rem;
  }
`;

const SaveImage = styled.img`
  margin-right: 5px;
  position: absolute;
  width: 2rem;
  height: 2rem;
  bottom: -20px;
  right: 0;
  cursor: pointer;
`;

const TopCover = styled.div`
  opacity: 0.9;
  width: 100%;
  height: 30vw;
  background-size: cover;
  background-position: center;
`;

const EditImage = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  margin-right: 5px;
`;

const DivCtn = styled.div`
  position: absolute;
  bottom: -20px;
  right: 0;
`;

const ImgWrapper = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 2rem;
  max-width: 1560px;
  width: 80%;
  margin-bottom: -1px;
  display: flex;
  justify-content: space-between;
`;

const NameLogo = styled(Link)`
  text-decoration: none;
  font-weight: 550;
  font-size: 2rem;
  outline: none;
  width: auto;
  margin-bottom: 0.5rem;
  color: black;
  @media only screen and (max-width: 992px) {
    font-size: 1.8rem;
  }
  @media only screen and (max-width: 500px) {
    font-size: 1.5rem;
  }
`;
const NameInput = styled.input`
  font-weight: 550;
  font-size: 2rem;
  outline: none;
  width: 100%;
  background-color: transparent;
  @media only screen and (max-width: 992px) {
    font-size: 1.8rem;
  }
  @media only screen and (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

const UlStyled = styled.ul`
  display: flex;
  align-items: flex-end;
  position: relative;
  padding-bottom: 0;
  gap: 15px;
  @media only screen and (max-width: 992px) {
    gap: 5px;
  }
  @media only screen and (max-width: 500px) {
    gap: 3px;
  }
`;

const WelcomeToggle = styled.div`
  width: 80%;
  max-width: 1560px;
  margin: 0 auto;
  display: flex;
  margin-top: 1rem;
  justify-content: flex-end;
  gap: 20px;
`;

const LiStyled = styled.div`
  display: flex;
  border-radius: 4px;
  padding: 0.3rem 0.4rem;
  border: 1px solid #f27e59;
  list-style: none;
  font-weight: 600;
  font-size: 1rem;
  height: auto;
  text-decoration: none;
  cursor: pointer;
  color: #f27e59;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
`;

const ShareStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #f27e59;
  }
`;

const LinkStyled = styled(Link)`
  color: #ffffff;
  text-align: center;
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;
  display: inline-block;
  background: ${(props) =>
    props.tag === "true" ? "#f27e59" : "rgb(255 193 174)"};
  padding: 0.5rem 1rem;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom: none;
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;
  &:hover {
    background-color: #f27e59;
  }
  @media only screen and (max-width: 992px) {
    span {
      display: none;
    }
  }
  @media only screen and (max-width: 500px) {
    padding: 0.5rem 1rem;
  }
`;

const Shield = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.8);
`;

const EditIcon = styled(BsPencilSquare)`
  cursor: pointer;
  margin-left: 1rem;
  height: 1rem;
  width: 1rem;
`;
const ShareIcon = styled(FiShare2)`
  cursor: pointer;
  margin-left: 1rem;
  height: 1rem;
  width: 1rem;
  color: #f27e59;
`;

const SubmitIcon = styled(BsCheckLg)`
  cursor: pointer;
  margin-left: 1rem;
  height: 1rem;
  width: 1rem;
`;

const TitleBar = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;

export {
  Bookshelf,
  Miles,
  Folder,
  SaveImage,
  TopCover,
  EditImage,
  DivCtn,
  ImgWrapper,
  Wrapper,
  NameLogo,
  NameInput,
  UlStyled,
  WelcomeToggle,
  LiStyled,
  ShareStyled,
  LinkStyled,
  Shield,
  EditIcon,
  ShareIcon,
  SubmitIcon,
  TitleBar,
};
