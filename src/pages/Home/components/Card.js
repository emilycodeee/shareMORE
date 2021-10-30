import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CardContainer = styled(Link)`
  text-decoration: none;
  color: black;
  /* box-shadow: rgb(0 0 0 / 15%) 0px 1px 2px; */
  box-shadow: 0 2px 10px #a2a2a2;
  border-radius: 10px;
  margin-bottom: 10px;
  height: 280px;
  overflow: hidden;
  /* padding: 5px 10px; */
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
  padding: 8px 5px;
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  font-weight: 550;
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
  /* font-size: 14px; */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// color: rgb(255 182 0);
const SubTitle = styled.div`
  font-weight: 550;
  color: rgb(255 182 0);
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
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
        {/* <TagContainer> */}
        <TitleContainer>{item.title}</TitleContainer>
        <Author>{`by${currentCreator?.displayName} `}</Author>
        {/* </TagContainer> */}
        <SubTitle>{`啟發自：${currentGroup?.name}`}</SubTitle>
        <TextContainer>
          {item.introduce || "建立於加入社團的第33天"}
        </TextContainer>
      </ContentContainer>
    </CardContainer>
  );
};

export default Card;
