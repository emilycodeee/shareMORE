import React from "react";
import styled from "styled-components";
import HtmlParser from "react-html-parser";
import { RiArrowGoBackLine } from "react-icons/ri";
import { GrLink } from "react-icons/gr";
import { BiSearchAlt2, BiUndo, BiX } from "react-icons/bi";
import { BsLink45Deg, BsBookmarkPlus } from "react-icons/bs";
const defaultBook =
  "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2FbookDefault.jpg?alt=media&token=11e30ec0-04a8-4ce5-8a35-37fbb5c1a99b";

const BookContent = ({ bookContent, setShowBookContent }) => {
  return (
    <ContentWrapper>
      <BookDetail>
        <div>
          <PrevBookImage
            src={bookContent.volumeInfo.imageLinks.thumbnail || defaultBook}
          />
        </div>
        <div>
          <div>
            <Titlestyle>{bookContent.volumeInfo.title}</Titlestyle>
            <Pstyle>
              作者/譯者：{bookContent.volumeInfo.authors?.join(",")}
            </Pstyle>
            <Pstyle>出版社：{bookContent.volumeInfo.publisher}</Pstyle>
            <Pstyle>出版日期：{bookContent.volumeInfo.publishedDate}</Pstyle>
            <a href={bookContent.volumeInfo.previewLink} target="_blank">
              <LinkIcon />
            </a>
          </div>
        </div>
      </BookDetail>
      <ContentText>
        {HtmlParser(bookContent.volumeInfo.description)}
      </ContentText>
      <IconBtn
        onClick={() => {
          setShowBookContent(false);
        }}
      >
        <RevertIcon />
      </IconBtn>
    </ContentWrapper>
  );
};

export default BookContent;

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
  /* max-height: calc(100vh - 240px); */
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
  /* flex-direction: column; */
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    gap: 1rem;
  }
  /* display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 1rem; */
  /* display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  width: 100%; */
  /* flex-direction: column; */
`;

const Titlestyle = styled.p`
  /* line-height: 1.5rem; */
  font-weight: 550;
  line-height: 1.5rem;
  /* color: red; */
  @media only screen and (max-width: 800px) {
    text-align: center;
  }
`;
const Pstyle = styled.p`
  line-height: 1.3rem;
  /* color: red; */
  font-weight: 550;
  color: gray;
  @media only screen and (max-width: 800px) {
    text-align: center;
  }
`;

const ContentText = styled.div`
  width: 80%;
  line-height: 1.4rem;
  /* border: 1px solid red; */
`;

const PrevBookImage = styled.img`
  box-shadow: rgb(0 0 0 / 16%) 0px 5px 11px 0px;
  height: 200px;
  margin-right: 2rem;
`;
