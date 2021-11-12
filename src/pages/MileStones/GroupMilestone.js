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
      <GroupHeader />
      <Wrapper>
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

const ItemWp = styled.div`
  border: 1px solid black;
  background-color: #f6f6f6;
  padding: 1rem;
`;

const Img = styled.img`
  width: 18vmin;
  height: 18vmin;
  margin: 0 auto;
  text-align: center;
`;

const ImgWrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
`;

const Avatat = styled.img`
  height: 15vmin;
  width: 15vmin;
  border-radius: 50%;
`;

const WinnerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  padding: 1rem;

  gap: 1rem;
`;

const Wrapper = styled.div`
  border-radius: 4px;
  max-width: 1560px;
  width: 80%;
  /* padding: 0 3rem; */
  margin: 0 auto;
  margin-bottom: 1.5rem;
  display: flex;
  background-color: #fff;
  padding: 1rem 0;
  @media only screen and (max-width: 992px) {
    flex-direction: column;
  }
  /* border-radius: 8px;
  max-width: 1560px; */
  /* width: 100%; */
  /* border: 1px solid red;
  margin: 0 auto;
  margin-bottom: 1rem;
  border: 30px solid rgb(255 193 174);
  width: 80%;
  padding: 0 10%; */
  /* margin: 0 10%; */
`;

const ContenWrapper = styled.div`
  display: grid;
  /* width: 90%; */
  padding: 1em;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1.3em;
  grid-row-gap: 1.3em;

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`;
