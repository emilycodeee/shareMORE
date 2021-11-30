import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 1560px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff4e4;
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

const Left = styled.div`
  width: 40%;
`;

const caret = keyframes`
0% { transform: translate(0px) }
100% {transform: translateY(-10px) }
`;

const Animation = styled.div`
  animation: 1.3s ease-in-out 2.7s infinite alternate none running ${caret};
`;
const Img = styled.img`
  width: 80%;
  margin: 0 10%;
  transform: rotate(2deg);
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
  transition: all 0.3s ease-in-out;
  margin-left: 0.5rem;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 17px 16px -11px #ffae96;
    transform: translateY(-8px);
  }
`;

const Empty = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 0 10px;
  margin-bottom: 10px;
  gap: 1rem;
  div {
    margin-top: 1rem;
    font-weight: 600;
    color: rgb(242, 126, 89);
  }
  @media only screen and (max-width: 500px) {
    font-size: 0.8rem;
  }
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

const Wrapper = styled.div`
  display: grid;
  width: 80%;
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

const SynopsisWrap = styled.div`
  margin-top: 3rem;
  display: grid;
  align-items: baseline;
  width: 90%;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1.4rem;
  grid-row-gap: 2rem;
  /* @media only screen and (max-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr;
  } */

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 600px) {
    width: 80%;
    grid-template-columns: 1fr;
  }
`;
const SynopsisImg = styled.img`
  margin: 0 10%;
  width: 80%;
`;

const SynopsisItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  span {
    font-weight: 600;
  }

  p {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    /* height: 20vh; */
  }
`;

const SynopsisTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;

  text-decoration: underline;
  text-decoration-color: #f27e59;
  text-decoration-thickness: 3px;
`;

export {
  SynopsisItem,
  SynopsisTitle,
  SynopsisWrap,
  SynopsisImg,
  Container,
  CoverContainer,
  SecondWrapper,
  InnerWrapper,
  Left,
  Animation,
  Img,
  CateBtn,
  Empty,
  ListWrapper,
  Wrapper,
  Section,
  LinkStyled,
  Slogan,
};
