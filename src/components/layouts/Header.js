import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import Signin from "./Signin";

const HeaderContainer = styled.div`
  border: 1px solid salmon;
  display: flex;
`;

const LogoContainer = styled(Link)`
  font-size: 50px;
`;

const ListContainer = styled.ul`
  display: flex;
`;

const ListStyled = styled(Link)`
  /* color: blue; */
  list-style: none;
`;

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  const loginHandler = () => {
    setShowLogin(!showLogin);
  };

  if (showLogin) {
    return <Signin />;
  }

  return (
    <HeaderContainer>
      <LogoContainer to="/">LOGO</LogoContainer>
      <ListContainer>
        <ListStyled to="/milestone/post">我們的里程碑</ListStyled>
        <input placeholder="搜尋" type="text" />
        <button onClick={loginHandler}>登入/註冊</button>
      </ListContainer>
    </HeaderContainer>
  );
};

export default Header;
