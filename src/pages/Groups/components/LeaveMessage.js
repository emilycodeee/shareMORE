import React from "react";
import styled from "styled-components";

const CommentWrapper = styled.div`
  padding: 0 20px;
  margin-bottom: 10px;
`;

const AvatorStyled = styled.img`
  border-radius: 50%;
  height: 30px;
  margin-right: 10px;
`;

const UserDetail = styled.div`
  height: 30px;
  display: flex;
  margin-right: 30px;
  /* flex-direction: column; */
  flex-grow: 1;
`;

const UserWrapper = styled.div`
  display: flex;
  /* justify-content: space-between; */
  margin-bottom: 10px;
`;

const LeaveMessage = ({ itemData, userList }) => {
  const sender = userList.find((each) => each.userID === itemData.creatorID);
  console.log(sender);
  return (
    <CommentWrapper>
      <UserWrapper>
        <AvatorStyled src={sender.avatar} />
        <UserDetail>
          <div>{sender.displayName}</div>
          <div>{itemData.creationTime?.toDate().toLocaleString("zh-TW")}</div>
        </UserDetail>
      </UserWrapper>
      <div>{itemData.content}</div>
    </CommentWrapper>
  );
};

export default LeaveMessage;
