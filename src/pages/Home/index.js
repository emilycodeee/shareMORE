import React from "react";
import styled from "styled-components";
import * as firebase from "../../utils/firebase";
import { useState, useEffect } from "react";
import welcome from "../../sources/video.mp4";

import Signin from "../../components/Signin";
import { TopCover, ViderCover, Shield } from "./index.styled";

// const

const Li = styled.li`
  display: inline;
  text-align: center;
  margin-right: 10px;
  transition: 0.3s all;
  &:hover {
    border-bottom: 2px solid rgb(255 234 182);
    border-radius: 2px;
  }
`;

const HomePage = ({ user }) => {
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
      <div class="container">
        <ul>
          <Li class="one">
            <a href="#">Uno</a>
          </Li>
          <Li class="two">
            <a href="#">Dos</a>
          </Li>
          <Li class="three">
            <a href="#">Tres</a>
          </Li>
          <Li class="four">
            <a href="#">Quatro</a>
          </Li>
        </ul>
      </div>
      <hr />
      <button onClick={() => firebase.logOut()}>logOut</button>;
    </div>
  );
};

export default HomePage;
