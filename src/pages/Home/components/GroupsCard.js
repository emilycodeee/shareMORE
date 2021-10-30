import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CardContainer = styled(Link)`
  text-decoration: none;
  color: black;
  box-shadow: 0 2px 10px #a2a2a2;
  /* box-shadow: rgb(0 0 0 / 15%) 0px 1px 2px;
  transition: transform 0.28s ease-in-out 0s; */
  border-radius: 10px;
  margin-bottom: 10px;
`;

const CoverContainer = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 150px;
  /* overflow: hidden; */
  /* position: absolute; */
  background-size: cover;
  background-position: center;
`;

const ContentContainer = styled.div`
  padding: 10px 3px;
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
`;

const TitleContainer = styled.div`
  font-weight: 550;
  margin-bottom: 10px;
  color: rgb(255 182 0);
  &:hover {
    color: rgb(255 217 121);
  }
`;

// style={{ textDecoration: "none" }}
const GroupsCard = ({ item }) => {
  // console.log(item);
  return (
    <CardContainer to={`/group/${item.groupID}`}>
      <CoverContainer style={{ backgroundImage: `url(${item.coverImage})` }}>
        {/* <ImgStyled src={item.coverImage} /> */}
      </CoverContainer>
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
