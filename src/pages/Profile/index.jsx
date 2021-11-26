import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ContentCards from "./components/ContentCards";
import { IoSettingsOutline } from "react-icons/io5";
import { DisappearedLoading } from "react-loadingg";
import {
  WebIcon,
  MailIcon,
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
  GitIcon,
  SideCard,
  Wrapper,
  ContentWrapper,
  CoverDiv,
  Avatar,
  UserInfo,
  TagSet,
  TagWrapper,
  IconSet,
  ListCtn,
  ListItem,
  SettingBtn,
  ContentCtn,
  Empty,
  MobileSettingBtn,
} from "./style/Index.style";

const ProfilePage = () => {
  const { userID } = useParams();
  const history = useHistory();
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
    if (groupsList.length > 0 && usersList.length > 0) {
      const checkUser = usersList.findIndex((p) => p.uid === userID);
      if (checkUser < 0) {
        history.push("/404");
      } else {
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
        setIsLoading(false);
      }
    }
  }, [articlesList, groupsList, usersList, userID]);

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
