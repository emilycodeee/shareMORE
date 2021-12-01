import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";
import SigninPopup from "../SigninPopup";
import logo from "../../sources/sharemore.png";
import { logOut, readNotification, onNotification } from "../../utils/firebase";
import HtmlParser from "react-html-parser";
import moment from "moment";
import "moment/locale/zh-tw";

import {
  NotifiSet,
  Count,
  Dot,
  NotificationsArea,
  NotiContent,
  NotiWrap,
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
  TimeAgo,
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
    if (user === undefined) {
      return "";
    }
    return user.displayName;
  };

  const getGroupName = (gid) => {
    const group = groupsList.find((g) => g.groupID === gid);
    if (group === undefined) {
      return "";
    }
    return group.name;
  };

  const getArticles = (mileID) => {
    const articles = articlesList.find((a) => a.milestoneID === mileID);
    if (articles === undefined) {
      return "";
    }
    return articles.title;
  };

  const handleReadNoti = (e) => {
    const target = e.currentTarget.dataset.id;
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
    "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2FbackgroundUser.png?alt=media&token=c03a9d59-7d7b-47b2-a2bb-aece5bb8537b";

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
            let url, html;
            if (msg.docId?.includes("m-")) {
              url = `/article/${msg.milestoneID}`;
              html = `<span>${getUserName(msg.sender)}</span>
                      在你的分享文章
                      <span> ${getArticles(msg.milestoneID)} </span>
                      發表新回覆`;
            } else if (msg.docId?.includes("g-")) {
              url = `/group/${msg.groupID}`;
              if (msg.role === "owner") {
                html = `你的社團
                      <span>${getGroupName(msg.groupID)}</span>
                      有新的入社申請`;
              } else {
                html = `<div>你在
                    <span>${getGroupName(msg.groupID)}</span>
                    的社團申請已經通過囉
                  </div>`;
              }
            }
            return (
              <NotifiLink
                key={msg.docId}
                to={url}
                onClick={handleReadNoti}
                data-id={msg.docId}
              >
                <NotiWrap>
                  <Dot status={msg.readed} />
                  <NotiContent>
                    {HtmlParser(html)}
                    <TimeAgo>
                      {moment(msg.creationTime.toDate())
                        .locale("zh-tw")
                        .fromNow()}
                    </TimeAgo>
                  </NotiContent>
                </NotiWrap>
              </NotifiLink>
            );
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
