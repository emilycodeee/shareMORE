import React from "react";
import styled, { keyframes } from "styled-components";

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import SearchBook from "./component/SearchBook";
import * as firebase from "../../utils/firebase";
import BookContent from "./component/BookContnet";
import GroupHeader from "../Groups/components/GroupHeader";
import { BiX } from "react-icons/bi";
import { JumpCircleLoading } from "react-loadingg";
import { BsBookHalf } from "react-icons/bs";

const Wrapper = styled.div`
  border-radius: 4px;
  max-width: 1560px;
  width: 80%;
  /* padding: 0 3rem; */
  margin: 0 auto;
  margin-bottom: 1.5rem;
  display: flex;
  background-color: #fff;
  padding: 1rem 0;
  flex-direction: column;
  /* @media only screen and (max-width: 992px) {
    flex-direction: column;
  } */
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

const SerchButton = styled.button`
  border-radius: 4px;
  list-style: none;
  font-weight: 600;
  font-size: 1rem;
  height: auto;
  text-decoration: none;
  cursor: pointer;
  color: #f27e59;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
  border: none;
  padding: 0.6rem;
  cursor: pointer;
  border: 1px solid #f27e59;
  background-color: transparent;
  &:hover {
    background-color: #f27e59;
    color: #fff;
  }
`;

const Bookshelf = () => {
  const { groupID } = useParams();
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [bookContent, setBookContent] = useState({});
  const [showBookContent, setShowBookContent] = useState(false);
  const [renderBookData, setRenderBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [groupDetail, setGroupDetail] = useState({});
  const [showDelete, setShowDelete] = useState(false);
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
    const groupDetail = groupsList.find((g) => g.groupID === groupID);

    const checkMembership =
      groupDetail?.membersList?.includes(userData?.uid) ||
      groupDetail?.creatorID === userData?.uid;
    setIsInsider(checkMembership);

    const groupOwner = groupDetail?.creatorID === userData?.uid;
    setIsOwner(groupOwner);
  }, [groupsList]);

  const getRecommender = (uid) => {
    const currentUserDetail = usersList.find((p) => p.uid === uid);
    return currentUserDetail;
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

  const defaultBook =
    "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2FbookDefault.jpg?alt=media&token=11e30ec0-04a8-4ce5-8a35-37fbb5c1a99b";

  return (
    <>
      <GroupHeader tag="bookShelf" />
      <Wrapper>
        {/* <TopCover style={{ backgroundImage: `url(${bookshelf})` }}>
          <Run>找書更方便！一起建立社團書櫃！</Run>
        </TopCover> */}
        {isLoading && <JumpCircleLoading />}
        {isInsider && (
          <SerchButton
            onClick={() => {
              setShowSearchPage(true);
            }}
          >
            推薦選書
            <BsBookHalf />
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
        {renderBookData.length === 0 && (
          <>
            <Empty>
              <div>目前書櫃空空的，一起建立我們的社團書櫃！</div>
              <lottie-player
                src="https://assets5.lottiefiles.com/packages/lf20_tnrzlN.json"
                background="transparent"
                speed="1"
                style={{ maxWidth: "300px", maxHeight: "300px" }}
                loop
                autoplay
              />
            </Empty>
            {/* <div>社群書櫃目前還空空的</div> */}
            {/* <BookWelcome>紀錄書單更方便，一起建立我們的社團書櫃！</BookWelcome>
            <BookAnimation /> */}
            {/* <BookAnimation2 /> */}
          </>
        )}

        <ShelfWrapper>
          {renderBookData.map((b) => {
            return (
              <BookItem
                key={b.groupBookID}
                onMouseOver={() => setShowDelete(true)}
                onMouseLeave={() => setShowDelete(false)}
              >
                {isOwner && showDelete && (
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
                    <BookImage
                      src={b.volumeInfo.imageLinks?.thumbnail || defaultBook}
                    />
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
    </>
  );
};

export default Bookshelf;

const SelectedBook = styled.div`
  cursor: pointer;
`;

const BookWelcome = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  margin-top: 1rem;
  font-weight: 600;
  color: rgb(242, 126, 89);
  @media only screen and (max-width: 500px) {
    font-size: 0.8rem;
  }
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

const BookTitle = styled.div`
  font-size: 1rem;
  /* margin: 0.7rem 0; */
  font-weight: 550;
`;

const RecommendText = styled.div`
  line-height: 1.3rem;
  margin-top: 0.5rem;
  text-align: start;
  background-color: rgba(255, 244, 228);
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

const Empty = styled.div`
  /* background-color: red; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 1rem;
  div {
    margin-top: 1rem;
    font-weight: 600;
    color: rgb(242, 126, 89);
  }
  @media only screen and (max-width: 500px) {
    font-size: 0.8rem;
  }
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
  @media only screen and (max-width: 1024px) {
    width: 80%;
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const BookImage = styled.img`
  box-shadow: rgb(0 0 0 / 16%) 0px 5px 11px 0px;
  height: 200px;
  /* margin-right: 2rem; */
`;
