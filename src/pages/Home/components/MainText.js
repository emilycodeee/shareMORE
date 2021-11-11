import React from "react";
import styled from "styled-components";

const MainText = () => {
  return (
    <Container>
      {/* <h5>Online education for people of all ages</h5> */}
      <h1>Learn</h1>
      <h1>Anything.</h1>
      <h1>Anytime.</h1>
      <h1>Anywhere.</h1>
      {/* <BtnContainer>
        <button className="readmore">Exploring</button>
        <button>Exploring</button>
      </BtnContainer> */}
    </Container>
  );
};

const BtnContainer = styled.div`
  margin-top: 2rem;
  button {
    background: #f27e59;
    border: none;
    padding: 0.9rem 1.1rem;
    color: #fff;
    border-radius: 1rem;
    box-shadow: 0px 13px 24px -7px #ffae96;
    transition: all 0.3s ease-in-out;
    margin: 0.5rem;
    font-size: 0.8rem;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 17px 16px -11px #ffae96;
      transform: translateY(-5px);
    }
  }

  .readmore {
    color: #81d1ff;
    background: transparent;
    border: 3px solid #81d1ff;
    &:hover {
      box-shadow: 0px 17px 16px -11px #81d1ff;
      transform: translateY(-5px);
    }
  }
`;

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
