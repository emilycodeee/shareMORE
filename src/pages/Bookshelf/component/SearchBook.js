import React from "react";
import styled, { keyframes } from "styled-components";
import { useParams, useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";

import { BsLink45Deg, BsBookmarkPlus } from "react-icons/bs";
import { BiSearchAlt2, BiUndo, BiX } from "react-icons/bi";
import { JumpCircleLoading } from "react-loadingg";
import BookContent from "./BookContnet";
import * as firebase from "../../../utils/firebase";
import HtmlParser from "react-html-parser";

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
  max-height: calc(100vh - 240px);
  border-top: 5px solid #f27e59;
  overflow-y: auto;
  scroll-behavior: smooth;
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
  height: 100px;
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
  /* flex-direction: column; */
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

const SearchBook = () => {
  const { groupID } = useParams();
  console.log(groupID);
  const userData = useSelector((state) => state.userData);
  const groupsList = useSelector((state) => state.groupsList);

  const [showBookContent, setShowBookContent] = useState(false);
  const [showSubmitDialogue, setShowSubmitDialogue] = useState(false);
  const [submitValue, setSubmitValue] = useState("");
  const [value, setValue] = useState("");
  const [content, setContent] = useState([]);
  const [bookContent, setBookContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const currentGroup = groupsList.find((g) => g.groupID === groupID);
  const checkGroupCreator = currentGroup.creatorID === userData.uid;

  const submit = () => {
    setIsLoading(true);
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${value}&maxResults=40`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.items);
        setContent(data.items);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const keyWord = e.target.value;
      setIsLoading(true);
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${keyWord}&maxResults=40`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.items);
          setContent(data.items);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleRec = (e) => {
    const data = {
      ...bookContent,
      recReason: submitValue,
      groupID,
      applyStatus: true,
      groupSharerUid: userData.uid,
      // applyStatus: false,
      shareDate: new Date(),
    };
    setShowSubmitDialogue(false);
    console.log(data);
    firebase.setGroupBook(data).then(() => {
      // setShowSubmitDialogue(false);
      setSubmitValue("");
      if (true) {
        alert("書本已經存入書櫃囉");
      }
    });
  };

  const defaultBook =
    "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2FbookDefault.jpg?alt=media&token=11e30ec0-04a8-4ce5-8a35-37fbb5c1a99b";
  // console.log(bookContent.volumeInfo.webReaderLink);

  return (
    <>
      <Wrapper>
        {!showBookContent && (
          <>
            {/* <label>查找書目</label> */}
            {/* <Run>找書更方便！一起建立社團書櫃！</Run> */}
            <SearchBookInput>
              <SearchInput
                value={value}
                onKeyPress={handleSearch}
                onChange={(e) => setValue(e.target.value)}
                placeholder="書名、作者、ISBN..."
              />
              <AdvancedIcon onClick={submit} />
              {/* <button onClick={submit}>搜尋</button> */}
            </SearchBookInput>
            {isLoading && <JumpCircleLoading />}
            <ResultWrapper>
              {content?.length > 1 &&
                content?.map((b, i) => {
                  // console.log(b.volumeInfo.title);
                  return (
                    <ResultBookCtn
                      key={i}
                      onClick={() => {
                        setShowBookContent(true);
                        setBookContent(b);
                        // console.log(showBookContent);
                      }}
                    >
                      <ImgDe
                        src={
                          b.volumeInfo?.imageLinks?.smallThumbnail ||
                          defaultBook
                        }
                      />
                      <Title>{b.volumeInfo.title}</Title>
                      <Author>作者：{b.volumeInfo.authors}</Author>
                    </ResultBookCtn>
                  );
                })}
            </ResultWrapper>
          </>
        )}

        {showBookContent && (
          <BookWrapper>
            <BookDetail>
              <div>
                <BookImage
                  src={
                    bookContent.volumeInfo.imageLinks.thumbnail || defaultBook
                  }
                />
              </div>
              <div>
                <div>
                  <Titlestyle>{bookContent.volumeInfo.title}</Titlestyle>
                  <Pstyle>
                    作者/譯者：{bookContent.volumeInfo.authors?.join(",")}
                  </Pstyle>
                  <Pstyle>出版社：{bookContent.volumeInfo.publisher}</Pstyle>
                  <Pstyle>
                    出版日期：{bookContent.volumeInfo.publishedDate}
                  </Pstyle>
                </div>
                <ActionIcon>
                  <a href={bookContent.volumeInfo.previewLink} target="_blank">
                    <LinkIcon />
                  </a>

                  <BookIcon
                    onClick={() => {
                      setShowSubmitDialogue(true);
                    }}
                  />
                </ActionIcon>
              </div>
            </BookDetail>
            <ContentText>
              {HtmlParser(bookContent.volumeInfo.description)}
            </ContentText>
            <RevertIcon
              onClick={() => {
                setShowBookContent(false);
                setSubmitValue("");
              }}
            />
          </BookWrapper>
        )}
      </Wrapper>
      {showSubmitDialogue && (
        <PageShield
          data-target="shield-submit"
          onClick={(e) => {
            e.target.dataset.target === "shield-submit" &&
              setShowSubmitDialogue(!showSubmitDialogue);
          }}
        >
          <InputWrapper>
            <div>說說為什麼想推薦，幫助夥伴快速瞭解這本書吧!</div>
            <RecTextarea
              value={submitValue}
              onChange={(e) => {
                setSubmitValue(e.target.value);
              }}
            />
            <RecButton onClick={handleRec}>送出推薦</RecButton>
          </InputWrapper>
        </PageShield>
      )}
    </>
  );
};

export default SearchBook;

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

const typing = keyframes`
	from { width: 0 }
`;

const caret = keyframes`
	50% { border-right-color: transparent; }
`;

const Run = styled.h1`
  width: 34rem;
  white-space: nowrap;
  overflow: hidden;
  border-right: 0.05em solid;
  color: black;
  animation: ${typing} 6s steps(15) infinite, ${caret} 1s steps(1) infinite;
  @media only screen and (max-width: 500px) {
    font-size: 1.2rem;
    width: 20rem;
  }
`;

const RecTextarea = styled.textarea`
  height: 4rem;
  overflow-y: auto;
  padding: 3px 5px;
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
  /* color: red; */
  @media only screen and (max-width: 800px) {
    text-align: center;
  }
`;

const ContentText = styled.div`
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
  /* cursor: zoom-out; */
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
  max-width: 50%;
  outline: none;
  background-color: white;
  z-index: 99;
  border-radius: 4px;
  min-height: 150px;
  gap: 10px;
  /* padding: 0px 0px 20px; */
  padding: 2rem;
  max-height: calc(100vh - 240px);
  overflow-y: auto;
  scroll-behavior: smooth;
  /* background-color: red; */
  border-top: 5px solid #f27e59;
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

const SearchBookInput = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  align-items: center;
`;
