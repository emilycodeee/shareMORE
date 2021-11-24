import styled from "styled-components";
import { BsLink45Deg, BsBookmarkPlus } from "react-icons/bs";
import { BiSearchAlt2, BiUndo } from "react-icons/bi";

const IconStyle = {
  fontSize: "2rem",
  cursor: "pointer",
  color: "#f27e59",
};

const LinkIcon = styled(BsLink45Deg)`
  ${IconStyle}
  font-size: 2rem;
`;

const RevertIcon = styled(BiUndo)`
  ${IconStyle}
  font-size: 2rem;
  margin: 10px 0;
`;

const BookIcon = styled(BsBookmarkPlus)`
  ${IconStyle}
  font-size: 1.7rem;
  margin-bottom: 10px;
`;

const AdvancedIcon = styled(BiSearchAlt2)`
  ${IconStyle}
  margin-left: 10px;
  margin-right: 0;
`;

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
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

const ResultBookCtn = styled.div`
  cursor: pointer;
`;

const ResultWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: center;
  gap: 1rem;
  margin-top: 1rem;
  @media only screen and (max-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.p`
  font-weight: 600;
  margin-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Author = styled.p`
  color: gray;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ImgDe = styled.img`
  height: 150px;
  box-shadow: rgb(0 0 0 / 16%) 0px 5px 11px 0px;
`;

const BookWrapper = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  width: 100%;
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

const BookImage = styled.img`
  box-shadow: rgb(0 0 0 / 16%) 0px 5px 11px 0px;
  height: 200px;
  margin-right: 2rem;

  @media only screen and (max-width: 800px) {
    margin: 0;
  }
`;

const RecButton = styled.button`
  margin: 0 auto;
  border: none;
  padding: 0.6rem;
  cursor: pointer;
  border-radius: 4px;
  color: #f27e59;
  border: 1px solid #f27e59;
  background-color: transparent;
  font-weight: 600;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
`;

const RecTextarea = styled.textarea`
  height: 4rem;
  overflow-y: auto;
  padding: 3px 5px;
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

const ActionIcon = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem;
  padding: 3px;
  gap: 10px;

  @media only screen and (max-width: 800px) {
    justify-content: center;
  }
`;

const Titlestyle = styled.p`
  font-weight: 550;
  line-height: 1.5rem;

  @media only screen and (max-width: 800px) {
    text-align: center;
  }
`;

const ContentText = styled.div`
  white-space: pre-line;
  text-align: center;
  width: 80%;
  line-height: 1.2rem;
`;
const PageShield = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
`;

const InputWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-right: 120px;
  outline: none;
  background-color: white;
  z-index: 99;
  border-radius: 4px;
  min-height: 150px;
  gap: 10px;
  padding: 2rem;
  max-height: calc(100vh - 240px);
  overflow-y: auto;
  scroll-behavior: smooth;
  border-top: 5px solid #f27e59;
  @media only screen and (max-width: 500px) {
    width: 90%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 20%;
  border-radius: 10px;
  outline: none;
  border: 1px solid #d1cbcb;
  padding: 10px;
  &:focus {
    border: none;
    box-shadow: 0px 0px 7px -2px rgba(242, 126, 89, 0.76) inset;
  }
`;

const SearchBookContainer = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  align-items: center;
`;

export {
  Wrapper,
  ResultBookCtn,
  ResultWrapper,
  Title,
  Author,
  ImgDe,
  BookWrapper,
  BookDetail,
  BookImage,
  RecButton,
  RecTextarea,
  Pstyle,
  ActionIcon,
  Titlestyle,
  ContentText,
  PageShield,
  InputWrapper,
  SearchInput,
  IconStyle,
  LinkIcon,
  RevertIcon,
  BookIcon,
  AdvancedIcon,
  SearchBookContainer,
};
