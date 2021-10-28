import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const TestD = styled.div`
  width: 100%;
  border: 1px solid red;
`;

const CardContainer = styled(Link)`
  text-decoration: none;
  box-shadow: rgb(0 0 0 / 15%) 0px 1px 2px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const CoverContainer = styled.div`
  background-image: url(${(props) => props.item.coverImage});
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 150px;
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

const Card = ({ item }) => {
  const usersList = useSelector((state) => state.usersList);
  const groupsList = useSelector((state) => state.groupsList);
  let currentCreator, currentGroup;
  let url = `/group/${item.groupID}`;
  if (item.milestoneID) {
    currentCreator = usersList.find((data) => data.userID === item.creatorID);
    currentGroup = groupsList.find((data) => data.groupID === item.groupID);
    url = `/milestone/${item.milestoneID}`;
  }

  return (
    <CardContainer to={url}>
      <TestD>
        <CoverContainer item={item}></CoverContainer>
        <ContentContainer>
          <TagContainer>
            <TextContainer>{item.category || item.title}</TextContainer>
            <TextContainer>
              {item.subClass || `by${currentCreator?.displayName} `}
            </TextContainer>
          </TagContainer>
          <TextContainer>{currentGroup?.name || item.name}</TextContainer>
          <TextContainer>
            {item.introduce || "建立於加入社團的第33天"}
          </TextContainer>
        </ContentContainer>
      </TestD>
    </CardContainer>
  );
};

export default Card;
