import React from "react";
// import * as firebase from "../utils/firebase";
import { useState } from "react";
import ApplicationMsg from "./ApplicationMsg";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 0px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-right: 120px;
  width: 668px;
  outline: none;
`;

const MainCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 300px;
  min-height: 500px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: rgb(255, 255, 255);
  padding: 10px;
`;

const Sider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: rgb(255 234 182);

  padding: 10px;
`;

export const InputStyled = styled.input`
  margin-bottom: 10px;
  height: 38px;
  padding: 0px 14px;
  border-radius: 4px;
  border: #dcdee1 1px solid;
  width: auto;
`;

const ApplicationPopup = ({
  user,
  groupData,
  applicationData,
  userList,
  setShowApplication,
  appliedData,
}) => {
  return (
    <Container>
      <Sider>
        <h2>一起 走得更遠</h2>
        <h4>Sign in to continue to your account.</h4>
      </Sider>
      <MainCtn>
        <ApplicationMsg
          appliedData={appliedData}
          setShowApplication={setShowApplication}
          user={user}
          groupData={groupData}
          applicationData={applicationData}
          userList={userList}
        />
      </MainCtn>
    </Container>
  );
};

export default ApplicationPopup;
