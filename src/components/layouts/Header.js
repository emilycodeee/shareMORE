import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

import SigninPopup from "../SigninPopup";
import logo from "../../sharemore.png";
import userIcon from "../../sources/user.png";
import chat from "../../sources/chat.png";

const LogoCtn = styled.img`
  color: white;
  height: 64px;
`;

const HeaderContainer = styled.div`
  /* float: left; */
  border: 1px solid salmon;
  display: flex;

  align-items: center;
  background-color: rgb(255 234 182);
`;

const LogoContainer = styled(Link)`
  /* font-size: 50px; */
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
  height: 40px;
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
  height: 30px;
`;

const Header = ({ user }) => {
  const [showLogin, setShowLogin] = useState(false);

  console.log(showLogin);

  const showLoginPage = () => {
    setShowLogin(!showLogin);
  };

  if (!user && showLogin) {
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
        <input placeholder="搜尋" type="text" />
        <ListStyled to="/milestone/post">我們的里程碑</ListStyled>
        {user && (
          <>
            <ListStyled to="/mygroups">我的社群</ListStyled>
            <ListStyled to="/groups/post">發起社群</ListStyled>
            <ListStyled to="/messages">
              <ImgCtn src={chat} />
            </ListStyled>
            <ListStyled to="/profile">
              <ImgCtn src={userIcon} />
            </ListStyled>
          </>
        )}
        {!user && <LoginBtn onClick={showLoginPage}>登入/註冊</LoginBtn>}
      </ListContainer>
    </HeaderContainer>
  );
};

export default Header;
