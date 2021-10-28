import React from "react";
import styled from "styled-components";
import * as firebase from "../../../utils/firebase";

const RecApplication = styled.div`
  display: flex;
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

const ApplicationList = ({
  user,
  groupData,
  applicationData,
  userList,
  applicant,
}) => {
  const currentUser = userList.find(
    (each) => each.userID === applicant.applicantID
  );

  console.log(currentUser);
  console.log(applicant);

  const handleConfirm = () => {
    const data = {
      memberID: currentUser.userID,
      applicationContent: applicant.content,
      joinTime: new Date(),
      membersDocID: currentUser.userID,
    };

    // console.log(applicationData);

    firebase
      .confirmApplication(
        applicationData.applicantionID,
        groupData.groupID,
        // applicationData.applicantionID,
        data
      )
      .then(() => {
        alert("確認完成");
        // window.location.reload();
      });
  };

  const handleReject = () => {
    // console.log(applicationData.data[0].applicantionID);
    firebase
      .rejectApplication(groupData.groupID, applicationData.applicantionID)
      .then(() => {
        alert("拒絕申請並不會通知申請人");
      });
  };

  return (
    <RecApplication>
      <div>
        <Header>
          <Avatar src={currentUser.avatar} />
          <UserWrapper>
            <div>{currentUser.displayName}</div>
            <div>
              {`申請日:${applicant.creationTime
                .toDate()
                .toLocaleString("zh-TW")}`}
            </div>
          </UserWrapper>
        </Header>
        <div>{applicant.content}</div>
      </div>
      <ButtonWrapper>
        <Button onClick={handleConfirm}>確認</Button>
        <Button onClick={handleReject}>拒絕</Button>
      </ButtonWrapper>
    </RecApplication>
  );
};

export default ApplicationList;
