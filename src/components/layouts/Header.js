import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";
import SigninPopup from "../SigninPopup";
import logo from "../../sharemore.png";
import * as firebase from "../../utils/firebase";

import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";

import { HiOutlineLogout, HiMenu, HiChevronDoubleRight } from "react-icons/hi";
import { MdAgriculture, MdOutlineNotificationsActive } from "react-icons/md";

const Header = () => {
  const history = useHistory();
  const userData = useSelector((state) => state.userData);
  const usersList = useSelector((state) => state.usersList);
  const groupsList = useSelector((state) => state.groupsList);
  const articlesList = useSelector((state) => state.articlesList);
  const [showLogin, setShowLogin] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [notificationCtn, setNotificationCtn] = useState([]);
  const [toggleMobile, setToggleMobile] = useState(false);

  const currentUser = usersList.find((item) => item.uid === userData?.uid);

  const actNotifications = () => {
    setShowNotification(!showNotification);
  };
  // const convertTime =

  const getUserName = (uid) => {
    const user = usersList.find((p) => p.uid === uid);
    console.log(user);
    return user.displayName;
  };

  const getGroupName = (gid) => {
    const group = groupsList.find((g) => g.groupID === gid);
    console.log(group);
    return group.name;
  };

  const getArticles = (mileID) => {
    const articles = articlesList.find((a) => a.milestoneID === mileID);
    return articles.title;
  };

  const handleReadNoti = (e) => {
    const target = e.target.dataset.id;
    firebase.readNotification(target, userData.uid);
  };

  useEffect(() => {
    if (userData) {
      const q = query(
        collection(firebase.db, "users", userData.uid, "notification"),
        orderBy("creationTime", "desc"),
        limit(10)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          console.log("😍", doc.data());
          const tinyArr = {};
          if (doc.data().docId?.includes("m-")) {
            console.log("有里程碑留言", doc.data().sender);
          } else if (doc.data().docId?.includes("g-")) {
            console.log("有社團留言", doc.data());
          }
          data.push(doc.data());
          console.log(data);
        });
        setNotificationCtn(data);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [userData]);

  const handleLogout = () => {
    firebase.logOut();
    history.push("/");
  };

  const userAvatar =
    currentUser?.avatar ||
    "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2Fuser.png?alt=media&token=16cddd6e-a927-4863-b69e-f620fc7c465e";

  const showLoginPage = () => {
    setShowLogin(!showLogin);
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
  return (
    <>
      <HeaderContainer>
        <InnerWrapper>
          <LogoContainer to="/">
            <LogoCtn src={logo} />
          </LogoContainer>
          <ListContainer>
            <ListStyled to="/milestones">所有里程碑</ListStyled>
            {userData && (
              <>
                <ListStyled to="/groups">所有社團</ListStyled>
                <ListStyled to="/groups/post">發起社團</ListStyled>
                <ListStyled to="/milestones/post">創建里程碑</ListStyled>
                <ListStyled to={`/profile/${userData?.uid}`}>
                  <ImgCtn src={userAvatar} />
                </ListStyled>
                <IconSet>
                  <Notifications onClick={actNotifications} />
                  {/* <Count>1</Count> */}
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
          {notificationCtn.map((msg) => {
            console.log(msg);
            if (msg.docId?.includes("m-")) {
              return (
                <NotifiLink
                  key={msg.docId}
                  to={`/milestone/${msg.milestoneID}`}
                  onClick={handleReadNoti}
                  data-id={msg.docId}
                >
                  <Dot status={msg.readed} data-id={msg.docId} />
                  <BoldName data-id={msg.docId} data-id={msg.docId}>
                    {getUserName(msg.sender)}
                  </BoldName>
                  在你的里程碑
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
                      {" "}
                      {getGroupName(msg.groupID)}{" "}
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
                      {" "}
                      {getGroupName(msg.groupID)}{" "}
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
        <MobileCtn>
          <Close onClick={() => setToggleMobile(!toggleMobile)} />
        </MobileCtn>
        <MLogo src={logo} />
        <MobileList to="/milestones">所有里程碑</MobileList>
        <MobileList to="/groups">所有社團</MobileList>
        <MobileList to="/groups/post">發起社團</MobileList>
        <MobileList to="/milestones/post">創建里程碑</MobileList>
        <MobileList to={`/profile/${userData?.uid}`}>個人頁面</MobileList>
        {/* <MobileCtn>
          登出 <LogoutBtn onClick={handleLogout} />
        </MobileCtn> */}
      </MobileMenu>
    </>
  );
};

export default Header;

const Count = styled.div`
  position: absolute;
  bottom: 0;
  right: 3px;
`;

const Dot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.status ? "#dbd3c6" : "#FCB643")};
  border-radius: 50%;
  margin-right: 5px;
`;

const BoldName = styled.span`
  font-weight: 600;
`;

const NotificationsArea = styled.div`
  font-size: 0.9rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: auto;
  right: 10px;
  z-index: 99;
  background-color: rgb(255 244 228);
  padding: 10px 0;
  overflow-y: auto;

  @media only screen and (max-width: 992px) {
    width: 30%;
  }
  @media only screen and (max-width: 400px) {
    width: 40%;
  }
`;

const NotifiLink = styled(Link)`
  margin: 10px 0;
  text-decoration: none;
  align-self: center;
  height: 30%;
  color: black;
  padding: 0.5rem;
  :hover {
    background-color: #ffae96;
  }
`;

const ListContainer = styled.ul`
  display: flex;
  align-items: center;
  padding: 0 0 0 1rem;
  /* gap: 1rem; */
  @media only screen and (max-width: 992px) {
    padding: 0;
  }
`;

const ListStyled = styled(Link)`
  font-weight: 600;
  margin-right: 1rem;
  list-style: none;
  text-decoration: none;
  font-size: 1rem;
  /* color: rgb(17 17 17); */
  color: #fff4e4;
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const LoginBtn = styled.button`
  color: #f27e59;
  margin-right: 20px;
  font-size: 1rem;
  padding: 0.3rem 1rem;
  cursor: pointer;
  font-weight: 550;
  border-radius: 2px;
  background-color: #ffebd7;
  transition: all 0.3s ease-in-out;
  border: none;
  text-decoration: none;
  &:hover {
    transform: translateY(-8px);
    color: #ff511d;
  }
`;

const LoginPage = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.8);
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1vw;
  max-width: 1560px;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  color: white;
  background-color: #f27e59;
  /* box-shadow: rgb(0 0 0 / 16%) 0px 5px 11px 0px; */
  box-shadow: 0px -3px 16px -7px #ffffff;
  @media only screen and (max-width: 992px) {
    justify-content: space-between;
  }
`;

const LogoContainer = styled(Link)`
  /* flex-grow: 1; */
  @media only screen and (max-width: 992px) {
    /* max-width: 200px; */
  }
`;

const LogoCtn = styled.img`
  max-width: 300px;
  @media only screen and (max-width: 992px) {
    max-width: 200px;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 0;
  top: 42px;
  background-color: rgb(255 228 207);
  font-size: 1rem;
  z-index: 999999;
  top: 0px;
  bottom: 0px;
  min-width: 240px;
  width: 60%;
  gap: 10px;
  right: ${(props) => (props.toggleMobile ? "0%" : "-100%")};
  transition: right 0.3s ease 0s;
`;

const MLogo = styled.img`
  width: 200px;
  height: 40px;
  background-position: center;
`;

const MobileList = styled(Link)`
  text-decoration: none;
  color: rgb(17 17 17);
  cursor: pointer;
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-child {
    justify-content: start;
  }
`;

const MobileCtn = styled.div`
  text-decoration: none;
  color: rgb(17 17 17);
  cursor: pointer;
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconSet = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  /* padding: 0 1rem; */
  gap: 10px;
`;

const ImgCtn = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;
const iconStyle = {
  width: "1.4rem",
  height: "1.4rem",
  margin: "0.5rem 0 ",
  color: "#fff4e4",
};

const Close = styled(HiChevronDoubleRight)`
  ${iconStyle}

  display: flex;
  justify-content: start;
`;

const Notifications = styled(MdOutlineNotificationsActive)`
  ${iconStyle}
  cursor: pointer;
`;

const LogoutBtn = styled(HiOutlineLogout)`
  ${iconStyle}
  cursor: pointer;
  @media only screen and (max-width: 992px) {
  }
`;

const MenuBurger = styled(HiMenu)`
  width: 1.4rem;
  height: 1.4rem;
  cursor: pointer;
  color: #fff4e4;
  /* margin-right: 1rem; */
  display: none;
  @media only screen and (max-width: 992px) {
    display: block;
  }
`;
