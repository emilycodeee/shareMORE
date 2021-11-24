import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ItemWrapper = styled.div`
  border-bottom: 1px solid rgb(219, 216, 214);
  gap: 10px;
  margin-bottom: 1rem;
  display: flex;
  padding: 1rem;
  @media only screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const CoverContainer = styled.div`
  background-image: url(${(props) => props.item.coverImage});
  border-radius: 5px;
  height: 150px;
  width: 150px;
  background-size: cover;
  background-position: center;
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
`;

const ItemInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
`;

const CategorySet = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  div {
    font-weight: 600;
  }
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;

const ContentCards = ({ item }) => {
  let url = `/group/${item.groupID}`;
  if (item.milestoneID) {
    url = `/article/${item.milestoneID}`;
  }

  return (
    <LinkStyle to={url}>
      <ItemWrapper>
        <div>
          <CoverContainer item={item} />
        </div>
        <ItemInfo>
          <Title>{item.name || item.title}</Title>
          {!item.milestoneID && (
            <CategorySet>
              <div>{item.category}</div>
              <div>{item.subClass}</div>
            </CategorySet>
          )}
          <div>{item.introduce}</div>
        </ItemInfo>
      </ItemWrapper>
    </LinkStyle>
  );
};

export default ContentCards;
