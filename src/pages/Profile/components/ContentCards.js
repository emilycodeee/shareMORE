import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ItemWrapper = styled.div`
  border-bottom: 1px solid rgb(219, 216, 214);
  /* border-radius: 10px; */
  gap: 10px;
  margin-bottom: 1rem;
  display: flex;
  padding: 1rem;
  /* box-shadow: rgb(0 0 0 / 10%) 0px 2px 6px; */
`;

const CoverContainer = styled.div`
  background-image: url(${(props) => props.item.coverImage});
  border-radius: 10px;
  height: 150px;
  width: 150px;
  background-size: cover;
  background-position: center;
`;

const ItemInfo = styled.div`
  /* margin-left: 1rem; */
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
  gap: 10px;
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
  /* margin-bottom: 10px; */
`;

const Category = styled.div`
  font-weight: 600;
  margin-left: 10px;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;

const ContentCards = ({ item }) => {
  let url = `/group/${item.groupID}`;
  if (item.milestoneID) {
    url = `/milestone/${item.milestoneID}`;
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
