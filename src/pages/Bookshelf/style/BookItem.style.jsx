import styled from "styled-components";
import ShowMoreText from "react-show-more-text";
import { BiX } from "react-icons/bi";

const ShowMoreTextStyle = styled(ShowMoreText)`
  a {
    text-decoration: none;
    color: #f27e59;
    font-weight: 500;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 10px;
`;

const DeleteIcon = styled(BiX)`
  position: absolute;
  top: -20px;
  right: 0;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 1.5rem;
`;

const SelectedBook = styled.div`
  cursor: pointer;
`;

const BookImage = styled.img`
  box-shadow: rgb(0 0 0 / 16%) 0px 5px 11px 0px;
  height: 200px;
`;

const BookTitle = styled.div`
  font-size: 1rem;
  font-weight: 550;
`;

const BookAuthor = styled.div`
  color: gray;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RecommenderDetail = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  align-self: flex-start;
  margin-right: 0.5rem;
`;

const RecommendText = styled.div`
  line-height: 1.3rem;
  margin-top: 0.5rem;
  text-align: start;
  background-color: rgba(255, 244, 228);
  padding: 0.5rem;
  border-radius: 3px;
  white-space: pre-wrap;
  word-break: break-all;
`;

export {
  ShowMoreTextStyle,
  Wrapper,
  DeleteIcon,
  SelectedBook,
  BookImage,
  BookTitle,
  BookAuthor,
  RecommenderDetail,
  Avatar,
  RecommendText,
};
