import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container>
      <div>
        唉呀...好像哪裡怪怪的，快讓我帶你<Tag to="/">回家</Tag>~
      </div>
      <lottie-player
        src="https://assets5.lottiefiles.com/packages/lf20_sdd6siet.json"
        background="transparent"
        speed="1"
        style={{ maxWidth: "100%", maxHeight: "1000px" }}
        loop
        autoplay
      />
    </Container>
  );
};

export default NotFound;

const Container = styled.div`
  width: 1560px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff4e4;

  div {
    font-size: 1rem;
    margin-top: 3rem;
    font-weight: 600;
    color: rgb(242, 126, 89);
  }
`;

const Tag = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  color: #7a1c00;
`;
