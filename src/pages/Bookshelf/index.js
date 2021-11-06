import React from "react";
import styled, { keyframes } from "styled-components";
import bookshelf from "../../sources/bookshelf.jpg";
import { GiNotebook } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import SearchBook from "./component/SearchBook";
import * as firebase from "../../utils/firebase";
import BookContent from "./component/BookContnet";
import { JumpCircleLoading } from "react-loadingg";

const Wrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  justify-content: center;
`;

const typing = keyframes`
	from { width: 0 }
`;

const caret = keyframes`
	50% { border-right-color: transparent; }
`;

const Run = styled.h1`
  font: bold 200% Consolas, Monaco, monospace;
  /* 	width: 8.25em; */
  width: 34rem;
  white-space: nowrap;
  overflow: hidden;
  border-right: 0.05em solid;
  color: white;
  animation: ${typing} 6s steps(15) infinite, ${caret} 1s steps(1) infinite;
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

const TopCover = styled.div`
  opacity: 0.8;
  margin-bottom: 0.8rem;
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 2px 5px grey;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const BookItem = styled.div`
  position: relative;
`;

const DeleteIcon = styled(AiOutlineClose)`
  position: absolute;
  top: -20px;
  right: 0;
  cursor: pointer;
  height: 1.3rem;
  width: 1.3rem;
`;

const SerchButton = styled.button`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const Bookshelf = () => {
  const { groupID } = useParams();
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [bookContent, setBookContent] = useState({});
  const [showBookContent, setShowBookContent] = useState(false);
  const [renderBookData, setRenderBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [groupDetail, setGroupDetail] = useState({});

  const [isInsider, setIsInsider] = useState(null);
  const [isOwner, setIsOwner] = useState(null);

  const userData = useSelector((state) => state.userData);
  const groupsList = useSelector((state) => state.groupsList);
  const usersList = useSelector((state) => state.usersList);

  const handleDeleteBook = (e) => {
    const targetID = e.target.dataset.bookid;
    if (targetID) {
      const check = window.confirm("刪除不可恢復，請再次確認是否刪除");
      if (check) {
        firebase.deleteBook(e.target.dataset.bookid);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const groupDetail = groupsList.find((g) => g.groupID === groupID);

      const checkMembership =
        groupDetail?.membersList?.includes(userData?.uid) ||
        groupDetail?.creatorID === userData?.uid;
      setIsInsider(checkMembership);

      const groupOwner = groupDetail?.creatorID === userData?.uid;
      setIsOwner(groupOwner);
    }
    return () => {
      isMounted = false;
    };
  }, [groupsList]);

  // console.log(groupDetail);
  // console.log(currentUserDetail);

  const getRecommender = (uid) => {
    let isMounted = true;
    if (isMounted) {
      const currentUserDetail = usersList.find((p) => p.uid === uid);
      return currentUserDetail;
    }
    return () => {
      isMounted = false;
    };
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      firebase.getGroupBook(groupID, setRenderBookData);
      setIsLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      firebase.getGroupBook(groupID, setRenderBookData);
      setIsLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Wrapper>
      <TopCover style={{ backgroundImage: `url(${bookshelf})` }}>
        <Run>找書更方便！一起建立社群書櫃！</Run>
      </TopCover>
      {isLoading && <JumpCircleLoading />}
      {isInsider && (
        <SerchButton
          onClick={() => {
            setShowSearchPage(true);
          }}
        >
          推薦選書
          <GiNotebook />
        </SerchButton>
      )}

      {showSearchPage && (
        <PageShield
          data-target="shield"
          onClick={(e) => {
            e.target.dataset.target === "shield" &&
              setShowSearchPage(!showSearchPage);
          }}
        >
          <SearchBook />
        </PageShield>
      )}
      {renderBookData.length === 0 && <div>社群書櫃目前還空空的</div>}

      <ShelfWrapper>
        {renderBookData.map((b) => {
          return (
            <BookItem key={b.groupBookID}>
              {isOwner && (
                <DeleteIcon
                  onClick={handleDeleteBook}
                  data-bookid={b.groupBookID}
                />
              )}
              <SelectedBook
                key={b.groupBookID}
                onClick={() => {
                  setShowBookContent(true);
                  setBookContent(b);
                }}
              >
                <div>
                  <BookImage src={b.volumeInfo.imageLinks.thumbnail} />
                </div>
                <div>
                  <div>
                    <BookTitle>{b.volumeInfo.title}</BookTitle>
                    <BookAuthor>
                      作者/譯者：{b.volumeInfo.authors?.join(",")}
                    </BookAuthor>
                  </div>
                </div>
              </SelectedBook>
              <div>
                <RecommenderDetail>
                  <Avatar src={getRecommender(b.groupSharerUid)?.avatar} />
                  <p>{getRecommender(b.groupSharerUid)?.displayName} 說：</p>
                </RecommenderDetail>
                <RecommendText>{b.recReason}</RecommendText>
              </div>
            </BookItem>
          );
        })}
      </ShelfWrapper>

      {showBookContent && (
        <PageShield
          data-target="shield-content"
          onClick={(e) => {
            e.target.dataset.target === "shield-content" &&
              setShowBookContent(!showBookContent);
          }}
        >
          <BookContent
            bookContent={bookContent}
            setShowBookContent={setShowBookContent}
          />
        </PageShield>
      )}
    </Wrapper>
  );
};

export default Bookshelf;

const SelectedBook = styled.div`
  cursor: pointer;
`;

const BookAuthor = styled.div`
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

const BookTitle = styled.div`
  margin-top: 0.7rem;
  font-weight: 550;
`;

const RecommendText = styled.div`
  margin-top: 0.5rem;
  text-align: start;
  background-color: #f1eded;
  padding: 0.5rem;
  border-radius: 3px;
`;

const RecommenderDetail = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

const Avatar = styled.img`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  align-self: flex-start;
  margin-right: 0.5rem;
`;

const ShelfWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  text-align: center;
  padding: 10px;
`;

const BookImage = styled.img`
  box-shadow: rgb(0 0 0 / 16%) 0px 5px 11px 0px;
  height: 200px;
  /* margin-right: 2rem; */
`;