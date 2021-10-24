import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  background-color: salmon;
`;

const UlStyled = styled.ul`
  display: flex;
`;

const LiStyled = styled.li`
  padding: 10px;
  height: auto;
  display: inline-block;
  background-color: lightblue;
  text-decoration: none;
  margin-right: 10px;
`;

const LinkStyled = styled(Link)`
  padding: 10px;
  height: auto;
  display: inline-block;
  background-color: lightblue;
  text-decoration: none;
  margin-right: 10px;
`;

const GroupHeader = ({ content, user, userList }) => {
  // console.log(user);
  // console.log(content);
  const location = useLocation();
  console.log("🖼", location);
  return (
    <Wrapper>
      <UlStyled>
        <LiStyled>分享連結</LiStyled>
        <LinkStyled to={`${location.pathname}/members`}>夥伴列表</LinkStyled>
        <LinkStyled to={`${location.pathname}/notes`}>社群筆記</LinkStyled>

        {content.creatorID === user?.uid ? (
          <LiStyled>待審申請</LiStyled>
        ) : (
          <LiStyled>申請加入</LiStyled>
        )}
        {/* <LiStyled>申請加入</LiStyled> */}
        {/* <li>待審申請</li> */}
      </UlStyled>
    </Wrapper>
  );
};

export default GroupHeader;
