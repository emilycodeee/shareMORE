import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CardContainer = styled(Link)`
  text-decoration: none;
  color: black;
  box-shadow: 0 2px 10px #a2a2a2;
  border-radius: 5px;
  margin-bottom: 10px;
  height: 280px;
  overflow: hidden;
`;

const CoverContainer = styled.div`
  background-image: url(${(props) => props.item.coverImage});
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 150px;
  background-size: cover;
  background-position: center;
`;

const ContentContainer = styled.div`
  padding: 1rem;
`;

const TitleContainer = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Author = styled.div`
  margin-bottom: 8px;
  text-align: right;
`;

const TextContainer = styled.div`
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubTitle = styled.div`
  font-weight: 550;
  color: rgb(255 182 0);
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: rgb(255 217 121);
  }
`;

const Card = ({ item }) => {
  const usersList = useSelector((state) => state.usersList);
  const groupsList = useSelector((state) => state.groupsList);
  let currentCreator, currentGroup;
  let url = `/group/${item.groupID}`;
  if (item.milestoneID) {
    currentCreator = usersList.find((data) => data.uid === item.creatorID);
    currentGroup = groupsList.find((data) => data.groupID === item.groupID);
    url = `/milestone/${item.milestoneID}`;
  }

  return (
    <CardContainer to={url}>
      <CoverContainer item={item}></CoverContainer>
      <ContentContainer>
        <TitleContainer>{item.title}</TitleContainer>
        <Author>{`by${currentCreator?.displayName} `}</Author>
        <SubTitle>{`啟發自：${currentGroup?.name}`}</SubTitle>
        <TextContainer>{item.introduce}</TextContainer>
      </ContentContainer>
    </CardContainer>
  );
};

export default Card;
