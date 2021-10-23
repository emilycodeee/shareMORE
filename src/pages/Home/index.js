import React from "react";
import styled from "styled-components";
import * as firebase from "../../utils/firebase";
import { useState, useEffect } from "react";
import welcome from "../../sources/video.mp4";

import Signin from "../../components/Signin";
import { TopCover, ViderCover, Shield } from "./index.styled";
import GroupsCard from "./components/GroupsCard";
import { Link } from "react-router-dom";

// const

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

const HomePage = ({ user, categoriesName }) => {
  const [groupsIntro, setGroupsIntro] = useState([]);

  useEffect(() => {
    firebase.getGroupsList(setGroupsIntro);
  }, []);

  const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    grid-column-gap: 10px;
  `;

  const Image = styled.img`
    height: 100px;
    border: 1px solid red;
  `;

  const SectionStyled = styled.section`
    margin: 10px 20px;
  `;

  console.log(groupsIntro);
  return (
    <div>
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
                <Link key={i} style={{ textDecoration: "none" }} to="/groups/">
                  {item.value}
                </Link>
              </ListCtn>
            );
          })}
        </ul>
      </div>
      <SectionStyled>
        <div>看看最近大家在學些什麼</div>
        <Wrapper>
          {groupsIntro.map((item) => {
            return <GroupsCard item={item} />;
          })}
        </Wrapper>
      </SectionStyled>
      <hr />
      <SectionStyled></SectionStyled>
      <button onClick={() => firebase.logOut()}>logOut</button>;
    </div>
  );
};

export default HomePage;
