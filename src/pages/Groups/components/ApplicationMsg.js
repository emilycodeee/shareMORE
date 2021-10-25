import React, { useState } from "react";
import styled from "styled-components";
import * as firebase from "../../../utils/firebase";
import ApplicationList from "./ApplicationList";
import { useLocation, useHistory } from "react-router-dom";
const SendApplication = styled.div`
  display: flex;
  flex-direction: column;
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin-right: 10px;
`;

const Header = styled.div`
  display: flex;

  /* flex-direction: column; */
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

const ApplicationMsg = ({
  user,
  groupData,
  applicationData,
  userList,
  setShowApplication,
  appliedData,
}) => {
  const [value, setValue] = useState("");
  const pathname = useLocation().pathname;
  const history = useHistory();
  // console.log(user);
  // console.log(groupData);

  const handleSubmit = () => {
    const data = {
      content: value,
      creationTime: new Date(),
      approve: false,
      applicantID: user.uid,
      applicantionID: user.uid,
    };
    const response = firebase.SendApplication(
      groupData.groupID,
      data,
      user.uid
    );
    response.then((res) => {
      console.log(res);
      setShowApplication(false);
      alert("送出成功，請等候申請");
      window.location.reload();
    });
  };
  // const role = "visitor";
  console.log(value);
  if (groupData.creatorID !== user.uid) {
    if (appliedData) {
      return (
        <>
          <div>加入申請已送出，請耐心等候</div>
          <div>
            {`申請日:${appliedData.creationTime
              .toDate()
              .toLocaleString("zh-TW")}`}
          </div>
          <div>申請內容：</div>
          <div>{appliedData.content}</div>
        </>
      );
    }
    return (
      <SendApplication>
        <div>請寫下你想加入的原因？</div>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="送出後不可修改"
        />
        <button onClick={handleSubmit}>確認送出</button>
      </SendApplication>
    );
  }

  if (groupData.creatorID === user.uid) {
    return (
      <>
        {applicationData.data.map((item) => {
          return (
            <ApplicationList
              applicant={item}
              key={item.applicantID}
              applicationData={applicationData}
              userList={userList}
              user={user}
              groupData={groupData}
            />
          );
        })}
      </>
    );
  }
};

export default ApplicationMsg;
