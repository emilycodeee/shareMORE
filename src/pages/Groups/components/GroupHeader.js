import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  background-color: salmon;
`;

const UlStyled = styled.ul`
  display: flex;
`;

const LiStyled = styled(Link)`
  padding: 10px;
  height: auto;
  display: inline-block;
  background-color: lightblue;
  text-decoration: none;
  margin-right: 10px;
`;

const GroupHeader = ({ content, user, userList }) => {
  console.log(user);
  console.log(content);
  return (
    <Wrapper>
      <UlStyled>
        <LiStyled>分享連結</LiStyled>
        <LiStyled>夥伴列表</LiStyled>
        <LiStyled>社團筆記</LiStyled>

        {content.creatorId === user?.email ? (
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
