import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import ApplicationPopup from "./ApplicationPopup";
import { useState } from "react";
import * as firebase from "../../../utils/firebase";
import { useSelector } from "react-redux";
const AvatarImg = styled.img`
  max-height: 3rem;
  border-radius: 50%;
  box-shadow: 0px 2px 6px grey;
`;

const NameLogo = styled.div`
  align-self: center;
  font-weight: 550;
  font-size: 2rem;
  flex-grow: 1;
`;

const Wrapper = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: end;
`;

const UlStyled = styled.ul`
  display: flex;
  align-items: center;
`;

const LiStyled = styled.li`
  font-weight: 600;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  height: auto;
  display: inline-block;
  text-decoration: none;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 40px;
  border: 1px solid rgb(70 69 65);
`;

const LinkStyled = styled(Link)`
  font-weight: 600;
  color: black;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  height: auto;
  display: inline-block;
  text-decoration: none;
  margin-right: 10px;
  border-radius: 40px;
  border: 1px solid rgb(70 69 65);
`;

const LinkAvatar = styled(Link)`
  padding: 0;
  height: auto;
  display: inline-block;
  margin-right: 1rem;
`;

const Shield = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.8);
`;

const GroupHeader = ({ content, stationHead }) => {
  const userData = useSelector((state) => state.userData);
  // const usersList = useSelector((state) => state.usersList);

  const [showApplication, setShowApplication] = useState(false);

  const [applicationData, setApplicationData] = useState({});

  const [appliedData, setAppliedData] = useState("");

  useEffect(() => {
    if (content.groupID) {
      firebase.getTotalApplicationList(content.groupID, setApplicationData);
    }
  }, [content]);

  useEffect(() => {
    const data = applicationData.data?.find(
      (each) => each.applicantID === userData?.uid
    );

    if (data) {
      setAppliedData(data);
    }
  }, [applicationData]);

  const root = "http://localhost:3000";
  const location = useLocation();
  const checkMember =
    (userData !== null && content?.membersList?.includes(userData.uid)) ||
    content?.creatorID === userData?.uid;

  if (showApplication) {
    return (
      <Shield
        data-target="shield"
        onClick={(e) => {
          e.target.dataset.target === "shield" &&
            setShowApplication(!showApplication);
        }}
      >
        <ApplicationPopup
          appliedData={appliedData}
          groupData={content}
          applicationData={applicationData}
        />
      </Shield>
    );
  }

  return (
    <Wrapper>
      <NameLogo>{content.name}</NameLogo>
      <UlStyled>
        <LinkAvatar to={`/profile/${stationHead?.userID}`}>
          <AvatarImg src={stationHead?.avatar} />
        </LinkAvatar>
        <LiStyled
          onClick={() => {
            navigator.clipboard.writeText(root + location.pathname);
            alert(`複製連結成功！`);
          }}
        >
          分享連結
        </LiStyled>
        {checkMember && (
          <LinkStyled to={`${location.pathname}/notes`}>社群筆記</LinkStyled>
        )}
        {content.creatorID === userData?.uid ? (
          <LiStyled
            setShowApplication={setShowApplication}
            onClick={() => {
              setShowApplication(!showApplication);
            }}
          >
            待審申請
            <span>{applicationData?.count}</span>
          </LiStyled>
        ) : (
          <LiStyled
            onClick={() => {
              if (userData === null) {
                alert("請先登入或加入會員");
                return;
              }
              setShowApplication(!showApplication);
            }}
          >
            {appliedData ? "等候審核" : "申請加入"}
          </LiStyled>
        )}
      </UlStyled>
    </Wrapper>
  );
};

export default GroupHeader;
