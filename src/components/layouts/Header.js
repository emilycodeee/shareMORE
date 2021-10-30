import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import SigninPopup from "../SigninPopup";
import logo from "../../sharemore.png";
import chat from "../../sources/chat.png";

const LogoCtn = styled.img`
  max-width: 315px;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: rgb(255 234 182);
  /* background-color: rgb(246 246 246); */
  box-shadow: rgb(0 0 0 / 16%) 0px 5px 11px 0px;
`;

const LogoContainer = styled(Link)`
  flex-grow: 1;
`;

const ListContainer = styled.ul`
  display: flex;
  align-items: center;
`;

const ListStyled = styled(Link)`
  font-weight: 600;
  margin: 0 20px;
  list-style: none;
  text-decoration: none;
`;

const LoginBtn = styled.button`
  margin-right: 20px;
  height: 3em;
  cursor: pointer;
  font-weight: 600;
  border-radius: 6px;
  background-color: transparent;
  border: 1px solid #fff;
  color: black;
  text-decoration: none;
  &:hover {
    background-color: white;
    color: rgb(255 234 182);
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

const ImgCtn = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const Input = styled.input`
  float: left;
  width: 3rem;
  height: 2rem;
  padding: 0 15px;
  border: 1px solid var(--light);
  background-color: #eceff1;
  border-radius: 21px;
`;

const Header = () => {
  const userData = useSelector((state) => state.userData);
  const usersList = useSelector((state) => state.usersList);
  const [showLogin, setShowLogin] = useState(false);

  const currentUser = usersList.find((item) => item.uid === userData?.uid);

  console.log("dddddddddddddd", currentUser);

  const userAvatar =
    currentUser?.avatar ||
    "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2FkilakilaAvatar.png?alt=media&token=1a597182-f899-4ae1-8c47-486b3e2d5add";

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
    <HeaderContainer>
      <LogoContainer to="/">
        <LogoCtn src={logo} />
      </LogoContainer>
      <ListContainer>
        <Input placeholder="搜尋" type="text" />
        <ListStyled to="/milestones">我們的里程碑</ListStyled>
        {userData && (
          <>
            {/* <ListStyled to="/mygroups">我們的社群</ListStyled> */}
            <ListStyled to="/groups/post">發起社群</ListStyled>
            <ListStyled to="/messages/ ">
              <ImgCtn src={chat} />
            </ListStyled>
            <ListStyled to={`/profile/${userData?.uid}`}>
              <ImgCtn src={userAvatar} />
            </ListStyled>
          </>
        )}
        {!userData && <LoginBtn onClick={showLoginPage}>登入/註冊</LoginBtn>}
      </ListContainer>
    </HeaderContainer>
  );
};

export default Header;
