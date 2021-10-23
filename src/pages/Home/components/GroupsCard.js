import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CartContainer = styled(Link)`
  text-decoration: none;
  box-shadow: rgb(0 0 0 / 15%) 0px 1px 2px;
  transition: transform 0.28s ease-in-out 0s;
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

// style={{ textDecoration: "none" }}
const GroupsCard = ({ item }) => {
  console.log(item);
  return (
    <CartContainer to={`/group/${item.groupID}`}>
      <CoverContainer style={{ backgroundImage: `url(${item.coverImage})` }}>
        {/* <ImgStyled src={item.coverImage} /> */}
      </CoverContainer>
      <ContentContainer>
        <TagContainer>
          <TextContainer>{item.category}</TextContainer>
          <TextContainer>{item.subClass}</TextContainer>
        </TagContainer>
        <TextContainer>{item.name}</TextContainer>
        <TextContainer>{item.introduce}</TextContainer>
      </ContentContainer>
    </CartContainer>
  );
};

export default GroupsCard;
