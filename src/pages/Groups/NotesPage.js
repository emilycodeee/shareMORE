import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";

const Wrapper = styled.div`
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
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
