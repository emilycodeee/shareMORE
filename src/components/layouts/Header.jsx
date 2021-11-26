import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";
import SigninPopup from "../SigninPopup";
import logo from "../../sharemore.png";
import { logOut, readNotification, onNotification } from "../../utils/firebase";
import {
  NotifiSet,
  Count,
  Dot,
  BoldName,
  NotificationsArea,
  NotifiDiv,
  NotifiLink,
  ListContainer,
  ListStyled,
  LoginBtn,
  LoginPage,
  InnerWrapper,
  HeaderContainer,
  LogoCtn,
  MobileMenu,
  MLogo,
  MobileList,
  MobileCtn,
  IconSet,
  ImgCtn,
  Close,
  Notifications,
  LogoutBtn,
  MenuBurger,
} from "../style/Header.style";

const Header = () => {
  const history = useHistory();
  const userData = useSelector((state) => state.userData);
  const usersList = useSelector((state) => state.usersList);
  const groupsList = useSelector((state) => state.groupsList);
  const articlesList = useSelector((state) => state.articlesList);
  const [active, setActive] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCtn, setNotificationCtn] = useState([]);
  const [toggleMobile, setToggleMobile] = useState(false);

  const currentUser = usersList.find((item) => item.uid === userData?.uid);

  const actNotifications = () => {
    setShowNotification(!showNotification);
  };

  const getUserName = (uid) => {
    const user = usersList.find((p) => p.uid === uid);
    return user?.displayName;
  };

  const getGroupName = (gid) => {
    const group = groupsList.find((g) => g.groupID === gid);
    return group?.name;
  };

  const getArticles = (mileID) => {
    const articles = articlesList.find((a) => a.milestoneID === mileID);
    return articles?.title;
  };

  const handleReadNoti = (e) => {
    const target = e.target.dataset.id;
    readNotification(target, userData.uid);
    setShowNotification(false);
  };

  const handleClick = () => {
    setToggleMobile(false);
  };

  useEffect(() => {
    if (
      userData !== undefined &&
      userData !== null &&
      Object.keys(userData).length > 0
    ) {
      const unsubscribe = onNotification(userData.uid, setNotificationCtn);
      return () => {
        unsubscribe();
      };
    }
  }, [userData]);

  const handleLogout = () => {
    logOut();
    setShowLogin(false);
    setShowNotification(false);
    history.push("/");
  };

  const userAvatar =
    currentUser?.avatar ||
    "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2Fuser.png?alt=media&token=16cddd6e-a927-4863-b69e-f620fc7c465e";

  const showLoginPage = () => {
    setShowLogin(!showLogin);
  };

  const handleChoose = (e) => {
    switch (e.target.dataset.id) {
      case "shares":
        setActive("分享廣場");
        break;
      case "groups":
        setActive("所有社團");
        break;
      case "createGroups":
        setActive("發起社團");
        break;
      case "createShares":
        setActive("分享成果");
        break;

      default:
    }
  };

  if (!userData && showLogin) {
    return (
      <LoginPage
        data-target="shield"
        onClick={(e) => {
          e.target.dataset.target === "shield" && setShowLogin(!showLogin);
        }}
      >
        <SigninPopup setShowLogin={setShowLogin} />
      </LoginPage>
    );
  }

  const count = notificationCtn?.filter((d) => d.readed === false).length;

  return (
    <>
      <HeaderContainer>
        <InnerWrapper>
          <Link to="/">
            <LogoCtn src={logo} />
          </Link>
          <ListContainer>
            <ListStyled
              to="/articles"
              data-id="shares"
              active={active}
              onClick={handleChoose}
            >
              分享廣場
            </ListStyled>

            <ListStyled
              to="/groups"
              data-id="groups"
              active={active}
              onClick={handleChoose}
            >
              所有社團
            </ListStyled>

            {userData && (
              <>
                <ListStyled
                  to="/groups/post"
                  data-id="createGroups"
                  active={active}
                  onClick={handleChoose}
                >
                  發起社團
                </ListStyled>
                <ListStyled
                  to="/articles/post"
                  data-id="createShares"
                  active={active}
                  onClick={handleChoose}
                >
                  分享成果
                </ListStyled>
                <ListStyled to={`/profile/${userData?.uid}`}>
                  <ImgCtn src={userAvatar} />
                </ListStyled>
                <IconSet>
                  <NotifiSet onClick={actNotifications}>
                    <Notifications />
                    <Count count={count}>{count}</Count>
                  </NotifiSet>
                  <MenuBurger onClick={() => setToggleMobile(!toggleMobile)} />
                  <LogoutBtn onClick={handleLogout} />
                </IconSet>
              </>
            )}
            {!userData && <LoginBtn onClick={showLoginPage}>登入</LoginBtn>}
          </ListContainer>
        </InnerWrapper>
      </HeaderContainer>
      {showNotification && (
        <NotificationsArea>
          {notificationCtn.length === 0 && (
            <NotifiDiv>目前沒有新通知</NotifiDiv>
          )}
          {notificationCtn.map((msg) => {
            if (msg.docId?.includes("m-")) {
              return (
                <NotifiLink
                  key={msg.docId}
                  to={`/article/${msg.milestoneID}`}
                  onClick={handleReadNoti}
                  data-id={msg.docId}
                >
                  <Dot status={msg.readed} data-id={msg.docId} />
                  <BoldName data-id={msg.docId} data-id={msg.docId}>
                    {getUserName(msg.sender)}
                  </BoldName>
                  在你的分享文章
                  <BoldName data-id={msg.docId} data-id={msg.docId}>
                    {" "}
                    {getArticles(msg.milestoneID)}{" "}
                  </BoldName>
                  發表新回覆
                </NotifiLink>
              );
            } else if (msg.docId?.includes("g-")) {
              if (msg.role === "owner") {
                return (
                  <NotifiLink
                    key={msg.docId}
                    to={`/group/${msg.groupID}`}
                    onClick={handleReadNoti}
                    data-id={msg.docId}
                  >
                    <Dot status={msg.readed} data-id={msg.docId} />
                    你的社團
                    <BoldName data-id={msg.docId}>
                      {getGroupName(msg.groupID)}
                    </BoldName>
                    有新的入社申請
                  </NotifiLink>
                );
              } else {
                return (
                  <NotifiLink
                    key={msg.docId}
                    to={`/group/${msg.groupID}`}
                    onClick={handleReadNoti}
                    data-id={msg.docId}
                  >
                    <Dot status={msg.readed} data-id={msg.docId} />
                    你在
                    <BoldName data-id={msg.docId}>
                      {getGroupName(msg.groupID)}
                    </BoldName>
                    的社團申請已經通過囉
                  </NotifiLink>
                );
              }
            }
          })}
        </NotificationsArea>
      )}
      <MobileMenu toggleMobile={toggleMobile}>
        <MobileCtn onClick={() => setToggleMobile(!toggleMobile)}>
          <Close />
        </MobileCtn>
        <MLogo src={logo} />
        <MobileList to="/articles" onClick={handleClick}>
          分享廣場
        </MobileList>
        <MobileList to="/groups" onClick={handleClick}>
          所有社團
        </MobileList>
        <MobileList to="/groups/post" onClick={handleClick}>
          發起社團
        </MobileList>
        <MobileList to="/articles/post" onClick={handleClick}>
          分享成果
        </MobileList>
        <MobileList to={`/profile/${userData?.uid}`} onClick={handleClick}>
          個人頁面
        </MobileList>
      </MobileMenu>
    </>
  );
};

export default Header;
