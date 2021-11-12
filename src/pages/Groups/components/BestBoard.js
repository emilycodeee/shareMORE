import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as firebase from "../../../utils/firebase";
import { arrCaculator } from "../../../utils/commonText";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import target from "../../../sources/target.gif";

const BestBoard = () => {
  const { groupID } = useParams();
  const [maxPost, setMaxPost] = useState({});
  const [maxArticles, setMaxArticles] = useState({});
  const [maxBooks, setMaxBooks] = useState({});

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

      const articlesArr = filterPublicArticles.map((a) => a.creatorID);
      setMaxArticles(arrCaculator(articlesArr));
    });
  }, [articlesList]);

  return (
    <WinnerWrapper>
      <SloganLabel>分享，建立學習的正向迴圈</SloganLabel>
      <ItemWp>
        <Link to={`/profile/${maxPost?.userID}`}>
          <Avatat src={getUserData(maxPost?.userID)?.avatar || target} />
        </Link>
        <Detail>
          <PersonName> {getUserData(maxPost?.userID)?.displayName}</PersonName>
          <TextLabelStyle>
            {" "}
            {getUserData(maxPost?.userID)?.introduce}
          </TextLabelStyle>
          <TextStyle>
            {maxPost.point > 0
              ? `發起最多討論 累計 ${maxPost.point} 則`
              : `不用遠行，現在就在留言區發起第一篇討論`}
          </TextStyle>
        </Detail>
      </ItemWp>

      <ItemWp>
        <Link to={`/profile/${maxArticles?.userID}`}>
          <Avatat src={getUserData(maxArticles?.userID)?.avatar || target} />
        </Link>
        <Detail>
          <PersonName>
            {" "}
            {getUserData(maxArticles?.userID)?.displayName}
          </PersonName>
          <TextStyle> {getUserData(maxArticles?.userID)?.introduce}</TextStyle>
          <TextLinkStyle to={`/milestones`}>
            {maxArticles.point > 0
              ? `分享最多文章 累計 ${maxArticles.point} 則`
              : `點我，開始分享第一篇學習成果`}
          </TextLinkStyle>
        </Detail>
      </ItemWp>
      <ItemWp>
        <TextLinkStyle to={`/profile/${maxBooks?.userID}`}>
          <Avatat src={getUserData(maxBooks?.userID)?.avatar || target} />
        </TextLinkStyle>
        <Detail>
          <PersonName>{getUserData(maxBooks?.userID)?.displayName}</PersonName>
          <TextStyle>{getUserData(maxBooks?.userID)?.introduce}</TextStyle>
          <TextLinkStyle to={`/group/${groupID}/bookshelf`}>
            {maxBooks.point > 0
              ? `推薦最多書籍 累計 ${maxBooks.point} 則`
              : `點我，開始建立社團的第一本書`}
          </TextLinkStyle>
        </Detail>
      </ItemWp>
    </WinnerWrapper>
  );
};

export default BestBoard;

const SloganLabel = styled.div`
  font-weight: 800;
  line-height: 20px;
  font-size: 1rem;
  color: black;
  padding-bottom: 1rem;
`;

const PersonName = styled.p`
  font-weight: 700;
  line-height: 20px;
  font-size: 1rem;
`;

const TextLinkStyle = styled(Link)`
  font-weight: 400;
  line-height: 20px;
  font-size: 0.8rem;
  color: rgba(117, 117, 117, 1);
  text-decoration: none;
`;
const TextLabelStyle = styled.div`
  font-weight: 400;
  line-height: 20px;
  font-size: 0.8rem;
  color: rgba(117, 117, 117, 1);
  text-decoration: none;
`;

const TextStyle = styled.div`
  font-weight: 400;
  line-height: 20px;
  font-size: 0.8rem;
  color: rgba(117, 117, 117, 1);
`;

const ItemWp = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
`;

const Avatat = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  margin-right: 10px;
`;

const WinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* text-align: center; */
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
