import styled from "styled-components";
import { BiUndo } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";

const IconStyle = {
  fontSize: "2rem",
  cursor: "pointer",
  color: "#f27e59",
};

const RevertIcon = styled(BiUndo)`
  ${IconStyle}
  font-size: 2rem;
  margin: 10px 0;
`;

const LinkIcon = styled(BsLink45Deg)`
  ${IconStyle}
  font-size: 2rem;
`;

const IconBtn = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  width: 2vmin;
  height: 2vmin;
  margin: 0 auto;
  margin-top: 2vmin;
`;

const ContentWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-right: 120px;
  outline: none;
  background-color: white;
  z-index: 99;
  border-radius: 5px;
  min-height: 150px;
  padding: 2rem;
  max-height: 65vh;
  border-top: 5px solid #f27e59;
  overflow-y: auto;
  scroll-behavior: smooth;
  @media only screen and (max-width: 500px) {
    width: 90%;
  }
`;

const BookDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  width: 80%;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const TitleStyle = styled.p`
  font-weight: 550;
  line-height: 1.5rem;
  @media only screen and (max-width: 800px) {
    text-align: center;
  }
`;
const Pstyle = styled.p`
  line-height: 1.3rem;
  font-size: 0.8rem;
  font-weight: 550;
  color: gray;
  @media only screen and (max-width: 800px) {
    text-align: center;
  }
`;

const ContentText = styled.div`
  text-align: center;
  width: 80%;
  line-height: 1.4rem;
  white-space: pre-wrap;
`;

const PrevBookImage = styled.img`
  box-shadow: rgb(0 0 0 / 16%) 0px 5px 11px 0px;
  height: 200px;
  margin-right: 2rem;
`;

export {
  RevertIcon,
  LinkIcon,
  IconBtn,
  ContentWrapper,
  BookDetail,
  TitleStyle,
  Pstyle,
  ContentText,
  PrevBookImage,
};
