import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";
import SigninPopup from "../SigninPopup";
import logo from "../../sharemore.png";
import * as firebase from "../../utils/firebase";

import { HiOutlineLogout, HiMenu, HiChevronDoubleRight } from "react-icons/hi";
// import { FaHamburger } from "react-icons/fa";

const ListContainer = styled.ul`
  display: flex;
  align-items: center;
  padding: 0 1rem;

  @media only screen and (max-width: 800px) {
    padding: 0;
  }
`;

const ListStyled = styled(Link)`
  font-weight: 600;
  margin-right: 1rem;
  list-style: none;
  text-decoration: none;

  color: rgb(17 17 17);
  &:last-child {
    margin-right: 0;
  }
  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

const LoginBtn = styled.button`
  margin-right: 20px;
  /* height: 2em; */
  font-size: 1rem;
  padding: 0.3rem 1rem;
  cursor: pointer;
  font-weight: 550;
  border-radius: 2px;
  background-color: transparent;
  border: 1px solid rgb(255 182 0);
  /* 
  color: rgb(255 182 0); */
  text-decoration: none;
  &:hover {
    background-color: rgb(255 182 0);
    color: white;
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
  /* cursor: zoom-out; */
`;

const Header = () => {
  const history = useHistory();
  const userData = useSelector((state) => state.userData);
  const usersList = useSelector((state) => state.usersList);

  const [showLogin, setShowLogin] = useState(false);
  const [toggleMobile, setToggleMobile] = useState(false);

  const currentUser = usersList.find((item) => item.uid === userData?.uid);

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
        <LogoContainer to="/">
          <LogoCtn src={logo} />
        </LogoContainer>
        <ListContainer>
          {/* <Input placeholder="搜尋  " type="text" /> */}
          <ListStyled to="/milestones">所有里程碑</ListStyled>
          {userData && (
            <>
              <ListStyled to="/groups">所有社團</ListStyled>
              <ListStyled to="/groups/post">發起社團</ListStyled>
              <ListStyled to="/milestones/post">創建里程碑</ListStyled>

              <ListStyled to={`/profile/${userData?.uid}`}>
                <ImgCtn src={userAvatar} />
              </ListStyled>
            </>
          )}
          {!userData && <LoginBtn onClick={showLoginPage}>登入</LoginBtn>}
        </ListContainer>

        {userData && (
          <IconSet>
            <MenuBurger onClick={() => setToggleMobile(!toggleMobile)} />
            <LogoutBtn onClick={handleLogout} />
          </IconSet>
        )}
      </HeaderContainer>
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
        <MobileCtn>
          登出 <LogoutBtn onClick={handleLogout} />
        </MobileCtn>
      </MobileMenu>
    </>
  );
};

export default Header;

const HeaderContainer = styled.div`
  /* max-width: 1200px; */
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  background-color: rgb(255 234 182);
  box-shadow: rgb(0 0 0 / 16%) 0px 5px 11px 0px;
  @media only screen and (max-width: 800px) {
    justify-content: space-between;
  }
`;

const LogoContainer = styled(Link)`
  flex-grow: 1;
  @media only screen and (max-width: 800px) {
    max-width: 200px;
  }
`;

const LogoCtn = styled.img`
  max-width: 300px;
  @media only screen and (max-width: 800px) {
    width: 200px;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 0;
  top: 42px;
  background-color: rgb(255 234 182);
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
  /* padding: 10px; */
  /* border: 1px solid red; */
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
  /* padding: 10px; */
  /* border: 1px solid red; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconSet = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

const ImgCtn = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;
const iconStyle = {
  width: "1.5rem",
  height: "1.5rem",
};

const Close = styled(HiChevronDoubleRight)`
  ${iconStyle}
  display: flex;
  justify-content: start;
`;

const LogoutBtn = styled(HiOutlineLogout)`
  ${iconStyle}
  cursor: pointer;
  @media only screen and (max-width: 800px) {
    /* display: none; */
  }
`;

const MenuBurger = styled(HiMenu)`
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
  margin-right: 1rem;
  display: none;
  @media only screen and (max-width: 800px) {
    display: block;
  }
`;
