import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as firebase from "../../../utils/firebase";
import { arrCaculator } from "../../../utils/commonText";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import target from "../../../sources/target.gif";
import trophy from "../../../sources/trophy.png";

const BestBoard = ({ renderPost }) => {
  const { groupID } = useParams();
  const [maxPost, setMaxPost] = useState({});
  const [maxArticles, setMaxArticles] = useState({});
  const [maxBooks, setMaxBooks] = useState({});
  const [isInsder, setIsInsider] = useState(false);

  const userData = useSelector((state) => state.userData);
  const groupsList = useSelector((state) => state.groupsList);
  const articlesList = useSelector((state) => state.articlesList);
  const usersList = useSelector((state) => state.usersList);

  const getUserData = (uid) => {
    return usersList.find((p) => p.uid === uid);
  };

  useEffect(() => {
    if (groupsList) {
      const groupDetail = groupsList.find((g) => g.groupID === groupID);
      const checkMembership =
        groupDetail?.membersList?.includes(userData?.uid) ||
        groupDetail?.creatorID === userData?.uid;
      setIsInsider(checkMembership);
    }

    const userArr = renderPost.map((i) => i.creatorID);
    setMaxPost(arrCaculator(userArr));

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
  }, [articlesList, renderPost, groupsList, userData]);

  return (
    <WinnerWrapper>
      <SloganLabel>
        社團貢獻排行榜
        <img src={trophy} />
      </SloganLabel>
      <SloganLabel>分享，建立學習的正向迴圈</SloganLabel>
      <ItemWp>
        <div to={`/profile/${maxPost?.userID}`}>
          <Avatat src={getUserData(maxPost?.userID)?.avatar || target} />
        </div>
        <Detail>
          <PersonName> {getUserData(maxPost?.userID)?.displayName}</PersonName>
          <TextStyle>{getUserData(maxPost?.userID)?.introduce}</TextStyle>
          <TextDivStyle winner={maxPost}>
            {maxPost.point > 0
              ? `發起最多討論 累計 ${maxPost.point} 則`
              : isInsder
              ? `現在就在留言區發起第一篇討論`
              : `加入社團，一起參與討論吧`}
          </TextDivStyle>
        </Detail>
      </ItemWp>

      <ItemWp>
        <div to={`/profile/${maxArticles?.userID}`}>
          <Avatat src={getUserData(maxArticles?.userID)?.avatar || target} />
        </div>
        <Detail>
          <PersonName>
            {getUserData(maxArticles?.userID)?.displayName}
          </PersonName>
          <TextStyle> {getUserData(maxArticles?.userID)?.introduce}</TextStyle>
          <TextDivStyle to={`/milestones`} winner={maxArticles}>
            {maxArticles.point > 0 ? (
              `分享最多文章 累計 ${maxArticles.point} 則`
            ) : isInsder ? (
              <span>
                成為第一個
                <EmptyLink to="/articles/post">分享學習成果</EmptyLink>
                的人吧
              </span>
            ) : (
              "加入社團，卡位貢獻排行榜"
            )}
          </TextDivStyle>
        </Detail>
      </ItemWp>
      <ItemWp>
        <div to={`/profile/${maxBooks?.userID}`}>
          <Avatat src={getUserData(maxBooks?.userID)?.avatar || target} />
        </div>
        <Detail>
          <PersonName>{getUserData(maxBooks?.userID)?.displayName}</PersonName>
          <TextStyle>{getUserData(maxBooks?.userID)?.introduce}</TextStyle>
          <TextDivStyle winner={maxBooks}>
            {maxBooks.point > 0 ? (
              `推薦最多書籍 累計 ${maxBooks.point} 本`
            ) : isInsder ? (
              <span>
                成為建立
                <EmptyLink to={`/group/${groupID}/bookshelf`}>
                  社團第一本書
                </EmptyLink>
                的人吧
              </span>
            ) : (
              "加入社團，卡位貢獻排行榜"
            )}
          </TextDivStyle>
        </Detail>
      </ItemWp>
    </WinnerWrapper>
  );
};

export default BestBoard;

const EmptyLink = styled(Link)`
  text-decoration: none;
  color: #f27e59;
  font-weight: 600;
`;

const SloganLabel = styled.div`
  font-weight: 800;
  line-height: 20px;
  font-size: 1rem;
  color: black;
  text-align: center;
  img {
    height: 2rem;
  }
`;

const PersonName = styled.p`
  font-weight: 700;
  line-height: 20px;
  font-size: 1rem;
`;

const TextDivStyle = styled.div`
  font-weight: ${(props) => (props.winner?.point > 0 ? "600" : "400")};
  line-height: 20px;
  font-size: 0.8rem;
  text-decoration: none;
  color: ${(props) =>
    props.winner?.point > 0 ? "#f27e59" : "rgba(117,117,117,1)"};
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
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
