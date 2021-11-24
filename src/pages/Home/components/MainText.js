import React from "react";
import styled from "styled-components";

const MainText = () => {
  return (
    <Container>
      <h1>Learn</h1>
      <h1>Anything.</h1>
      <h1>Anytime.</h1>
      <h1>Anywhere.</h1>
    </Container>
  );
};

const Container = styled.div`
  padding: 1vw;
  h1 {
    font-size: 3.5vw;
    font-weight: 900;
    margin: 0 auto;
    margin: 0;

    &:nth-of-type(1) {
      color: #ff511d;
    }
    &:nth-of-type(2) {
      color: #e56737;
    }
    &:nth-of-type(3) {
      color: #a73905;
    }
    &:nth-of-type(4) {
      color: #7a1c00;
    }
  }
`;

export default MainText;
