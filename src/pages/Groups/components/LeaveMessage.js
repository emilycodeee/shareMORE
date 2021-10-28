import React from "react";
import styled from "styled-components";

const CommentWrapper = styled.div`
  /* padding: 10px; */
  /* margin: 0 auto; */
  /* width: 80%; */
  /* margin-left: 3rem; */
  /* margin: 0.5rem; */
  background-color: #f5f5f5;
  width: 80%;
  /* border: 1px solid black; */
  border-radius: 10px;
  padding: 5px 10px;
  margin-bottom: 10px;
`;

const AvatorStyled = styled.img`
  border-radius: 50%;
  height: 30px;
  margin-right: 10px;
`;

const UserDetail = styled.div`
  /* height: 30px; */
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

const Wrapper = styled.div`
  /* width: 80%; */
  display: flex;
  align-items: center;
  justify-content: end;
  /* border: 3px solid red; */
`;

const LeaveMessage = ({ itemData, userList }) => {
  const sender = userList.find((each) => each.userID === itemData.creatorID);

  return (
    <Wrapper>
      <AvatorStyled src={sender.avatar} />
      <CommentWrapper>
        <UserWrapper>
          <UserDetail>
            <div>{sender.displayName}</div>
            <div>{itemData.creationTime?.toDate().toLocaleString("zh-TW")}</div>
          </UserDetail>
        </UserWrapper>
        <div>{itemData.content}</div>
      </CommentWrapper>
    </Wrapper>
  );
};

export default LeaveMessage;
