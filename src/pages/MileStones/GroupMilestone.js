import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../Home/components/Card";
import { Link } from "react-router-dom";
import GroupHeader from "../Groups/components/GroupHeader";
import { DisappearedLoading } from "react-loadingg";

const GroupMilestone = () => {
  const { groupID } = useParams();
  const [renderMilestone, setRenderMilestone] = useState([]);
  const [isInsider, setIsInsider] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.userData);
  const groupsList = useSelector((state) => state.groupsList);
  const articlesList = useSelector((state) => state.articlesList);

  useEffect(() => {
    if (groupsList.length > 0) {
      const groupDetail = groupsList.find((g) => g.groupID === groupID);
      const checkMembership =
        groupDetail?.membersList?.includes(userData?.uid) ||
        groupDetail?.creatorID === userData?.uid;
      const filterPublicArticles = articlesList.filter(
        (a) => a.groupID === groupID && a.public === true
      );
      setRenderMilestone(filterPublicArticles);
      setIsInsider(checkMembership);
      setIsLoading(false);
    }
  }, [userData, groupsList, articlesList]);

  if (userData === undefined || isLoading) {
    return <DisappearedLoading />;
  } else if (!isLoading) {
    return (
      <>
        <GroupHeader tag="milestone" />
        <Wrapper>
          {isInsider && (
            <CreateButton to="/articles/post">分享我的學習成果</CreateButton>
          )}
          {renderMilestone.length === 0 && (
            <Empty>
              <div>
                目前尚未有任何成果分享
                {isInsider && `，就從你開始吧！`}
              </div>
              <lottie-player
                src="https://assets5.lottiefiles.com/packages/lf20_n2m0isqh.json"
                background="transparent"
                speed="1"
                style={{ maxWidth: "250px", maxHeight: "250px" }}
                loop
                autoplay
              />
            </Empty>
          )}

          <ContenWrapper>
            {renderMilestone.map((m) => {
              return <Card item={m} key={m.milestoneID} />;
            })}
          </ContenWrapper>
        </Wrapper>
      </>
    );
  }
};

export default GroupMilestone;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 1rem;
  div {
    margin-top: 1rem;
    font-weight: 600;
    color: rgb(242, 126, 89);
  }
  @media only screen and (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

const CreateButton = styled(Link)`
  border-radius: 4px;
  list-style: none;
  font-weight: 600;
  font-size: 1rem;
  height: auto;
  text-decoration: none;
  cursor: pointer;
  color: #f27e59;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 2rem;
  border: none;
  padding: 0.6rem;
  cursor: pointer;
  border: 1px solid #f27e59;
  background-color: transparent;
  &:hover {
    background-color: #f27e59;
    color: #fff;
  }
`;

const Wrapper = styled.div`
  border-radius: 4px;
  max-width: 1560px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 1rem 0;
  flex-direction: column;
`;

const ContenWrapper = styled.div`
  display: grid;
  padding: 1em;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 80%;
  grid-column-gap: 1.4rem;
  grid-row-gap: 2rem;

  @media only screen and (max-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
