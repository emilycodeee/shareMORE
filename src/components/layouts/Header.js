import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import SigninPopup from "../SigninPopup";
import logo from "../../sharemore.png";
import chat from "../../sources/chat.png";
import search from "../../sources/search.png";

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

// const Input = styled.input`
//   width: 15%;
//   border-radius: 25px;
//   box-shadow: none;
//   border: 1px solid rgb(204, 204, 204);
//   padding: 4px 0px 4px 50px;
//   font-size: 18px;
//   background-color: #f5f5f5;
//   /* float: left;
//   width: 3rem;
//   height: 2rem;
//   padding: 0 15px;
//   border: 1px solid var(--light);
//   background-color: #eceff1;
//   border-radius: 21px; */
// `;

const Input = styled.input`
  width: 50px;
  height: 20px;
  padding: 10px;
  border: none;
  border-radius: 25px;
  outline: none;
  font-size: 16px;
  background-image: url(${search});
  background-position: right center;
  background-repeat: no-repeat;
  background-size: 32px;
  cursor: pointer;
  background-color: rgb(255 234 182);
  /* position: absolute;
  right: 5px; */

  &:focus {
    padding: 8px 48px 8px 20px;
    border: solid 1px #979797;
    left: 10px;
    cursor: text;
  }
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
        <Input placeholder="搜尋  " type="text" />
        <ListStyled to="/milestones">我們的里程碑</ListStyled>
        {userData && (
          <>
            <ListStyled to="/groups">所有社群</ListStyled>
            <ListStyled to="/groups/post">發起社群</ListStyled>
            <ListStyled to="/milestones/post">發表里程碑</ListStyled>
            {/* <ListStyled to="/messages/ ">
              <ImgCtn src={chat} />
            </ListStyled> */}
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
