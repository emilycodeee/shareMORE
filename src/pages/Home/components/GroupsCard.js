import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

const CardContainer = styled(Link)`
  text-decoration: none;
  color: black;
  /* box-shadow: 0 2px 10px #a2a2a2; */
  border-radius: 5px;
  margin-bottom: 10px;
  height: 320px;
  border-bottom: 4px solid #ffc05a;
  box-shadow: 0px 2px 6px 0px #ffe6b6;
`;

const CoverContainer = styled.div`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  /* height: 150px; */
  background-size: cover;
  background-position: center;
  height: 50%;
  /* border: 10px solid red; */
`;

const ContentContainer = styled.div`
  padding: 1rem;
  background-color: white;
  height: 50%;
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextContainer = styled.div`
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CategoryContainer = styled.div`
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 550;
  background-color: white;
`;

const TitleContainer = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: rgb(242 126 89);
  &:hover {
    color: rgb(255 217 121);
  }
`;

const GroupsCard = ({ item }) => {
  return (
    <CardContainer to={`/group/${item.groupID}`}>
      <CoverContainer
        style={{ backgroundImage: `url(${item.coverImage})` }}
      ></CoverContainer>
      <ContentContainer>
        <TagContainer>
          <CategoryContainer>{item.category}</CategoryContainer>
          <CategoryContainer>{item.subClass}</CategoryContainer>
        </TagContainer>
        <TitleContainer>{item.name}</TitleContainer>
        <TextContainer>{item.introduce}</TextContainer>
      </ContentContainer>
    </CardContainer>
  );
};

export default GroupsCard;
