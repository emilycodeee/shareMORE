import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const CommentCtn = styled.div`
  background-color: red;
  display: flex;
  justify-content: center;
  /* height: 30px; */
`;

const PostAvatar = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
`;

const CommentReply = ({ item }) => {
  const usersList = useSelector((state) => state.usersList);
  const userData = useSelector((state) => state.userData);
  const currentUserData = usersList.find((p) => p.uid === userData.uid);
  return (
    <CommentCtn>
      <PostAvatar src={currentUserData.avatar} />
      <div>{currentUserData.displayName}</div>
      <div>{item.creationTime?.toDate().toLocaleString("zh-TW")}</div>
      <div>{item.content}</div>
    </CommentCtn>
  );
};

export default CommentReply;
