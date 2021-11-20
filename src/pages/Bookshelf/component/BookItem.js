import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import * as firebase from "../../../utils/firebase";
import { useSelector } from "react-redux";
import { BiX } from "react-icons/bi";

const BookItem = ({ book, setShowBookContent, setBookContent, groupID }) => {
  const userData = useSelector((state) => state.userData);

  const usersList = useSelector((state) => state.usersList);
  const groupsList = useSelector((state) => state.groupsList);
  const [isOwner, setIsOwner] = useState(null);
  const [isRecommender, setIsRecommender] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (groupsList.length > 0) {
      const groupDetail = groupsList.find((g) => g.groupID === groupID);

      const checkMembership =
        groupDetail?.membersList?.includes(userData?.uid) ||
        groupDetail?.creatorID === userData?.uid;
      //  setIsInsider(checkMembership);

      const groupOwner = groupDetail?.creatorID === userData?.uid;
      const checkRecommender = book.groupSharerUid === userData?.uid;

      setIsOwner(groupOwner);
      setIsRecommender(checkRecommender);
    }
  }, [groupsList]);

  const handleDeleteBook = (e) => {
    const targetID = e.target.dataset.bookid;
    if (targetID) {
      Swal.fire({
        title: "確定要刪除嗎?",
        text: "刪除將不可恢復，請再次確認是否刪除！",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          firebase.deleteBook(e.target.dataset.bookid);
          Swal.fire("Deleted!", "書本已經刪除囉！", "success");
        }
      });
    }
  };

  const getRecommender = (uid) => {
    const currentUserDetail = usersList.find((p) => p.uid === uid);
    return currentUserDetail;
  };

  const defaultBook =
    "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2FbookDefault.jpg?alt=media&token=11e30ec0-04a8-4ce5-8a35-37fbb5c1a99b";

  return (
    <Wrapper
      onMouseOver={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      {isOwner && showDelete && (
        <DeleteIcon onClick={handleDeleteBook} data-bookid={book.groupBookID} />
      )}

      {isRecommender && showDelete && (
        <DeleteIcon onClick={handleDeleteBook} data-bookid={book.groupBookID} />
      )}

      <SelectedBook
        key={book.groupBookID}
        onClick={() => {
          setShowBookContent(true);
          setBookContent(book);
        }}
      >
        <div>
          <BookImage
            src={book.volumeInfo.imageLinks?.thumbnail || defaultBook}
          />
        </div>
        <div>
          <div>
            <BookTitle>{book.volumeInfo.title}</BookTitle>
            <BookAuthor>
              作者/譯者：{book.volumeInfo.authors?.join(",")}
            </BookAuthor>
          </div>
        </div>
      </SelectedBook>
      <div>
        <RecommenderDetail>
          <Avatar src={getRecommender(book.groupSharerUid)?.avatar} />
          <p>{getRecommender(book.groupSharerUid)?.displayName} 說：</p>
        </RecommenderDetail>
        <RecommendText>{book.recReason}</RecommendText>
      </div>
    </Wrapper>
  );
};

export default BookItem;

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
`;
