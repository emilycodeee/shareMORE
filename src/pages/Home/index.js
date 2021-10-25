import React from "react";
import styled from "styled-components";
import * as firebase from "../../utils/firebase";
import { useState, useEffect } from "react";
import welcome from "../../sources/video.mp4";

import Signin from "../../components/Signin";
import { TopCover, ViderCover, Shield } from "./index.styled";
import GroupsCard from "./components/GroupsCard";
import MilestonesCard from "./components/MilestonesCard";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
`;

const ListCtn = styled.li`
  padding-bottom: 5px;
  display: inline;
  text-align: center;
  margin-right: 10px;
  transition: 0.3s all;
  &:hover {
    border-bottom: 2px solid salmon;
    border-radius: 2px;
  }
`;

const Wrapper = styled.div`
  max-width: 1000px;
  padding: 10px;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-column-gap: 10px;
`;

const Image = styled.img`
  height: 100px;
  border: 1px solid red;
`;

const SectionStyled = styled.section`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LinkStyled = styled(Link)`
  /* text-align: center; */
`;

const HomePage = ({ user, categoriesName, userList, groupList }) => {
  const [groupsIntro, setGroupsIntro] = useState([]);
  const [milestonesIntro, setMilestonesIntro] = useState([]);

  useEffect(() => {
    firebase.getContentsList("groups", setGroupsIntro);
    firebase.getContentsList("articles", setMilestonesIntro);
  }, []);

  // console.log(groupsIntro);
  return (
    <>
      <TopCover>
        <ViderCover autoPlay loop muted>
          <source src={welcome} type="video/mp4" />
        </ViderCover>
        <Shield />
      </TopCover>
      <hr />
      {!user && <Signin />}
      <div>
        <ul>
          {categoriesName.map((item, i) => {
            return (
              <ListCtn key={i}>
                <Link to="/groups/" style={{ textDecoration: "none" }}>
                  {item.value}
                </Link>
              </ListCtn>
            );
          })}
        </ul>
      </div>
      <Container>
        <SectionStyled>
          <div>看看最近大家在學些什麼</div>
          <Wrapper>
            {groupsIntro.map((item) => {
              return <GroupsCard item={item} key={item.groupID} />;
            })}
          </Wrapper>
          <LinkStyled to="/groups">查看更多</LinkStyled>
        </SectionStyled>
        <hr />
        <SectionStyled>
          <div>一起的日子 慶祝我們的里程碑</div>
          <Wrapper>
            {milestonesIntro.map((item) => {
              return (
                <MilestonesCard
                  item={item}
                  key={item.milestoneID}
                  userList={userList}
                  groupList={groupList}
                />
              );
            })}
          </Wrapper>
          <LinkStyled to="/milestones">查看更多</LinkStyled>
        </SectionStyled>
        <button onClick={() => firebase.logOut()}>logOut</button>;
      </Container>
    </>
  );
};

export default HomePage;
