import styled from "styled-components";
import { Link } from "react-router-dom";

const Empty = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
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

const CreateButton = styled(Link)`
  border-radius: 4px;
  list-style: none;
  font-weight: 600;
  font-size: 1rem;
  height: auto;
  text-decoration: none;
  cursor: pointer;
  color: #f27e59;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 1rem;
  border: none;
  padding: 0.6rem;
  cursor: pointer;
  border: 1px solid #f27e59;
  background-color: transparent;
  &:hover {
    background-color: #f27e59;
    color: #fff;
  }
`;

const Wrapper = styled.div`
  border-radius: 4px;
  max-width: 1560px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  display: flex;
  background-color: #fff;
  padding: 2rem 0;
  flex-direction: column;
`;

const Notes = styled(Link)`
  box-shadow: 0 2px 4px #a2a2a2;
  text-decoration: none;
  color: black;
  display: flex;
  border-radius: 4px;
  padding: 1rem;
  margin: 0 auto;
  width: 100%;
  justify-content: space-between;
  @media only screen and (max-width: 992px) {
  }
`;

const NotesArea = styled.div`
  width: 90%;
  padding: 0 1rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Content = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  @media only screen and (max-width: 500px) {
    margin: 0;
    width: 100%;
  }
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.itemImg});
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  background-size: cover;
  background-position: center;
  @media only screen and (max-width: 500px) {
    display: none;
  }
`;

const TitleStyle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TimeTag = styled.p`
  align-self: flex-end;
  margin: 3px 0;
  font-size: 12px;
  font-weight: 550;
  color: rgb(111 104 102);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media only screen and (max-width: 992px) {
    align-self: flex-start;
  }
`;

const TextTag = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export {
  Empty,
  CreateButton,
  Wrapper,
  Notes,
  NotesArea,
  Content,
  Cover,
  TitleStyle,
  TimeTag,
  TextTag,
};
