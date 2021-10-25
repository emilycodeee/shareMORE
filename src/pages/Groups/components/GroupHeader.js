import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useHistory } from "react-router-dom";
import ApplicationPopup from "./ApplicationPopup";
import { useState } from "react";
import * as firebase from "../../../utils/firebase";

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  background-color: salmon;
`;

const UlStyled = styled.ul`
  display: flex;
`;

const LiStyled = styled.li`
  padding: 10px;
  height: auto;
  display: inline-block;
  background-color: lightblue;
  text-decoration: none;
  margin-right: 10px;
  cursor: pointer;
`;

const LinkStyled = styled(Link)`
  padding: 10px;
  height: auto;
  display: inline-block;
  background-color: lightblue;
  text-decoration: none;
  margin-right: 10px;
`;

const Shield = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.8);
  /* cursor: zoom-out; */
`;

const GroupHeader = ({ content, user, userList }) => {
  console.log("🎇", user);

  // console.log(useLocation());
  const [showApplication, setShowApplication] = useState(false);
  // const [applicationCount, setApplicationCount] = useState("");
  const [applicationData, setApplicationData] = useState({});

  const [appliedData, setAppliedData] = useState("");

  console.log(applicationData);

  useEffect(() => {
    if (content.groupID) {
      const response = firebase.getTotalApplicationList(content.groupID);

      response
        .then((res) => {
          setApplicationData({ count: res.length, data: res });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [content]);

  useEffect(() => {
    const data = applicationData.data?.find(
      (each) => each.applicantID === user.uid
    );
    console.log(data);
    if (data) {
      setAppliedData(data);
    }
  }, [applicationData]);

  const root = "http://localhost:3000";
  const location = useLocation();

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
          setShowApplication={setShowApplication}
          user={user}
          groupData={content}
          applicationData={applicationData}
          userList={userList}
        />
      </Shield>
    );
  }
  console.log(applicationData);
  console.log(appliedData);

  return (
    <Wrapper>
      <UlStyled>
        <LiStyled
          onClick={() => {
            navigator.clipboard.writeText(root + location.pathname);
            alert(`複製連結成功！`);
          }}
        >
          分享連結
        </LiStyled>
        {user !== null && (
          <>
            <LinkStyled to={`${location.pathname}/members`}>
              夥伴列表
            </LinkStyled>
            <LinkStyled to={`${location.pathname}/notes`}>社群筆記</LinkStyled>
          </>
        )}
        {content.creatorID === user?.uid ? (
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
              if (user === null) {
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
