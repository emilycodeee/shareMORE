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
  padding: 1rem;
  width: 400px;
  /* height: 550px; */
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  box-shadow: 0 2px 10px #a2a2a2;
`;

const Wrapper = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 2rem;
  width: 100%;
  max-width: 1000px;
  padding: 60px 60px 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  padding: 10px;
  width: 100%;
  box-shadow: 0 2px 10px #a2a2a2;
`;

const AvatarCtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
`;

const Avatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid rgb(219, 216, 214);
  margin-bottom: 10px;
`;

const TagSet = styled.div`
  text-align: center;
`;

const TagWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-around;
`;

const Icon = styled.img`
  height: 1.8rem;
`;

const IconSet = styled.div`
  margin: 10px;
  width: 100%;

  display: flex;
  justify-content: space-evenly;
`;

const ContentCtn = styled.div`
  padding: 10px;
`;

const ListCtn = styled.ul`
  padding: 0;
  display: flex;
  justify-content: center;
`;

const ListItem = styled.li`
  cursor: pointer;
  margin-left: 1rem;
  border-radius: 30px;
  list-style: none;
  background-color: ${(props) =>
    props.active === props.children ? "#dfdfdf" : "#f5f5f5"};

  padding: 0.5rem 1rem;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 6px;
  /* &:last-child {
    background-color: #dfdfdf;
  } */
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
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
  border-radius: 10px;
  border: 1px solid rgb(219, 216, 214);
  align-items: center;
  justify-content: center;
  &:hover {
    color: gray;
  }
`;

const ProfilePage = () => {
  const { userID } = useParams();

  const usersList = useSelector((state) => state.usersList);
  const userData = useSelector((state) => state.userData);
  const currentUser = usersList?.find((item) => item.uid === userID);

  const [myGroupsObj, setMyGroupsObj] = useState({});
  const [myMilestones, setMyMilestones] = useState([]);
  const [mySaveArticles, setMySaveArticles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showSetting, setShowSetting] = useState(false);
  const [active, setActive] = useState("我參加的社團");
  // const [isOwner, setIsOwner] = useState(false);
  const isOwner = useRef(false);
  const defaultRender = useRef(true);

  useEffect(() => {
    firebase
      .getMyGroupsObj(userID)
      .then((res) => setMyGroupsObj(res))
      .catch((err) => console.error(err));
    firebase
      .getMyMilestones(userID)
      .then((res) => setMyMilestones(res))
      .catch((err) => console.error(err));
    firebase
      .getMySaveArticles(userID)
      .then((res) => {
        console.log("mySaveArticles👱‍♂️", res);
        setMySaveArticles(res);
      })
      .catch((err) => console.error(err));
  }, []);

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
        setSelected(myGroupsObj.participate);
        break;
      case "own":
        setActive("我創建的社團");
        setSelected(myGroupsObj.owner);
        break;
      case "stone":
        setActive("我的里程碑");
        setSelected(myMilestones.filter((item) => item.public === true));
        break;
      case "save":
        setActive("我的收藏");
        // console.log("mySaveArticles", mySaveArticles);
        setSelected(mySaveArticles);
        break;
      case "archive":
        setActive("封存");
        // console.log("mySaveArticles", mySaveArticles);
        setSelected(myMilestones.filter((item) => item.public === false));
        break;
      default:
      // setSelected(myGroupsObj.participate);
    }
  };

  const publicMilestone = myMilestones.filter(
    (item) => item.public === true
  ).length;

  return (
    <Wrapper>
      <SideCard>
        <div>
          <AvatarCtn>
            <Avatar src={currentUser?.avatar} alt="" />
          </AvatarCtn>
        </div>
        <div>
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
              <div>{myGroupsObj.participate?.length}</div>
              <div>社群</div>
            </TagSet>
            <TagSet>
              <div>發起</div>
              <div>{myGroupsObj.owner?.length}</div>
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
          {isOwner.current && (
            <SettingBtn to={`/profile/${userID}/edit`}>個人頁面設定</SettingBtn>
          )}
        </div>
      </SideCard>
      <hr />
      <ContentWrapper>
        <ListCtn>
          <ListItem data-id="part" active={active} onClick={handleChoose}>
            我參加的社團
          </ListItem>
          <ListItem data-id="own" active={active} onClick={handleChoose}>
            我創建的社團
          </ListItem>
          <ListItem data-id="stone" active={active} onClick={handleChoose}>
            我的里程碑
          </ListItem>
          <ListItem data-id="save" active={active} onClick={handleChoose}>
            我的收藏
          </ListItem>
          <ListItem data-id="archive" active={active} onClick={handleChoose}>
            封存
          </ListItem>
          {/* <LinkStyle to={`/messages/${userID}`}>
            <ListItem>發訊息</ListItem>
          </LinkStyle> */}
        </ListCtn>
        <ContentCtn>
          {defaultRender.current
            ? myGroupsObj.participate?.map((item) => {
                // console.log(selected);
                return <ContentCards item={item} key={uuidv4()} />;
              })
            : selected?.map((item) => {
                console.log("ssssssssssssssss", selected);
                return <ContentCards item={item} key={uuidv4()} />;
              })}
        </ContentCtn>
      </ContentWrapper>
    </Wrapper>
  );
};

export default ProfilePage;

//  <Link to={`/messages/${userID}`} style={{ height: "100px" }}>
//    傳訊息
//  </Link>;
