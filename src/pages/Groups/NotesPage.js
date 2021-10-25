import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import fish from "../../sources/fish.png";
import comment from "../../sources/comment.png";
import clap from "../../sources/claped.png";
const Avatar = styled.img`
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  /* border: 1px solid red; */
  /* height: 30px; */
`;

const Wrapper = styled.div`
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const Personal = styled.div`
  margin-bottom: 10px;
  border: 1px solid red;
`;
const CountWrapper = styled.div`
  /* border: 2px solid red; */
  display: flex;
  position: relative;
`;

const Count = styled.div`
  position: absolute;
  top: 0;
  right: -10px;
  font-size: 12px;
`;

const PersonalHeader = styled.div`
  display: flex;
  align-items: center;
`;
const IconWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  border: 1px solid red;
  margin-top: 10px;
`;

const IconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: lightblue;
  }
`;

const Icon = styled.img`
  height: 15px;
  margin: 0 auto;
  cursor: pointer;
`;

const NotesPage = () => {
  const { groupID } = useParams();

  return (
    <Wrapper>
      <div>{groupID}</div>
      <textarea placeholder="留下你的自我介紹吧" />
    </Wrapper>
  );
};

export default NotesPage;
