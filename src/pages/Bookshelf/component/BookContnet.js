import React from "react";
import styled from "styled-components";
import HtmlParser from "react-html-parser";
import { RiArrowGoBackLine } from "react-icons/ri";

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
            <Pstyle>{bookContent.volumeInfo.title}</Pstyle>
            <Pstyle>
              作者/譯者：{bookContent.volumeInfo.authors?.join(",")}
            </Pstyle>
            <Pstyle>出版社：{bookContent.volumeInfo.publisher}</Pstyle>
            <Pstyle>出版日期：{bookContent.volumeInfo.publishedDate}</Pstyle>
            <a href={bookContent.volumeInfo.previewLink} target="_blank">
              試讀連結
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
        <RiArrowGoBackLine />
      </IconBtn>
    </ContentWrapper>
  );
};

export default BookContent;

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
  /* padding: 0px 0px 20px; */
  padding: 2rem;
  max-height: calc(100vh - 240px);
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const BookDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 1rem;

  /* flex-direction: column; */
`;

const Pstyle = styled.p`
  line-height: 1.5rem;
`;

const ContentText = styled.div`
  margin: 0 auto;
  width: 70%;
  line-height: 1.4rem;
  letter-spacing: 0.3px;
  /* border: 1px solid red; */
`;

const PrevBookImage = styled.img`
  box-shadow: rgb(0 0 0 / 16%) 0px 5px 11px 0px;
  height: 200px;
  margin-right: 2rem;
`;
