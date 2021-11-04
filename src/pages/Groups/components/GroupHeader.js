import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import ApplicationPopup from "./ApplicationPopup";
import { useState } from "react";
import * as firebase from "../../../utils/firebase";
import { useSelector } from "react-redux";
import { BsFillFolderFill, BsPencilSquare, BsCheckLg } from "react-icons/bs";
import { AiOutlineTrophy } from "react-icons/ai";
import { GiBookshelf } from "react-icons/gi";
import { RiShareForwardFill } from "react-icons/ri";
const AvatarImg = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  box-shadow: 0px 2px 6px grey;
`;

const NameLogo = styled.input`
  border: ${(props) => (props.actEdit ? "1px solid black" : " none")};
  /* border: none; */
  /* align-self: cent。 */
  font-weight: 550;
  font-size: 2rem;
  outline: none;
  width: auto;
  /* flex-grow: 1; */
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

const EditIcon = styled(BsPencilSquare)`
  cursor: pointer;
  margin-left: 1rem;
  height: 1rem;
  width: 1rem;
`;

const SubmitIcon = styled(BsCheckLg)`
  cursor: pointer;
  margin-left: 1rem;
  height: 1rem;
  width: 1rem;
`;

const TitleBar = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-grow: 1;
  align-items: center;
`;

const GroupHeader = ({ content, stationHead }) => {
  const userData = useSelector((state) => state.userData);
  // const usersList = useSelector((state) => state.usersList);
  const groupsList = useSelector((state) => state.groupsList);
  const [showApplication, setShowApplication] = useState(false);
  const [applicationData, setApplicationData] = useState({});

  const [appliedData, setAppliedData] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [actEdit, setActEdit] = useState(false);
  // const checkGroupOwner = content.creatorID === userData?.uid;
  useEffect(() => {
    if (content.groupID) {
      firebase.getTotalApplicationList(content.groupID, setApplicationData);
    }
    setTitleValue(content.name);
  }, [content]);

  useEffect(() => {
    const data = applicationData.data?.find(
      (each) => each.applicantID === userData?.uid
    );
    if (data) {
      setAppliedData(data);
    }
  }, [applicationData]);

  const root = window.location.host;
  const pathname = useLocation().pathname;

  const handleApplicationBtn = () => {
    if (userData === null) {
      alert("請先登入或加入會員");
      return;
    }
    setShowApplication(!showApplication);
  };

  const checkMember =
    (userData !== null && content?.membersList?.includes(userData?.uid)) ||
    content?.creatorID === userData?.uid;
  const checkOwner = content.creatorID === userData?.uid;
  const checkGeneralMember =
    userData !== null && content?.membersList?.includes(userData?.uid);

  const submitTitle = () => {
    setActEdit(false);
    const data = {
      name: titleValue,
    };
    firebase.editGroupData(data, content.groupID);
  };

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
      <TitleBar>
        <NameLogo
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          readOnly={!actEdit}
          actEdit={actEdit}
          // placeholder={content.name}
        />
        {checkOwner && !actEdit && (
          <EditIcon
            onClick={() => {
              setActEdit(!actEdit);
            }}
          />
        )}
        {checkOwner && actEdit && <SubmitIcon onClick={submitTitle} />}
      </TitleBar>
      {/* </NameLogo> */}
      <UlStyled>
        <LinkAvatar to={`/profile/${stationHead?.uid}`}>
          <AvatarImg src={stationHead?.avatar} />
        </LinkAvatar>
        <LiStyled
          onClick={() => {
            navigator.clipboard.writeText(root + pathname);
            alert(`複製連結成功！`);
          }}
        >
          <RiShareForwardFill />
        </LiStyled>
        <LinkStyled to={`${pathname}/bookshelf`}>
          <GiBookshelf />
        </LinkStyled>
        {checkMember && (
          <>
            <LinkStyled to={`${pathname}/milestones`}>
              <AiOutlineTrophy />
            </LinkStyled>
            <LinkStyled to={`${pathname}/notes`}>
              <BsFillFolderFill />
            </LinkStyled>
          </>
        )}

        {content.creatorID === userData?.uid && (
          <LiStyled
            setShowApplication={setShowApplication}
            onClick={() => {
              setShowApplication(!showApplication);
            }}
          >
            待審申請
            <span>{applicationData?.count}</span>
          </LiStyled>
        )}
        {!checkGeneralMember && !checkOwner && (
          <LiStyled onClick={handleApplicationBtn}>
            {appliedData ? "等候審核" : "申請加入"}
          </LiStyled>
        )}
      </UlStyled>
    </Wrapper>
  );
};
// };

export default GroupHeader;
