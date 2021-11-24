import React from "react";
import * as firebase from "../../../utils/firebase";
import Swal from "sweetalert2";
import { deleteAlert } from "../../../utils/alert";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
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
} from "../style/BookItem.style.jsx";

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
      const groupOwner = groupDetail?.creatorID === userData?.uid;
      const checkRecommender = book.groupSharerUid === userData?.uid;

      setIsOwner(groupOwner);
      setIsRecommender(checkRecommender);
    }
  }, [groupsList]);

  const handleDeleteBook = (e) => {
    const targetID = e.target.dataset.bookid;
    if (targetID) {
      const firebaseDelete = () => {
        firebase.deleteBook(e.target.dataset.bookid);
      };
      deleteAlert(firebaseDelete, "書本已經刪除囉！");
    }
  };

  const getRecommender = (uid) => {
    const currentUserDetail = usersList.find((p) => p.uid === uid);
    return currentUserDetail;
  };

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
          <BookImage src={book.mainCover} />
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
        <RecommendText>
          <ShowMoreTextStyle
            lines={3}
            more="Show more"
            less="Show less"
            expanded={false}
            width={550}
            truncatedEndingComponent={"... "}
          >
            {book.recReason}
          </ShowMoreTextStyle>
        </RecommendText>
      </div>
    </Wrapper>
  );
};

export default BookItem;
