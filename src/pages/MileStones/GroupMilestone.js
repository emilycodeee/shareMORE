import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as firebase from "../../utils/firebase";
import { arrCaculator } from "../../utils/commonText";
import Card from "../Home/components/Card";
import { Link } from "react-router-dom";
import GroupHeader from "../Groups/components/GroupHeader";

const GroupMilestone = () => {
  const { groupID } = useParams();
  const [maxPost, setMaxPost] = useState({});
  const [maxArticles, setMaxArticles] = useState({});
  const [maxBooks, setMaxBooks] = useState({});
  const [renderMilestone, setRenderMilestone] = useState([]);
  const userData = useSelector((state) => state.userData);
  const groupsList = useSelector((state) => state.groupsList);
  const articlesList = useSelector((state) => state.articlesList);
  const usersList = useSelector((state) => state.usersList);

  const getUserData = (uid) => {
    return usersList.find((p) => p.uid === uid);
  };

  useEffect(() => {
    firebase.getGroupPost(groupID).then((res) => {
      const userArr = res.map((i) => i.creatorID);
      setMaxPost(arrCaculator(userArr));
    });

    firebase.getGroupBookShelf().then((res) => {
      const groupBook = res.filter((b) => b.groupID === groupID);
      const userArr = groupBook.map((i) => i.groupSharerUid);
      setMaxBooks(arrCaculator(userArr));
      const filterPublicArticles = articlesList.filter(
        (a) => a.groupID === groupID && a.public === true
      );
      setRenderMilestone(filterPublicArticles);
      const articlesArr = filterPublicArticles.map((a) => a.creatorID);
      setMaxArticles(arrCaculator(articlesArr));
    });
  }, [articlesList]);
  // console.log(maxPost);
  // console.log("🎈🎈hk4g", filterPublicArticles);
  // 發起最多里程杯、發起最多討論、推薦最多書籍

  // console.log(maxArticles);

  return (
    <>
      <GroupHeader tag="milestone" />
      <Wrapper>
        <CreateButton to="/milestones/post">分享我的學習成果</CreateButton>
        {renderMilestone.length === 0 && (
          <Empty>
            <div>目前尚未有任何成果分享，就從你開始吧！</div>
            <lottie-player
              src="https://assets4.lottiefiles.com/private_files/lf30_6npzscwg.json"
              background="transparent"
              speed="1"
              style={{ maxWidth: "300px", maxHeight: "300px" }}
              loop
              autoplay
            />
          </Empty>
        )}
        {/* <ImgWrapper>
          <Img src={medallion} />
        </ImgWrapper> */}
        {/* <WinnerWrapper>
          <ItemWp>
            <Link to={`/profile/${maxPost?.userID}`}>
              <Avatat src={getUserData(maxPost?.userID)?.avatar} />
            </Link>
            <div> {getUserData(maxPost?.userID)?.displayName}</div>
            <Link to={`/group/${groupID}`}>
              <h3>發起最多討論</h3>
            </Link>
            <div>共 {maxPost.point} 則</div>
          </ItemWp>
          <ItemWp>
            <Link to={`/profile/${maxArticles?.userID}`}>
              <Avatat src={getUserData(maxArticles?.userID)?.avatar} />
            </Link>
            <div> {getUserData(maxArticles?.userID)?.displayName}</div>
            <Link to={`/milestones`}>
              <h3>分享最多文章</h3>
            </Link>
            <div>共 {maxArticles.point} 則</div>
          </ItemWp>
          <ItemWp>
            <Link to={`/profile/${maxBooks?.userID}`}>
              <Avatat src={getUserData(maxBooks?.userID)?.avatar} />
            </Link>
            <div>{getUserData(maxBooks?.userID)?.displayName}</div>
            <Link to={`/group/${groupID}/bookshelf`}>
              <h3>分享最多書本</h3>
            </Link>
            <div>共 {maxBooks.point} 則</div>
          </ItemWp>
        </WinnerWrapper> */}
        <ContenWrapper>
          {renderMilestone.map((m) => {
            return <Card item={m} key={m.milestoneID} />;
          })}
        </ContenWrapper>
      </Wrapper>
    </>
  );
};

export default GroupMilestone;

const Empty = styled.div`
  /* background-color: red; */
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
  /* padding: 0 3rem; */
  margin: 0 auto;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 1rem 0;
  flex-direction: column;
  /* @media only screen and (max-width: 992px) {
    flex-direction: column;
  } */
`;

const ContenWrapper = styled.div`
  display: grid;
  /* width: 90%; */
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
