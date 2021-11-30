import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
const MainCtn = styled.div`
  max-width: 1560px;
  width: 80%;
  padding: 1rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 992px) {
    width: 90%;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  display: grid;
  width: 80%;
  padding: 1em;
  align-items: flex-start;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1.2rem;
  grid-row-gap: 1.2rem;
  margin: 0 auto;

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

const ListStyle = styled.li`
  display: flex;
  justify-content: center;
  cursor: pointer;
  list-style: none;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 0.6rem 0;
  @media only screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;

const SubList = styled.li`
  display: ${(props) => (props.active === props.category ? "block" : "none")};
  cursor: pointer;
  list-style: none;
  color: gray;
  font-weight: 550;
  font-size: 1rem;
  padding: 0.4rem 0;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const ContentCtn = styled.div`
  display: flex;
`;

const Side = styled.div`
  width: 20%;
  word-wrap: none;
`;

const TopCtn = styled.div`
  display: flex;
  justify-content: center;
`;

const MoreLink = styled(Link)`
  text-decoration: none;
  font-weight: 700;
`;

const Empty = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 0 10px;
  div {
    margin-top: 1rem;
    font-weight: 600;
    color: rgb(242, 126, 89);
  }
  @media only screen and (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #f27e59;
  margin: 1rem;
  width: 100%;
`;

const SearchIcon = styled(BiSearchAlt2)`
  width: 2rem;
  height: 2rem;
`;

const SContainer = styled.div`
  border: 2px solid #f27e59;
  display: flex;
  justify-content: flex-end;
  border-radius: 100px;
  overflow: hidden;
  font-size: 1.25em;
  position: relative;
  width: 60px;
  height: 60px;
  transition: width 450ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
  padding: 3px;

  &:focus-within {
    width: 100%;

    input {
      opacity: 1;
      z-index: initial;
      cursor: initial;
      width: calc(100% - 60px);
    }

    button {
      background: #f27e59;
      color: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
      &:hover,
      &:focus {
        outline: 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.65);
      }
    }
  }
`;

const SubmitBtn = styled.button`
  font-size: 1.5rem;
  margin-left: auto;
  background: 0;
  border: 0;
  cursor: pointer;
  border-radius: 50%;
  transition: background 200ms ease-out;
  width: calc(60px - 10px);
  height: calc(60px - 10px);
  color: black;
`;

const SearchBarInput = styled.input`
  border: 0;
  padding: 0.25em 1em;
  flex-grow: 1;
  outline: 0;
  z-index: 2;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background: transparent;
  opacity: 0;
  cursor: pointer;
`;

export {
  MainCtn,
  Wrapper,
  ListStyle,
  SubList,
  ContentCtn,
  Side,
  TopCtn,
  MoreLink,
  Empty,
  SearchWrapper,
  SearchIcon,
  SContainer,
  SubmitBtn,
  SearchBarInput,
};
