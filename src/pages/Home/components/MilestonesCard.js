import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";

const CardContainer = styled(Link)`
  width: 100%;
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
const MilestonesCarf = ({ item, userList, groupList }) => {
  // console.log(item);
  let currentCreator, currentGroup;
  let url = `/group/${item.groupID}`;
  if (userList) {
    currentCreator = userList.find((data) => data.userID === item.creatorID);
    currentGroup = groupList.find((data) => data.groupID === item.groupID);
    url = `/milestone/${item.milestoneID}`;
  }

  // if (userList)
  return (
    <CardContainer to={url}>
      <div>
        <CoverContainer style={{ backgroundImage: `url(${item.coverImage})` }}>
          {/* <ImgStyled src={item.coverImage} /> */}
        </CoverContainer>
        <ContentContainer>
          <TagContainer>
            <TextContainer>{item.category || item.title}</TextContainer>
            <TextContainer>
              {item.subClass || `by ${currentCreator?.displayName}`}
            </TextContainer>
          </TagContainer>
          <TextContainer>{currentGroup?.name || item.name}</TextContainer>
          <TextContainer>
            {item.introduce || "建立於加入社團的第33天"}
          </TextContainer>
        </ContentContainer>
      </div>
    </CardContainer>
  );
};

export default Card;
