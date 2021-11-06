import React from "react";
import styled from "styled-components";
import * as firebase from "../../utils/firebase";
import { useState, useEffect } from "react";
import v from "../../sources/video.mp4";
import Card from "./components/Card";
import Signin from "../../components/Signin";
import { TopCover, ViderCover, Shield } from "./index.styled";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import GroupsCard from "./components/GroupsCard";
import Fireworks from "../../components/Fireworks";
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ListWrapper = styled.ul`
  margin: 3rem 0;
`;

const ListCtn = styled.div`
  cursor: pointer;
  display: flex;
  padding: 6px 6px;
  border-radius: 20px;
  border: 1px solid rgb(70 69 65);
  font-size: 1.2rem;
  padding-bottom: 5px;
  display: inline;
  text-align: center;
  margin-right: 10px;
  transition: 0.3s all;
  &:hover {
    border-bottom: 2px solid salmon;
    border-radius: 5px;
  }
`;

const Wrapper = styled.div`
  display: grid;
  width: 90%;
  padding: 1em;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1.3em;
  grid-row-gap: 1.3em;

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  margin-bottom: 10px;
`;

const LinkStyled = styled(Link)`
  font-size: 1.2rem;
  text-decoration: none;
  padding: 6px 6px;
  border-radius: 20px;
  border: 1px solid rgb(70 69 65);
`;

const Slogan = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem;
`;

const HomePage = ({ userList, groupList }) => {
  const categoryList = useSelector((state) => state.categoryList);
  const userData = useSelector((state) => state.userData);
  const groupsList = useSelector((state) => state.groupsList);
  const articlesList = useSelector((state) => state.articlesList);
  const [groupsIntro, setGroupsIntro] = useState([]);
  const [milestonesIntro, setMilestonesIntro] = useState([]);
  //  const [milestonesIntro, setMilestonesIntro] = useState([]);
  console.log("groupsListgroupsList", groupsList);
  useEffect(() => {
    setGroupsIntro(groupsList);
    // firebase.getContentsListSort("groups", setGroupsIntro);
    // firebase.getContentsListSort("articles", setMilestonesIntro);
  }, [groupsList]);

  const filterPublicArticles = articlesList.filter((a) => a.public === true);

  const handleSelected = (e) => {
    const target = e.target.textContent;
    const targetFilter = groupsList.filter((g) => g.category === target);
    setGroupsIntro(targetFilter);
  };

  return (
    <Container>
      <TopCover>
        <ViderCover autoPlay loop muted>
          <source src={v} type="video/mp4" />
        </ViderCover>
        <Shield />
      </TopCover>
      <hr />
      {!userData && <Signin />}
      <div>
        <ListWrapper>
          {categoryList.map((item, i) => {
            return (
              <ListCtn key={i} onClick={handleSelected}>
                {/* <div
                to={`/groups/${item.name}`}
                style={{ textDecoration: "none" }}
                > */}
                {item.name}
                {/* </div> */}
              </ListCtn>
            );
          })}
        </ListWrapper>
      </div>
      {/* <Container> */}
      <Section>
        <Slogan>看看最近大家在學些什麼</Slogan>
        <Wrapper>
          {groupsIntro.slice(0, 8).map((item) => {
            return <GroupsCard item={item} key={item.groupID} />;
          })}
        </Wrapper>
        <LinkStyled to="/groups">查看更多</LinkStyled>
      </Section>
      <hr />
      <Section>
        <Slogan>一起的日子 慶祝我們的里程碑</Slogan>
        <Wrapper>
          {filterPublicArticles.slice(0, 8).map((item) => {
            console.log(item);
            return (
              <Card
                item={item}
                key={item.milestoneID}
                userList={userList}
                groupList={groupList}
              />
            );
          })}
        </Wrapper>
        <LinkStyled to="/milestones">查看更多</LinkStyled>
      </Section>
      <button onClick={() => firebase.logOut()}>logOut</button>
      {/* </Container> */}
      <Fireworks />
    </Container>
  );
};

export default HomePage;
