import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import deleteIcon from "../../../sources/delete.png";
import { deleteMilestoneComment } from "../../../utils/firebase";

const CommentReply = ({ item, author }) => {
  const usersList = useSelector((state) => state.usersList);
  const userData = useSelector((state) => state.userData);
  const currentUserData = usersList.find((p) => p.uid === item.creatorID);

  const checkOwner = item.creatorID === userData.uid;
  const checkAuthor = author.uid === userData.uid;
  const handleDeleteComment = () => {
    const check = window.confirm("刪除留言將不可回復，確定要刪除嗎？");
    check && deleteMilestoneComment("articles", item.milestoneID, item.postID);
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
          <div>{item.content}</div>
        </Content>
        {(checkOwner || checkAuthor) && (
          <DelBtn onClick={handleDeleteComment}>
            <IconImg src={deleteIcon} />
          </DelBtn>
        )}
      </CommentCtn>
    </Wrapper>
  );
};

export default CommentReply;

const CommentCtn = styled.div`
  display: flex;
  width: 90%;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid rgb(203, 195, 194);
  gap: 10px;
`;

const PostAvatar = styled.img`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  div {
    font-weight: 600;
    &:last-child {
      font-weight: 500;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DelBtn = styled.button`
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
  justify-content: center;
`;
