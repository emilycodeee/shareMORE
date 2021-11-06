import React from "react";
import styled from "styled-components";
import * as firebase from "../../../utils/firebase";
import { useSelector, useDispatch } from "react-redux";
import { getGroupsList } from "../../../redux/actions";
import { Link } from "react-router-dom";

const RecApplication = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: red; */
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #d1cbcb;
  border-radius: 25px;
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin-right: 10px;
`;

const Header = styled.div`
  display: flex;
`;
const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const Button = styled.button`
  color: #3722d3;
  font-size: 18px;
  background: none;
  font-weight: 600;
  border-style: none;
  margin-bottom: 16px;
  cursor: pointer;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  margin: 10px;
  overflow: overflow-x;
`;

const ApplicationList = ({ groupData, applicationData, applicant }) => {
  const d = useDispatch();
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
          .getTotalDocList("groups")
          .then((res) => d(getGroupsList(res)))
          .catch((err) => console.log(err));
        alert("確認完成");
      });
  };

  const handleReject = () => {
    firebase
      .rejectApplication(groupData.groupID, applicationData.applicantionID)
      .then(() => {
        alert("拒絕申請並不會通知申請人");
      });
  };

  return (
    <RecApplication>
      <Header>
        <Link to={`/profile/${currentUser?.uid}`}>
          <Avatar src={currentUser?.avatar} />
        </Link>
        <UserWrapper>
          <div>{currentUser?.displayName}</div>
          <div>{applicant?.creationTime.toDate().toLocaleString("zh-TW")}</div>
        </UserWrapper>
      </Header>

      <Body>
        <Content>{applicant?.content}</Content>
        <ButtonWrapper>
          <Button onClick={handleConfirm}>確認</Button>
          <Button onClick={handleReject}>拒絕</Button>
        </ButtonWrapper>
      </Body>
    </RecApplication>
  );
};

export default ApplicationList;
