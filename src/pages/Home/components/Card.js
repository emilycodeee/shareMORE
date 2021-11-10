import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CardContainer = styled(Link)`
  text-decoration: none;
  color: black;
  border-radius: 5px;
  height: 320px;
  /* height: 100%; */
  position: relative;
  border-bottom: 4px solid #f27e59;
  box-shadow: 0px 2px 6px 0px #ffd3c6;
`;

const CoverContainer = styled.div`
  background-image: url(${(props) => props.item.coverImage});
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 50%;
  background-size: cover;
  background-position: center;
`;

const ContentContainer = styled.div`
  height: 50%;
  padding: 1rem;
  background-color: #fff;
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
  font-size: 0.8rem;
`;

const SubTitle = styled.div`
  font-weight: 550;
  color: #f27e59;
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
      <Avatar src={currentCreator?.avatar} />
      <CoverContainer item={item}></CoverContainer>
      <ContentContainer>
        <TitleContainer>{item.title}</TitleContainer>
        <Author>{`by ${currentCreator?.displayName} `}</Author>
        <SubTitle>{`啟發自：${currentGroup?.name}`}</SubTitle>
        <TextContainer>{item.introduce}</TextContainer>
      </ContentContainer>
    </CardContainer>
  );
};

export default Card;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  background-color: rgb(65, 36, 3);
  position: absolute;
  top: -30px;
  left: 20%;
  border: 2px solid #fff;
  transform: translateX(-50%);
  border-radius: 50%;
`;
