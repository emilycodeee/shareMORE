import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
const CommentWrapper = styled.div`
  background-color: #f5f5f5;
  width: 80%;
  border-radius: 10px;
  padding: 1rem 1rem;
  margin-bottom: 10px;
`;

const AvatorStyled = styled.img`
  border-radius: 50%;
  height: 30px;
  margin-right: 10px;
`;

const UserDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  flex-grow: 1;
`;

const UserWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding-bottom: 0.5rem;
`;

const UserText = styled.div`
  font-size: 14px;
`;

const LeaveMessage = ({ itemData }) => {
  const usersList = useSelector((state) => state.usersList);

  const sender = usersList.find((each) => each.uid === itemData.creatorID);

  return (
    <Wrapper>
      <AvatorStyled src={sender.avatar} />
      <CommentWrapper>
        <UserWrapper>
          <UserDetail>
            <UserText>{sender.displayName}</UserText>
            <UserText>
              {itemData.creationTime?.toDate().toLocaleString("zh-TW")}
            </UserText>
          </UserDetail>
        </UserWrapper>
        <div>{itemData.content}</div>
      </CommentWrapper>
    </Wrapper>
  );
};

export default LeaveMessage;
