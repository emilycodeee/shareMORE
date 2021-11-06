import React, { useState } from "react";
import styled from "styled-components";
import * as firebase from "../../../utils/firebase";
import ApplicationList from "./ApplicationList";
import { useSelector } from "react-redux";
const SendApplication = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 550;
`;

const TextCtn = styled.textarea`
  /* resize: none; */
  border-radius: 10px;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  outline: none;
  color: black;
`;

const ContentStyled = styled.div`
  font-weight: 550;
  margin-bottom: 1rem;
`;

const ApplicationStyled = styled.div`
  margin: 0 10px 0 0;
  background-color: #f2f2f2;
  height: auto;
  padding: 10px;
  border-radius: 10px;
  overflow: overflow-x;
`;

const ApplicationMsg = ({ groupData, applicationData, appliedData }) => {
  console.log("🎉applicationData", applicationData);
  console.log("🎍appliedData", appliedData);
  const [value, setValue] = useState("");
  const userData = useSelector((state) => state.userData);
  const groupsList = useSelector((state) => state.groupsList);
  const handleSubmit = () => {
    const data = {
      content: value,
      creationTime: new Date(),
      approve: false,
      applicantID: userData.uid,
      applicantionID: userData.uid,
    };
    const response = firebase.SendApplication(
      groupData.groupID,
      data,
      userData.uid
    );
    response.then((res) => {
      alert("送出成功，請等候社長審核");
    });
  };

  if (groupData?.creatorID !== userData.uid) {
    if (appliedData) {
      return (
        <>
          <ContentStyled>加入申請已送出，請耐心等候</ContentStyled>
          <ContentStyled>
            {`申請時間：${appliedData.creationTime
              .toDate()
              .toLocaleString("zh-TW")}`}
          </ContentStyled>
          <ContentStyled>申請內容：</ContentStyled>
          <ApplicationStyled>{appliedData.content}</ApplicationStyled>
        </>
      );
    }
    return (
      <SendApplication>
        <Label>請寫下你想加入的原因？</Label>
        <TextCtn
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="送出後不可修改"
        />
        <Button onClick={handleSubmit}>確認送出</Button>
      </SendApplication>
    );
  }

  if (
    groupData.creatorID === userData.uid &&
    applicationData.data.length === 0
  ) {
    return <div>社群申請已審核完畢</div>;
  } else if (groupData.creatorID === userData.uid) {
    return (
      <>
        {applicationData.data.map((item) => {
          return (
            <ApplicationList
              applicant={item}
              key={item.applicantID}
              applicationData={item}
              groupData={groupData}
            />
          );
        })}
      </>
    );
  }
};

export default ApplicationMsg;
