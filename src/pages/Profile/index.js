import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import * as firebase from "../../utils/firebase";
import ContentCards from "./components/ContentCards";
import { IoSettingsOutline } from "react-icons/io5";
import {
  FaGithubSquare,
  FaLinkedin,
  FaFacebookSquare,
  FaMailBulk,
  FaInstagram,
} from "react-icons/fa";
import { DisappearedLoading } from "react-loadingg";
import { BsGlobe } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

const SideCard = styled.div`
  margin-top: 3rem;
  padding: 2rem 1rem 1rem 1rem;
  width: 30%;
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
  @media only screen and (max-width: 500px) {
    flex-direction: column;
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
  width: 70%;
  @media only screen and (max-width: 992px) {
    width: 100%;
  }
`;

const CoverDiv = styled.div`
  width: 8rem;
  height: 8rem;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  border: 1px solid red;

  position: absolute;
  top: -65px;
  left: 50%;
  border: 2px solid #fff;
  transform: translateX(-50%);
  border-radius: 50%;
  @media only screen and (max-width: 992px) {
    position: static;
    transform: translateX(0);
    width: 5rem;
    height: 5rem;
    align-self: center;
    margin: 1rem;
  }
`;

const Avatar = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const UserInfo = styled.div`
  margin-top: 3rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid rgb(219, 216, 214);
  margin-bottom: 10px;
  gap: 1rem;
  h1,
  p {
    margin: 0;
  }
  @media only screen and (max-width: 992px) {
    h1,
    p {
      margin: 0;
    }
    h1 {
      font-size: 1rem;
    }
    padding: 1rem;
    width: 100%;
    margin-top: 0;
    align-items: flex-start;
    margin-bottom: 0;
  }
  border: none;
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

const IconSet = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: space-evenly;
  @media only screen and (max-width: 992px) {
    margin: 0;
    gap: 10px;
  }
`;

const ContentCtn = styled.div`
  padding: 10px;
`;

const ListCtn = styled.ul`
  padding: 0;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #fffdfd;
  @media only screen and (max-width: 992px) {
    justify-content: center;
  }
`;

const ListItem = styled.li`
  cursor: pointer;
  list-style: none;
  background-color: none;
  font-weight: 600;
  border-bottom: 3px solid
    ${(props) => (props.active === props.children ? "#f27e59" : "none")};
  color: ${(props) => (props.active === props.children ? "#f27e59" : "black")};
  padding: 0.5rem 1rem;
`;

const SettingBtn = styled(Link)`
  text-decoration: none;
  color: #f27e59;
  font-weight: 600;
  cursor: pointer;
  margin: 30px 0;
  padding: 10px 0;
  width: 100%;
  height: 40px;
  display: flex;
  gap: 10px;
  flex-direction: row;
  border-radius: 4px;
  border: 1px solid #f27e59;
  align-items: center;
  justify-content: center;
  &:hover {
    color: white;
    background-color: #f27e59;
  }
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const ProfilePage = () => {
  const { userID } = useParams();

  const usersList = useSelector((state) => state.usersList);
  const userData = useSelector((state) => state.userData);
  const groupsList = useSelector((state) => state.groupsList);
  const articlesList = useSelector((state) => state.articlesList);
  const [isLoading, setIsLoading] = useState(true);
  //本頁id連動的user
  const currentUser = usersList?.find((item) => item.uid === userID);
  const me = userID === userData?.uid;

  const [userJoinGroups, setUserJoinGroups] = useState([]);
  const [userCreateGroups, setUserCreateGroups] = useState([]);
  const [userMilestones, setUserMilestones] = useState([]);

  //我自己看到
  const [mySaveArticles, setMySaveArticles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [active, setActive] = useState("我參加的社團");

  useEffect(() => {
    const participate = groupsList?.filter((g) =>
      g.membersList?.includes(userID)
    );
    setSelected(participate);
    setUserJoinGroups(participate);

    const owner = groupsList?.filter((g) => g.creatorID === userID);
    setUserCreateGroups(owner);

    const userMile = articlesList.filter((a) => a.creatorID === userID);
    setUserMilestones(userMile);

    const mySave = articlesList.filter(
      (a) => a.saveBy?.includes(userData?.uid) && a.public === true
    );
    setMySaveArticles(mySave);

    if (groupsList.length > 0) setIsLoading(false);
  }, [articlesList, groupsList]);

  const handleChoose = (e) => {
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
        setActive("非公開文章");
        setSelected(userMilestones.filter((item) => item.public === false));
        break;
      default:
    }
  };

  const publicMilestone = userMilestones.filter(
    (item) => item.public === true
  ).length;

  if (userData === undefined || isLoading) {
    return <DisappearedLoading />;
  } else if (!isLoading)
    return (
      <Wrapper>
        <SideCard>
          <div>
            <CoverDiv>
              <Avatar src={currentUser?.avatar} alt="" />
            </CoverDiv>
            {me && (
              <MobileSettingBtn to={`/profile/${userID}/edit`}>
                設定
                <IoSettingsOutline />
              </MobileSettingBtn>
            )}
          </div>

          <UserInfo>
            <h1>{currentUser?.displayName} </h1>
            <p>{currentUser?.introduce || "我還在想😜"}</p>

            <IconSet>
              {currentUser?.instagram && (
                <a href={currentUser?.instagram} target="_blank">
                  <InstagramIcon />
                </a>
              )}
              {currentUser?.facebook && (
                <a href={currentUser?.facebook} target="_blank">
                  <FacebookIcon />
                </a>
              )}
              {currentUser?.linkedin && (
                <a href={currentUser?.linkedin} target="_blank">
                  <LinkedinIcon />
                </a>
              )}
              {currentUser?.github && (
                <a href={currentUser?.github} target="_blank">
                  <GitIcon />
                </a>
              )}
              {currentUser?.secondEmail && (
                <a href={`mailto:${currentUser?.secondEmail}`}>
                  <MailIcon />
                </a>
              )}
              {currentUser?.webUrl && (
                <a href={currentUser?.webUrl} target="_blank">
                  <WebIcon />
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
              <div>分享</div>
              <div>{publicMilestone}</div>
              <div>文章</div>
            </TagSet>
          </TagWrapper>
          {me && (
            <SettingBtn to={`/profile/${userID}/edit`}>
              個人頁面設定
              <IoSettingsOutline />
            </SettingBtn>
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
                  非公開文章
                </ListItem>
              </>
            )}
          </ListCtn>
          <ContentCtn>
            {selected?.map((item) => {
              return (
                <ContentCards
                  item={item}
                  key={item.milestoneID || item.groupID}
                />
              );
            })}
            {selected.length === 0 && (
              <Empty>
                <div> {active} 目前空空的...</div>
                <lottie-player
                  src="https://assets6.lottiefiles.com/private_files/lf30_bn5winlb.json"
                  background="transparent"
                  speed="1"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                  loop
                  autoplay
                />
              </Empty>
            )}
          </ContentCtn>
        </ContentWrapper>
      </Wrapper>
    );
};

export default ProfilePage;

const Empty = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 0 10px;
  gap: 1rem;
  div {
    margin-top: 1rem;
    font-weight: 600;
    color: rgb(242, 126, 89);
  }
  @media only screen and (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

const MobileSettingBtn = styled(Link)`
  display: none;
  @media only screen and (max-width: 992px) {
    display: block;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    width: 60%;
    margin: 0 20%;
    flex-direction: row;
    border-radius: 4px;
    border: 1px solid #f27e59;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f27e59;
    &:hover {
      color: white;
      background-color: #f27e59;
    }
  }
`;
const style = {
  width: "1.4rem",
  height: "1.4rem",
  color: "black",
  marginTop: "10px",
};

const WebIcon = styled(BsGlobe)`
  ${style}
`;

const MailIcon = styled(FaMailBulk)`
  ${style}
`;

const InstagramIcon = styled(FaInstagram)`
  ${style}
`;

const LinkedinIcon = styled(FaLinkedin)`
  ${style}
`;

const FacebookIcon = styled(FaFacebookSquare)`
  ${style}
`;

const GitIcon = styled(FaGithubSquare)`
  ${style}
`;
