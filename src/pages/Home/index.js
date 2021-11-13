import React from "react";
import styled from "styled-components";
import * as firebase from "../../utils/firebase";
import { useState, useEffect } from "react";
import Card from "./components/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import GroupsCard from "./components/GroupsCard";
import Tilt from "react-tilt";
import main from "../../sources/main.png";
import bg from "../../sources/bg.jpg";
import MainText from "./components/MainText";
import { Animated } from "react-animated-css";

const Container = styled.div`
  width: 1000px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff4e4;
`;

const ListWrapper = styled.ul`
  margin: 3rem 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  @media (max-width: 670px) {
    display: none;
  }
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
`;

const Wrapper = styled.div`
  display: grid;
  width: 80%;
  /* padding: 1em; */
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1.4rem;
  grid-row-gap: 2rem;

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
  /* background-color: #fff4e4; ; */
`;

const LinkStyled = styled(Link)`
  margin-top: 1rem;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  background: #f27e59;
  border: none;
  padding: 0.8rem 1.1rem;
  color: #fff4e4;
  border-radius: 1rem;
  transition: all 0.3s ease-in-out;
  margin-left: 0.5rem;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 17px 16px -11px #ffae96;
    transform: translateY(-8px);
  }
`;

const Slogan = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 3rem 0;
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
      <CoverContainer bg={bg}>
        <SecondWrapper>
          <InnerWrapper>
            <Left>
              <MainText />
            </Left>
            {/* options */}
            <TiltWrapper options={{ max: 25 }}>
              <Img src={main} />
            </TiltWrapper>
          </InnerWrapper>
        </SecondWrapper>
      </CoverContainer>
      <div>
        <ListWrapper>
          <CateBtn key="all" onClick={handleSelected}>
            全部
          </CateBtn>
          {categoryList.map((item, i) => {
            return (
              <CateBtn key={i} onClick={handleSelected}>
                {item.name}
              </CateBtn>
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
      <Section>
        <Slogan>一起的日子 分享我們的學習成果</Slogan>
        <Wrapper>
          {filterPublicArticles.slice(0, 8).map((item) => {
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

const Left = styled.div`
  width: 40%;
`;

const Img = styled.img`
  width: 80%;
  margin: 0 10%;
`;

const TiltWrapper = styled(Tilt)`
  width: 60%;
`;

const SecondWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.9);
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    -webkit-backdrop-filter: blur(35px);
    backdrop-filter: blur(35px);
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const CoverContainer = styled.div`
  margin: 0 auto;
  flex-direction: column;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${({ bg }) => bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const InnerWrapper = styled.div`
  width: 800px;
  width: 80%;
  margin: 0 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  padding: 5%;
`;

const CateBtn = styled.div`
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  background: #f27e59;
  border: none;
  padding: 0.8rem 1.1rem;
  color: #fff4e4;
  border-radius: 1rem;
  /* box-shadow: 0px 13px 24px -7px #ffae96; */
  transition: all 0.3s ease-in-out;
  margin-left: 0.5rem;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 17px 16px -11px #ffae96;
    transform: translateY(-8px);
  }
`;
