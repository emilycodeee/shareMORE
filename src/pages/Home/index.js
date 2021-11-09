import React from "react";
import styled from "styled-components";
import * as firebase from "../../utils/firebase";
import { useState, useEffect } from "react";
import discover from "../../sources/discover.mp4";
import Card from "./components/Card";
import Signin from "../../components/Signin";
// import { TopCover, ViderCover, Shield } from "./index.styled";
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
  margin: 3rem 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
`;

const ListCtn = styled.div`
  cursor: pointer;
  padding: 6px;
  border-radius: 20px;
  border: 1px solid rgb(70 69 65);
  font-size: 1.2rem;

  background-color: rgb(255 221 137);
  color: rgb(44 33 6);
  font-weight: 600;

  text-align: center;

  /* &:hover {
    border-bottom: 2px solid salmon;
    border-radius: 5px;
  } */
`;

const Wrapper = styled.div`
  display: grid;
  width: 90%;
  padding: 1em;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1.2rem;
  grid-row-gap: 1.2rem;

  @media only screen and (max-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 90%;
  margin-bottom: 10px;
`;

const LinkStyled = styled(Link)`
  font-size: 1.2rem;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid rgb(70 69 65);
  margin-top: 2rem;
  color: rgb(44 33 6);
  font-weight: 660;
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

  useEffect(() => {
    setGroupsIntro(groupsList);
  }, [groupsList]);

  const filterPublicArticles = articlesList.filter((a) => a.public === true);

  const handleSelected = (e) => {
    const target = e.target.textContent;

    const targetFilter = groupsList.filter((g) => g.category === target);
    setGroupsIntro(targetFilter);
    if (target === "全部") {
      setGroupsIntro(groupsList.slice(0, 8));
    }
  };

  return (
    <Container>
      <TopCover>
        <ViderCover autoPlay loop muted>
          <source src={discover} type="video/mp4" />
        </ViderCover>
        <Shield />
      </TopCover>
      <hr />
      {!userData && <Signin />}
      <div>
        <ListWrapper>
          <ListCtn key="all" onClick={handleSelected}>
            全部
          </ListCtn>
          {categoryList.map((item, i) => {
            return (
              <ListCtn key={i} onClick={handleSelected}>
                {item.name}
              </ListCtn>
            );
          })}
        </ListWrapper>
      </div>
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
    </Container>
  );
};

export default HomePage;

const TopCover = styled.div`
  padding: 0;
  margin: 0;

  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;

  @media only screen and (max-width: 800px) {
    height: 100vh;
  }
`;

const ViderCover = styled.video`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: auto;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Shield = styled.div`
  z-index: 3;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
`;
