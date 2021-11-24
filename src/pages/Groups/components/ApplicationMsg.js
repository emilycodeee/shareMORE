import React, { useState } from "react";
import styled from "styled-components";
import * as firebase from "../../../utils/firebase";
import { useSelector } from "react-redux";
import ApplicationList from "./ApplicationList";
import { successAlert } from "../../../utils/alert";

const ApplicationMsg = ({ groupData, applicationData, appliedData }) => {
  const [value, setValue] = useState("");
  const userData = useSelector((state) => state.userData);
  const handleSubmit = () => {
    const data = {
      content: value,
      creationTime: new Date(),
      approve: false,
      applicantID: userData.uid,
      applicantionID: userData.uid,
    };
    firebase.SendApplication(groupData.groupID, data, userData.uid).then(() => {
      firebase.sendLeadNotification(groupData.groupID, groupData.creatorID);
      successAlert("送出成功，請等候社長審核");
    });
  };

  if (groupData?.creatorID !== userData.uid) {
    if (appliedData) {
      return (
        <SendApplication>
          <ContentStyled>加入申請已送出，請耐心等候</ContentStyled>
          <ContentStyled>
            {`申請時間：${appliedData.creationTime
              .toDate()
              .toLocaleString("zh-TW")}`}
          </ContentStyled>
          <ContentStyled>申請內容：</ContentStyled>
          <ApplicationStyled>{appliedData.content}</ApplicationStyled>
        </SendApplication>
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
    return <Empty>社群申請已審核完畢</Empty>;
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

const Empty = styled.div`
  font-weight: 600;
`;

const SendApplication = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 550;
  @media only screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;

const TextCtn = styled.textarea`
  border-radius: 4px;
  margin: 10px 0;
  padding: 10px;
  height: 20vh;
`;

const Button = styled.button`
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

const ContentStyled = styled.div`
  font-weight: 550;
  margin-bottom: 0.5rem;
`;

const ApplicationStyled = styled.div`
  background-color: rgba(255, 244, 228);
  padding: 10px;
  border-radius: 4px;
  overflow: overflow-x;
  box-shadow: 0px 2px 7px -3px rgb(132 131 126 / 20%);
`;
