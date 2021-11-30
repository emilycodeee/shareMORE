import styled from "styled-components";
import { BsPencilSquare, BsCheckLg } from "react-icons/bs";

const EditIcon = styled(BsPencilSquare)`
  cursor: pointer;
  margin-left: 10px;
`;

const ConfirmIcon = styled(BsCheckLg)`
  cursor: pointer;
  margin-left: 10px;
`;

const Wrapper = styled.div`
  border-radius: 4px;
  max-width: 1560px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  display: flex;
  background-color: #fff;
  padding: 1rem 0;
  @media only screen and (max-width: 992px) {
    flex-direction: column;
  }
`;

const MobileBlock = styled.div`
  display: none;
  @media only screen and (max-width: 992px) {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 0 3%;
  }
`;

const LabelStyled = styled.label`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const MemberContainer = styled.div`
  width: 100%;
  min-height: 35px;
  box-shadow: 1px 1px 1px #d1cbc6;
  border-radius: 4px;
  border: 1px solid #d1cbcb;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin-bottom: 1rem;
`;

const HeadDiv = styled.div`
  position: relative;
`;

const HeadAvatar = styled.img`
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  margin: 5px;
  border-radius: 50%;
  border: 2px solid #f27e59;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

const MainBlock = styled.div`
  width: 60%;
  padding: 0 3%;
  @media only screen and (max-width: 992px) {
    width: 100%;
  }
`;

const SectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const ContentCtn = styled.textarea`
  box-shadow: 2px 2px 3px #d1cbcb;
  border-radius: 4px;
  height: 15vh;
  outline: none;
  padding: 1rem;
  border: ${(props) =>
    props.actEdit ? " 1px solid black" : " 1px solid #d1cbcb"};
`;

const ContentStyled = styled.div`
  line-height: 1.5rem;
  border: 1px solid #d1cbcb;
  padding: 1rem;
`;

const PostArea = styled.textarea`
  resize: none;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 1rem 1rem;
  border-radius: 4px;
  color: black;
  background-color: #fff4e4;
`;

const PostBtn = styled.button`
  margin-top: 0.5rem;
  font-weight: 600;
  padding: 0;
  width: 3rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  align-self: flex-end;
  border-radius: 3px;
  border: 1px solid #f27e59;
  color: #f27e59;
  background-color: transparent;
  outline: none;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
`;

const TagStyle = styled.div`
  background-color: rgba(255, 244, 228);
  padding: 8px 16px;
  border-radius: 100px;
  box-shadow: 0px 2px 7px -3px rgb(132 131 126 / 20%);
`;

const CateTag = styled.div`
  display: flex;
  gap: 10px;
`;

const AboutContent = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
`;

const SideBlock = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(230, 230, 230, 1);
  width: 40%;
  margin-bottom: 2rem;
  padding: 0 3%;
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

export {
  EditIcon,
  ConfirmIcon,
  Wrapper,
  MobileBlock,
  LabelStyled,
  MemberContainer,
  HeadDiv,
  HeadAvatar,
  MainBlock,
  SectionStyled,
  ContentCtn,
  ContentStyled,
  PostArea,
  PostBtn,
  TagStyle,
  CateTag,
  AboutContent,
  SideBlock,
};
