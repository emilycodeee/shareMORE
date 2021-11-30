import React from "react";
import HtmlParser from "react-html-parser";
import {
  RevertIcon,
  LinkIcon,
  IconBtn,
  ContentWrapper,
  BookDetail,
  TitleStyle,
  Pstyle,
  ContentText,
  PrevBookImage,
} from "../style/BookContent.style";

const BookContent = ({ bookContent, setShowBookContent }) => {
  return (
    <ContentWrapper>
      <BookDetail>
        <div>
          <PrevBookImage src={bookContent.mainCover} />
        </div>
        <div>
          <div>
            <TitleStyle>{bookContent.volumeInfo.title}</TitleStyle>
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
        {HtmlParser(bookContent.volumeInfo?.description)}
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
