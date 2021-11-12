import React from "react";
// import * as firebase from "../utils/firebase";
import { useState } from "react";
import ApplicationMsg from "./ApplicationMsg";

import styled from "styled-components";

const Container = styled.div`
  max-width: 1560px;
  width: 60%;
  display: flex;
  justify-content: center;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-right: 120px;
  outline: none;
  z-index: 99;
  border-radius: 10px;
  min-height: 150px;
  /* padding: 5px 0; */
  @media only screen and (max-width: 992px) {
    flex-direction: column;
    /* border-radius: 0; */
  }
  @media only screen and (max-width: 500px) {
    width: 80%;
  }
`;

const MainCtn = styled.div`
  width: 60%;
  /* height: 50vh; */
  display: flex;
  flex-direction: column;
  border: #dcdee1 1px solid;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: rgb(255, 255, 255);
  padding: 50px;
  /* width: auto; */
  @media only screen and (max-width: 992px) {
    width: 100%;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 10px;
    /* border-top: 4px solid #f27e59; */
  }
`;

const Sider = styled.div`
  padding: 0 1rem;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #f27e59;
  gap: 1rem;
  padding: 1rem;
  @media only screen and (max-width: 992px) {
    padding: 0.5rem;
    width: 100%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 0;

    gap: 0.5rem;
    /* display: none; */
  }
`;

const InputStyled = styled.input`
  margin-bottom: 10px;
  height: 38px;
  /* padding: 0px 14px; */
  border-radius: 4px;
  border: #dcdee1 1px solid;
  width: auto;
`;

const ApplicationPopup = ({ groupData, applicationData, appliedData }) => {
  return (
    <Container>
      <Sider>
        <Slogan>一起 走得更遠</Slogan>
        <Slogan>TOGETHER</Slogan>
        <Slogan>WE ARE STRONGER.</Slogan>
      </Sider>
      <MainCtn>
        <ApplicationMsg
          appliedData={appliedData}
          groupData={groupData}
          applicationData={applicationData}
        />
      </MainCtn>
    </Container>
  );
};

export default ApplicationPopup;

const Slogan = styled.h2`
  margin: 0;
  /* margin-bottom: 1rem; */
  color: #ffffff;
  @media only screen and (max-width: 992px) {
    margin: 0 auto;
    /* margin-bottom: 0.5rem; */
    flex-direction: column;
    font-size: 1rem;
    /* border-radius: 0; */
  }
`;
