import React from "react";
import ApplicationMsg from "./ApplicationMsg";
import styled from "styled-components";

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
  @media only screen and (max-width: 992px) {
    flex-direction: column;
  }
  @media only screen and (max-width: 500px) {
    width: 80%;
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
  }
`;

const Slogan = styled.h2`
  margin: 0;
  color: #ffffff;
  @media only screen and (max-width: 992px) {
    margin: 0 auto;
    flex-direction: column;
    font-size: 1rem;
  }
`;

const MainCtn = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  border: #dcdee1 1px solid;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: rgb(255, 255, 255);
  padding: 50px;
  @media only screen and (max-width: 992px) {
    width: 100%;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 10px;
  }
`;
