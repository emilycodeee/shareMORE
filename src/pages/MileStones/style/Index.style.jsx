import styled from "styled-components";
import { Link } from "react-router-dom";
import { RiShareForwardFill } from "react-icons/ri";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaRegThumbsUp, FaThumbsUp, FaRegCommentAlt } from "react-icons/fa";

const iconStyle = {
  width: "1.4rem",
  height: "1.4rem",
  color: "#f27e59",
};

const ThumbsUpFilled = styled(FaThumbsUp)`
  ${iconStyle}
`;

const ThumbsUp = styled(FaRegThumbsUp)`
  ${iconStyle}
`;

const Comment = styled(FaRegCommentAlt)`
  ${iconStyle}
`;

const Save = styled(BsBookmark)`
  ${iconStyle}
`;

const Saved = styled(BsBookmarkFill)`
  ${iconStyle}
`;

const Share = styled(RiShareForwardFill)`
  ${iconStyle}
  width: 1.5rem;
  height: 1.5rem;
`;

const IconSet = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media only screen and (max-width: 992px) {
    position: fixed;
    bottom: 0;
    flex-direction: row;
    width: 100vw;
    align-items: flex-start;
    justify-content: space-evenly;
    padding: 1.2rem 0 1rem 0;
    left: 0;
    background-color: #fff4e4;
    box-shadow: rgb(0 0 0 / 16%) 0px -4px 11px 0px;
  }
`;

const QlContent = styled.div`
  height: fit-content;
  margin: 0 auto;
  background-color: #fff;
  img {
    max-width: 100%;
  }
`;

const Container = styled.div`
  max-width: 1560px;
  width: 80%;

  height: fit-content;
  display: flex;
  margin: 0 auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
  gap: 1rem;
  @media only screen and (max-width: 992px) {
    flex-direction: column;
    padding-bottom: 0;
  }
  @media only screen and (max-width: 500px) {
    width: 90%;
    flex-direction: column;
    padding: 10px;
  }
`;

const TopCover = styled.div`
  width: 100%;
  height: 30vw;
  background-size: cover;
  background-position: center;
  margin: 1.5rem 0;
`;

const Wrapper = styled.div`
  border-radius: 4px;
  padding: 30px;
  background-color: #fffdfd;
  border: none;
  width: 80%;
  @media only screen and (max-width: 992px) {
    width: 100%;
  }

  @media only screen and (max-width: 500px) {
    padding: 10px;
    width: 100%;
  }
`;

const AuthorLink = styled(Link)`
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const SideSetting = styled.div`
  width: 15%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 30px;
  height: 100vh;
  border-radius: 4px;
  position: sticky;
  top: 20px;
  left: 0;
  gap: 1rem;

  h3 {
    word-wrap: break-word;
    text-align: center;
  }
  @media only screen and (max-width: 992px) {
    flex-direction: row;
    background-color: #fff4e4;
    h3 {
      display: none;
    }
    width: 100%;
    position: static;
    height: 13vh;
    margin-top: 0;
  }
`;

const IconWord = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  span {
    color: #f27e59;
    font-weight: 600;
  }
`;

const CountWrapper = styled.div`
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 3px;
  span {
    color: #f27e59;
    font-weight: 600;
  }
  @media only screen and (max-width: 992px) {
    margin-top: 0;
    flex-direction: column;
    span {
      display: block;
    }
  }
`;

const Count = styled.div`
  position: absolute;
  top: -17px;
  right: -5px;
  font-size: 14px;
  color: #f27e59;
  font-weight: 600;
`;

const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const TinyAvatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

const HeadDetail = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 992px) {
    flex-direction: column;
  }
`;

const P = styled.p`
  margin-bottom: 1rem;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: #f27e59;
  font-weight: 600;
`;

const TopPTag = styled.p`
  font-weight: 500;
  font-size: 14px;
  &:first-child {
    font-weight: 600;
  }
`;

const EditBtn = styled.button`
  border-radius: 4px;
  list-style: none;
  font-weight: 600;
  font-size: 0.8rem;
  height: auto;
  text-decoration: none;
  color: #f27e59;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: none;
  padding: 5px;
  cursor: pointer;
  border: 1px solid #f27e59;
  background-color: transparent;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
  @media only screen and (max-width: 992px) {
    padding: 2px;
    font-size: 0.6rem;
  }
`;

const ButtonSet = styled.div`
  display: flex;
  gap: 10px;
  @media only screen and (max-width: 992px) {
    margin-top: 10px;
    align-self: flex-end;
  }
`;

const EditLink = styled(Link)`
  border-radius: 4px;
  list-style: none;
  font-weight: 600;
  font-size: 0.8rem;
  height: auto;
  text-decoration: none;
  color: #f27e59;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: none;
  padding: 5px 5px;
  cursor: pointer;
  border: 1px solid #f27e59;
  background-color: transparent;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
  @media only screen and (max-width: 992px) {
    padding: 2px;
    font-size: 0.6rem;
  }
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

const AuthorDataCtn = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 992px) {
    align-self: flex-start;
  }
`;

const CommentCtn = styled.div`
  border-top: 3px solid #f27e59;
  width: 600px;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-right: 120px;
  max-width: 70%;
  outline: none;
  background-color: white;
  z-index: 99;
  border-radius: 3px;
  /* 卷軸 */
  min-height: 150px;
  padding: 0px 0px 20px;
  max-height: calc(100vh - 240px);
  overflow-y: auto;
  scroll-behavior: smooth;
  @media only screen and (max-width: 500px) {
    width: 90%;
  }
`;

const MainPost = styled.div`
  display: flex;
  padding: 1rem 1rem 0.5rem 1rem;
  margin: 0px;
  justify-content: center;
  align-items: flex-start;
`;

const PostAvatar = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

const TextPost = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TagCtn = styled.div`
  font-weight: 550;
  width: 100%;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #dee2e6;
`;

const TextAreaStyle = styled.textarea`
  resize: none;
  border: 1px solid rgb(203, 195, 194);
  border-radius: 3px;
  height: 3rem;
  padding: 0.5rem;
`;

const PostBtn = styled.button`
  margin-top: 1rem;
  color: #f27e59;
  background-color: transparent;
  font-size: 12px;
  border: 1px solid #f27e59;
  border-radius: 2px;
  min-width: 80px;
  padding: 4px;
  cursor: pointer;
  align-self: flex-end;
`;

export {
  ThumbsUpFilled,
  ThumbsUp,
  Comment,
  Save,
  Saved,
  Share,
  IconSet,
  QlContent,
  Container,
  TopCover,
  Wrapper,
  AuthorLink,
  SideSetting,
  IconWord,
  CountWrapper,
  Count,
  Avatar,
  TinyAvatar,
  HeadDetail,
  P,
  LinkStyle,
  TopPTag,
  EditBtn,
  ButtonSet,
  EditLink,
  PageShield,
  AuthorDataCtn,
  CommentCtn,
  MainPost,
  PostAvatar,
  TextPost,
  TagCtn,
  TextAreaStyle,
  PostBtn,
};
