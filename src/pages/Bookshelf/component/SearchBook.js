import React from "react";
import styled from "styled-components";
import { useParams, useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
// import * as firebase from "../../../utils/firebase";
import { GrRevert, GrBook, GrSearchAdvanced } from "react-icons/gr";
import { JumpCircleLoading } from "react-loadingg";
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

const ResultBookCtn = styled.div`
  cursor: pointer;
  /* border: 1px solid red; */
`;

const ResultWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: center;
  gap: 1rem;
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
`;

const BookDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;

  /* flex-direction: column; */
`;

const BookImage = styled.img`
  box-shadow: rgb(0 0 0 / 16%) 0px 5px 11px 0px;
  height: 200px;
  margin-right: 2rem;
`;

const TopCover = styled.div`
  border-radius: 30px;
  opacity: 0.8;
  margin-bottom: 0.8rem;
  height: 300px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 2px 5px grey;
`;

const style = {
  margin: "1rem",
  cursor: "pointer",
  height: "1.5rem",
  width: "1.5rem",
};

const RevertIcon = styled(GrRevert)`
  ${style}
`;

const GrBookIcon = styled(GrBook)`
  ${style}
`;

const GrSearchAdvancedIcon = styled(GrSearchAdvanced)`
  ${style}
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

  const handleRec = (e) => {
    console.log(bookContent);
    // const obj = JSON.parse(bookContent);
    console.log(bookContent);
    const data = {
      ...bookContent,
      recReason: submitValue,
      groupID,
      applyStatus: true,
      groupSharerUid: userData.uid,
      // applyStatus: false,
      shareDate: new Date(),
    };

    // if (checkGroupCreator) {
    //   data.applyStatus = true;
    // } else {
    //   data.applyStatus = false;
    // }

    setShowSubmitDialogue(false);
    console.log(data);
    firebase.setGroupBook(data).then(() => {
      // setShowSubmitDialogue(false);
      setSubmitValue("");
      if (true) {
        alert("書本已經存入書櫃囉");
      } else {
        alert("推薦書本已送出，等候社長審核後就會存入書櫃囉");
      }
      // if (checkGroupCreator) {
      //   alert("書本已經存入書櫃囉");
      // } else {
      //   alert("推薦書本已送出，等候社長審核後就會存入書櫃囉");
      // }
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
            <SearchBookInput>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="書名、作者名、ISBN..."
              />
              <GrSearchAdvancedIcon onClick={submit} />
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
                  <div>書名：{bookContent.volumeInfo.title}</div>
                  <div>
                    作者/譯者：{bookContent.volumeInfo.authors?.join(",")}
                  </div>
                  <div>出版社：{bookContent.volumeInfo.publisher}</div>
                  <div>出版日期：{bookContent.volumeInfo.publishedDate}</div>
                  <a href={bookContent.volumeInfo.previewLink} target="_blank">
                    試讀連結
                  </a>
                </div>
                <div>
                  <RevertIcon
                    onClick={() => {
                      setShowBookContent(false);
                    }}
                  />
                  <GrBookIcon
                    onClick={() => {
                      setShowSubmitDialogue(true);
                    }}
                  />
                </div>
              </div>
            </BookDetail>
            <ContentText>
              {HtmlParser(bookContent.volumeInfo.description)}
            </ContentText>
            <button
              onClick={() => {
                setShowBookContent(false);

                // console.log(showBookContent);
              }}
            >
              返回
            </button>
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
            <div>說說為什麼想推薦，幫助夥伴快速瞭解這本書(30字內)</div>
            <textarea
              value={submitValue}
              onChange={(e) => {
                setSubmitValue(e.target.value);
              }}
            />
            <button onClick={handleRec}>送出推薦</button>
          </InputWrapper>
        </PageShield>
      )}
    </>
  );
};

export default SearchBook;

const ContentText = styled.div`
  width: 70%;
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
  border-radius: 3px;
  min-height: 150px;
  /* padding: 0px 0px 20px; */
  padding: 2rem;
  max-height: calc(100vh - 240px);
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const SearchBookInput = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  align-items: center;
`;