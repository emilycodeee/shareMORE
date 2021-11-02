import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import deleteIcon from "../../../sources/delete.png";
import * as firebase from "../../../utils/firebase";

const CommentCtn = styled.div`
  /* background-color: red; */
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin-left: 20%;
  margin-top: 8px;
  padding: 0.5rem 0 0.5rem 1rem;
  border-bottom: 1px solid rgb(203, 195, 194);
  /* border-radius: 3px; */
  /* height: 30px; */
`;

const PostAvatar = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  /* font-weight: 550; */
  font-size: 14px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: pink; */
  width: 100%;
`;

const ContentText = styled.div`
  margin: 0.5rem;
`;

const DelBtn = styled.button`
  /* background-color: #f5f5f5; */
  /* padding: 0.5rem; */
  /* font-size: 10px; */
  /* border: 1px solid rgb(203, 195, 194); */
  /* margin: 10px; */
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;

const IconImg = styled.img`
  width: 1rem;
  height: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
`;

const CommentReply = ({ item, author }) => {
  const usersList = useSelector((state) => state.usersList);
  const userData = useSelector((state) => state.userData);
  const currentUserData = usersList.find((p) => p.uid === item.creatorID);

  const checkOwner = item.creatorID === userData.uid;
  const checkAuthor = author.uid === userData.uid;
  console.log(author);
  const handleDeleteComment = () => {
    // item.postID
    const check = window.confirm("刪除留言將不可回復，確定要刪除嗎？");
    check &&
      firebase.deleteMilestoneComment(
        "articles",
        item.milestoneID,
        item.postID
      );
  };

  return (
    <Wrapper>
      <CommentCtn>
        <PostAvatar src={currentUserData.avatar} />
        <Content>
          <Head>
            <div>{currentUserData.displayName}</div>
            <div>{item.creationTime?.toDate().toLocaleString("zh-TW")}</div>
          </Head>
          <ContentText>{item.content}</ContentText>
        </Content>
      </CommentCtn>
      {(checkOwner || checkAuthor) && (
        <DelBtn onClick={handleDeleteComment}>
          <IconImg src={deleteIcon} />
          {/* 刪除 */}
        </DelBtn>
      )}
    </Wrapper>
  );
};

export default CommentReply;
