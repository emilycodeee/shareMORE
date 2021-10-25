import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CardContainer = styled(Link)`
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
  flex-direction: column;
  width: 250px;
  /* justify-content: space-between; */
  /* flex-grow: 1; */
  /* justify-content: space-between; */
`;

const TextContainer = styled.div`
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MilestonesCard = ({ item, userList, groupList }) => {
  const currentCreator = userList.find(
    (data) => data.userID === item.creatorID
  );
  const currentGroup = groupList.find((data) => data.groupID === item.groupID);
  // console.log(currentCreator);
  // console.log(currentGroup);
  return (
    <CardContainer to={`/milestone/${item.milestoneID}`}>
      <CoverContainer style={{ backgroundImage: `url(${item.coverImage})` }}>
        {/* <ImgStyled src={item.coverImage} /> */}
      </CoverContainer>
      <ContentContainer>
        <TagContainer>
          <div>{item.title}</div>
          <div>建立者：{currentCreator?.displayName}</div>
        </TagContainer>
        <TextContainer>社群：{currentGroup.name}</TextContainer>
        <TextContainer>建立於加入社團的第33天</TextContainer>
      </ContentContainer>
    </CardContainer>
  );
};

export default MilestonesCard;
