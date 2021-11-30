import React from "react";
import { setGroupBook } from "../../../utils/firebase";
import HtmlParser from "react-html-parser";
import { useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { JumpCircleLoading } from "react-loadingg";
import { successAlert } from "../../../utils/alert";
import {
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
  LinkIcon,
  RevertIcon,
  BookIcon,
  AdvancedIcon,
  SearchBookContainer,
} from "../style/SearchBook.style";

const SearchBook = () => {
  const { groupID } = useParams();
  const userData = useSelector((state) => state.userData);
  const [showBookContent, setShowBookContent] = useState(false);
  const [showSubmitDialogue, setShowSubmitDialogue] = useState(false);
  const [submitValue, setSubmitValue] = useState("");
  const [value, setValue] = useState("");
  const [content, setContent] = useState([]);
  const [bookContent, setBookContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const submit = () => {
    setIsLoading(true);
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${value}&maxResults=40`
    )
      .then((res) => res.json())
      .then((data) => {
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
          setContent(data.items);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleRec = (e) => {
    const data = {
      ...bookContent,
      mainCover: `https://books.google.com/books/publisher/content/images/frontcover/${bookContent.id}?fife=w400-h600`,
      recReason: submitValue,
      groupID,
      applyStatus: true,
      groupSharerUid: userData.uid,
      shareDate: new Date(),
    };
    setShowSubmitDialogue(false);
    setGroupBook(data).then(() => {
      setSubmitValue("");
      successAlert("書本已經存入書櫃囉");
    });
  };

  return (
    <>
      <Wrapper>
        {!showBookContent && (
          <>
            <SearchBookContainer>
              <SearchInput
                value={value}
                onKeyPress={handleSearch}
                onChange={(e) => setValue(e.target.value)}
                placeholder="書名、作者、ISBN..."
              />
              <AdvancedIcon onClick={submit} />
            </SearchBookContainer>
            {isLoading && <JumpCircleLoading />}
            <ResultWrapper>
              {content?.length > 1 &&
                content?.map((b, i) => {
                  return (
                    <ResultBookCtn
                      key={i}
                      onClick={() => {
                        setIsLoading(true);
                        setShowBookContent(true);
                        fetch(
                          `https://www.googleapis.com/books/v1/volumes/${b.id}`
                        )
                          .then((res) => res.json())
                          .then((data) => {
                            setBookContent(data);
                            setIsLoading(false);
                          });
                      }}
                    >
                      <ImgDe
                        src={`https://books.google.com/books/publisher/content/images/frontcover/${b.id}?fife=w400-h600`}
                      />
                      <Title>{b.volumeInfo.title}</Title>
                      <Author>作者：{b.volumeInfo.authors}</Author>
                    </ResultBookCtn>
                  );
                })}
            </ResultWrapper>
          </>
        )}

        {showBookContent &&
          (isLoading ? (
            <JumpCircleLoading />
          ) : (
            <BookWrapper>
              <BookDetail>
                <div>
                  <BookImage
                    src={`https://books.google.com/books/publisher/content/images/frontcover/${bookContent.id}?fife=w400-h600`}
                  />
                </div>
                <div>
                  <div>
                    <Titlestyle>{bookContent.volumeInfo?.title}</Titlestyle>
                    <Pstyle>
                      作者/譯者：{bookContent.volumeInfo?.authors?.join(",")}
                    </Pstyle>
                    <Pstyle>出版社：{bookContent.volumeInfo?.publisher}</Pstyle>
                    <Pstyle>
                      出版日期：{bookContent.volumeInfo?.publishedDate}
                    </Pstyle>
                  </div>
                  <ActionIcon>
                    <a
                      href={bookContent.volumeInfo?.previewLink}
                      target="_blank"
                    >
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
                {HtmlParser(bookContent.volumeInfo?.description)}
              </ContentText>
              <RevertIcon
                onClick={() => {
                  setShowBookContent(false);
                  setSubmitValue("");
                  setBookContent({});
                }}
              />
            </BookWrapper>
          ))}
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
