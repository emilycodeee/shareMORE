import React from "react";
import styled from "styled-components";
import * as firebase from "../../../utils/firebase";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { successAlert } from "../../../utils/alert";

const ApplicationList = ({ groupData, applicationData, applicant }) => {
  const usersList = useSelector((state) => state.usersList);
  const currentUser = usersList.find(
    (each) => each.uid === applicant.applicantID
  );

  const handleConfirm = () => {
    const data = {
      memberID: currentUser.uid,
      applicationContent: applicant.content,
      joinTime: new Date(),
      membersDocID: currentUser.uid,
    };

    firebase
      .confirmApplication(
        applicationData.applicantionID,
        groupData.groupID,
        data
      )
      .then(() => {
        firebase
          .sendGroupNotification(groupData.groupID, currentUser.uid)
          .then(() => {
            successAlert("確認完成");
          })
          .catch((err) => console.log(err));
      });
  };

  const handleReject = () => {
    firebase
      .rejectApplication(groupData.groupID, applicationData.applicantionID)
      .then(() => {
        successAlert("拒絕申請並不會通知申請人");
      });
  };

  return (
    <RecApplication>
      <Header>
        <Link to={`/profile/${currentUser?.uid}`}>
          <Avatar src={currentUser?.avatar} />
        </Link>
        <UserWrapper>
          <NameStyle NameStyle>{currentUser?.displayName}</NameStyle>
          <TimeStyle>
            {applicant?.creationTime.toDate().toLocaleString("zh-TW")}
          </TimeStyle>
        </UserWrapper>
      </Header>

      <AppliBody>
        <Content>{applicant?.content}</Content>
        <ButtonWrapper>
          <ButtonStyle onClick={handleConfirm}>確認</ButtonStyle>
          <ButtonStyle onClick={handleReject}>拒絕</ButtonStyle>
        </ButtonWrapper>
      </AppliBody>
    </RecApplication>
  );
};

export default ApplicationList;

const RecApplication = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #d1cbcb;
  border-radius: 4px;
`;

const Header = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin-right: 10px;
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NameStyle = styled.div`
  font-weight: 600;
`;

const TimeStyle = styled.div`
  font-size: 0.8rem;
`;

const AppliBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
`;

const ButtonStyle = styled.button`
  align-self: flex-end;
  cursor: pointer;
  width: 60px;
  height: 30px;
  background-color: transparent;
  font-weight: 600;
  outline: none;
  border: 1px solid #f27e59;
  border-radius: 3px;
  color: #f27e59;
  font-size: 10px;

  &:hover {
    background-color: #f27e59;
    color: white;
  }
`;

const Content = styled.div`
  margin: 10px;
  overflow: overflow-x;
`;
