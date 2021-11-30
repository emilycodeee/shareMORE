import styled from "styled-components";
import { Link } from "react-router-dom";

const TopCover = styled.div`
  width: 100%;
  height: 30vw;
  background-size: cover;
  background-position: center;
  margin: 1.5rem 0;
`;

const Container = styled.div`
  max-width: 1560px;
  width: 80%;
  padding: 1rem;
  height: fit-content;
  margin: 0 auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
  gap: 1rem;
  background-color: #fffdfd;
  @media only screen and (max-width: 992px) {
  }
  @media only screen and (max-width: 500px) {
    width: 90%;
    flex-direction: column;
    padding: 10px;
  }
`;

const Wrapper = styled.div`
  border-radius: 4px;
  padding: 30px;
  background-color: #fffdfd;
  border: none;
  @media only screen and (max-width: 992px) {
    width: 100%;
  }
  @media only screen and (max-width: 500px) {
    padding: 10px;
    width: 100%;
  }
`;

const ContentStyle = styled.div`
  height: fit-content;
  margin: 0 auto;
  background-color: #fff;
  img {
    max-width: 100%;
  }

  .ql-editor {
    padding: 12px 0;
    .ql-video {
      width: 800px;
      height: 400px;
    }
  }
`;

const TopArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    margin: 0;
  }
  @media only screen and (max-width: 992px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const EditLink = styled(Link)`
  height: 2rem;
  border-radius: 4px;
  list-style: none;
  font-weight: 600;
  font-size: 0.8rem;
  text-decoration: none;
  color: #f27e59;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: none;
  padding: 5px;
  cursor: pointer;
  border: 1px solid #f27e59;
  background-color: transparent;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
  @media only screen and (max-width: 992px) {
    padding: 2px;
    font-size: 0.6rem;
  }
`;

const EditBtn = styled.button`
  height: 2rem;
  border-radius: 4px;
  list-style: none;
  font-weight: 600;
  font-size: 0.8rem;
  text-decoration: none;
  color: #f27e59;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: none;
  padding: 5px;
  cursor: pointer;
  border: 1px solid #f27e59;
  background-color: transparent;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
  @media only screen and (max-width: 992px) {
    padding: 2px;
    font-size: 0.6rem;
  }
`;

const BtnWrapper = styled.div`
  align-self: flex-end;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
  @media only screen and (max-width: 992px) {
    margin: 0;
  }
`;

const AuthorArea = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const Time = styled.div`
  font-size: 0.8rem;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export {
  TopCover,
  Container,
  Wrapper,
  ContentStyle,
  TopArea,
  EditLink,
  EditBtn,
  BtnWrapper,
  AuthorArea,
  Time,
  TopWrapper,
};
