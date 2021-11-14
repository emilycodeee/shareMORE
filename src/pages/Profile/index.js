import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import facebookTag from "../../sources/facebookTag.png";
import email from "../../sources/email.png";
import ig from "../../sources/ig.png";
import linkedin from "../../sources/linkedin.png";
import web from "../../sources/web.png";
import github from "../../sources/github.png";
import * as firebase from "../../utils/firebase";
import ContentCards from "./components/ContentCards";

import { v4 as uuidv4 } from "uuid";

const SideCard = styled.div`
  margin-top: 3rem;
  padding: 3rem 1rem 1rem 1rem;
  width: 35%;
  display: flex;
  flex-direction: column;
  background: #fffdfd;
  position: relative;

  @media only screen and (max-width: 992px) {
    align-items: center;
    padding: 1rem;
    margin-top: 0;
    width: 100%;
    position: static;
    flex-direction: row;
  }
`;

const Wrapper = styled.div`
  max-width: 1560px;
  width: 100%;
  display: flex;

  margin: 0 auto;
  margin-top: 2rem;
  padding: 60px 60px 150px;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  @media only screen and (max-width: 992px) {
    margin-top: 0;
    padding: 0;
    flex-direction: column;
  }
`;

const ContentWrapper = styled.div`
  padding: 10px;
  width: 65%;
  @media only screen and (max-width: 992px) {
    width: 100%;
  }
  /* box-shadow: 0 2px 10px #a2a2a2; */
`;

const Avatar = styled.img`
  width: 10rem;
  height: 10rem;
  position: absolute;
  top: -75px;
  left: 50%;
  border: 2px solid #fff;
  transform: translateX(-50%);
  border-radius: 50%;
  /* flex-direction: column; */
  @media only screen and (max-width: 992px) {
    position: static;
    transform: translateX(0);
    width: 3rem;
    height: 3rem;
    align-self: center;
    margin: 0 1rem;
  }
`;

const UserInfo = styled.div`
  margin-top: 4rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid rgb(219, 216, 214);
  margin-bottom: 10px;
  gap: 10px;
  @media only screen and (max-width: 992px) {
    h1,
    p {
      margin: 0;
    }
    h1 {
      font-size: 1rem;
    }
    width: 100%;
    margin-top: 0;
    align-items: flex-start;
    margin-bottom: 0;
  }
`;

const TagSet = styled.div`
  text-align: center;
`;

const TagWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-around;
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const Icon = styled.img`
  height: 1.8rem;
  @media only screen and (max-width: 500px) {
    height: 1rem;
  }
`;

const IconSet = styled.div`
  margin: 10px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  @media only screen and (max-width: 992px) {
    margin: 0;
    justify-content: flex-start;
    gap: 10px;
  }
`;

const ContentCtn = styled.div`
  padding: 10px;
`;

const ListCtn = styled.ul`
  padding: 0;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #fffdfd;
`;

const ListItem = styled.li`
  cursor: pointer;
  /* margin-left: 1rem; */
  /* border-radius: 30px; */
  list-style: none;
  background-color: none;
  font-weight: 600;
  border-bottom: 3px solid
    ${(props) => (props.active === props.children ? "#f27e59" : "none")};
  color: ${(props) => (props.active === props.children ? "#f27e59" : "black")};
  padding: 0.5rem 1rem;
  /* box-shadow: rgb(0 0 0 / 10%) 0px 2px 6px; */
  /* &:last-child {
    background-color: #dfdfdf;
  } */
`;

const SettingBtn = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: 600;
  cursor: pointer;
  margin: 30px 0;
  padding: 10px 0;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  border: 1px solid rgb(219, 216, 214);
  align-items: center;
  justify-content: center;
  &:hover {
    color: gray;
  }
  @media only screen and (max-width: 992px) {
    margin-left: 10px;
    width: 100px;
    /* display: block; */
  }
`;

const ProfilePage = () => {
  const { userID } = useParams();

  const usersList = useSelector((state) => state.usersList);
  const userData = useSelector((state) => state.userData);
  const groupsList = useSelector((state) => state.groupsList);
  const articlesList = useSelector((state) => state.articlesList);
  //本頁id連動的user
  const currentUser = usersList?.find((item) => item.uid === userID);
  const me = userID === userData?.uid;

  console.log("currentUser", currentUser);
  console.log("me", me);

  const [userJoinGroups, setUserJoinGroups] = useState([]);
  const [userCreateGroups, setUserCreateGroups] = useState([]);
  const [userMilestones, setUserMilestones] = useState([]);

  //我自己看到
  const [mySaveArticles, setMySaveArticles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showSetting, setShowSetting] = useState(false);
  const [active, setActive] = useState("我參加的社團");

  const isOwner = useRef(false);
  const defaultRender = useRef(true);

  useEffect(() => {
    const participate = groupsList?.filter((g) =>
      g.membersList?.includes(userID)
    );
    setUserJoinGroups(participate);
    const owner = groupsList?.filter((g) => g.creatorID === userID);
    setUserCreateGroups(owner);
    const userMile = articlesList.filter((a) => a.creatorID === userID);

    setUserMilestones(userMile);

    const mySave = articlesList.filter((a) =>
      a.saveBy?.includes(userData?.uid)
    );
    const publicChecker = mySave.filter((a) => a.public === true);
    setMySaveArticles(publicChecker);
  }, [articlesList, groupsList]);

  if (userData?.uid === userID) {
    isOwner.current = true;
  }

  const handleChoose = (e) => {
    console.log(e.target.dataset.id);
    // setActive(true);
    defaultRender.current = false;
    switch (e.target.dataset.id) {
      case "part":
        setActive("我參加的社團");
        setSelected(userJoinGroups);
        break;
      case "own":
        setActive("我創建的社團");
        setSelected(userCreateGroups);
        break;
      case "stone":
        setActive("我的分享");
        setSelected(userMilestones.filter((item) => item.public === true));
        break;
      case "save":
        setActive("我的收藏");
        setSelected(mySaveArticles);
        break;
      case "archive":
        setActive("封存");
        setSelected(userMilestones.filter((item) => item.public === false));
        break;
      default:
    }
  };

  const publicMilestone = userMilestones.filter(
    (item) => item.public === true
  ).length;

  return (
    <Wrapper>
      <SideCard>
        <Avatar src={currentUser?.avatar} alt="" />
        <UserInfo>
          <h1>{currentUser?.displayName} </h1>
          <p>{currentUser?.introduce || "我還在想😜"}</p>
          <IconSet>
            {/* {currentUser?.introduce} */}

            {currentUser?.instagram && (
              <a href={currentUser?.instagram} target="_blank">
                <Icon src={ig} />
              </a>
            )}
            {currentUser?.facebook && (
              <a href={currentUser?.facebook} target="_blank">
                <Icon src={facebookTag} />
              </a>
            )}
            {currentUser?.linkedin && (
              <a href={currentUser?.linkedin} target="_blank">
                <Icon src={linkedin} />
              </a>
            )}
            {currentUser?.github && (
              <a href={currentUser?.github} target="_blank">
                <Icon src={github} />
              </a>
            )}
            {currentUser?.secondEmail && (
              <a href={`mailto:${currentUser?.secondEmail}`}>
                <Icon src={email} />
              </a>
            )}
            {currentUser?.webUrl && (
              <a href={currentUser?.webUrl} target="_blank">
                <Icon src={web} />
              </a>
            )}
          </IconSet>
        </UserInfo>
        <TagWrapper>
          <TagSet>
            <div>參加</div>
            <div>{userJoinGroups.length}</div>
            <div>社群</div>
          </TagSet>
          <TagSet>
            <div>發起</div>
            <div>{userCreateGroups.length}</div>
            <div>社群</div>
          </TagSet>
          <TagSet>
            <div>創建</div>
            <div>{publicMilestone}</div>
            <div>里程碑</div>
          </TagSet>
        </TagWrapper>
        {/* <div>
            <p>Follow me on popular social media sites.</p>
          </div> */}
        {me && (
          <SettingBtn to={`/profile/${userID}/edit`}>個人頁面設定</SettingBtn>
        )}
      </SideCard>

      <ContentWrapper>
        <ListCtn>
          <ListItem data-id="part" active={active} onClick={handleChoose}>
            我參加的社團
          </ListItem>
          <ListItem data-id="own" active={active} onClick={handleChoose}>
            我創建的社團
          </ListItem>
          <ListItem data-id="stone" active={active} onClick={handleChoose}>
            我的分享
          </ListItem>
          {me && (
            <>
              <ListItem data-id="save" active={active} onClick={handleChoose}>
                我的收藏
              </ListItem>
              <ListItem
                data-id="archive"
                active={active}
                onClick={handleChoose}
              >
                封存
              </ListItem>
            </>
          )}
        </ListCtn>
        <ContentCtn>
          {defaultRender.current
            ? userJoinGroups?.map((item) => {
                console.log("cccccccccccc", item);
                return <ContentCards item={item} key={item.groupID} />;
              })
            : selected?.map((item) => {
                console.log("ssssssssssssssss", item);
                return (
                  <ContentCards
                    item={item}
                    key={item.milestoneID || item.groupID}
                  />
                );
              })}
        </ContentCtn>
      </ContentWrapper>
    </Wrapper>
  );
};

export default ProfilePage;
