import React from "react";
import styled from "styled-components";

import { getGroupBookShelf } from "../../../utils/firebase";
import { arrCaculator } from "../../../utils/common";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
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
    let isMounted = true;
    if (isMounted) {
      if (groupsList) {
        const groupDetail = groupsList.find((g) => g.groupID === groupID);
        const checkMembership =
          groupDetail?.membersList?.includes(userData?.uid) ||
          groupDetail?.creatorID === userData?.uid;
        setIsInsider(checkMembership);
      }

      const sharePostArr = renderPost.map((i) => i.creatorID);
      setMaxPost(arrCaculator(sharePostArr));
      getGroupBookShelf().then((res) => {
        const groupBook = res.filter((b) => b.groupID === groupID);
        const bookSharerArr = groupBook.map((i) => i.groupSharerUid);
        setMaxBooks(arrCaculator(bookSharerArr));
        const filterPublicArticles = articlesList.filter(
          (a) => a.groupID === groupID && a.public === true
        );
        const authorsArr = filterPublicArticles.map((a) => a.creatorID);
        setMaxArticles(arrCaculator(authorsArr));
      });
    }
    return () => {
      isMounted = false;
    };
  }, [articlesList, renderPost, groupsList, userData]);

  return (
    <WinnerWrapper>
      <SloganLabel>
        ?????????????????????
        <img src={trophy} />
      </SloganLabel>
      <SloganLabel>????????????????????????????????????</SloganLabel>
      <ItemWp>
        <div to={`/profile/${maxPost?.userID}`}>
          <Avatar src={getUserData(maxPost?.userID)?.avatar || target} />
        </div>
        <Detail>
          <PersonName> {getUserData(maxPost?.userID)?.displayName}</PersonName>
          <TextStyle>{getUserData(maxPost?.userID)?.introduce}</TextStyle>
          <TextDivStyle winner={maxPost}>
            {maxPost.point > 0
              ? `?????????????????? ?????? ${maxPost.point} ???`
              : isInsder
              ? `??????????????????????????????????????????`
              : `????????????????????????????????????`}
          </TextDivStyle>
        </Detail>
      </ItemWp>

      <ItemWp>
        <div to={`/profile/${maxArticles?.userID}`}>
          <Avatar src={getUserData(maxArticles?.userID)?.avatar || target} />
        </div>
        <Detail>
          <PersonName>
            {getUserData(maxArticles?.userID)?.displayName}
          </PersonName>
          <TextStyle> {getUserData(maxArticles?.userID)?.introduce}</TextStyle>
          <TextDivStyle to={`/milestones`} winner={maxArticles}>
            {maxArticles.point > 0 ? (
              `?????????????????? ?????? ${maxArticles.point} ???`
            ) : isInsder ? (
              <span>
                ???????????????
                <EmptyLink to="/articles/post">??????????????????</EmptyLink>
                ?????????
              </span>
            ) : (
              "????????????????????????????????????"
            )}
          </TextDivStyle>
        </Detail>
      </ItemWp>
      <ItemWp>
        <div to={`/profile/${maxBooks?.userID}`}>
          <Avatar src={getUserData(maxBooks?.userID)?.avatar || target} />
        </div>
        <Detail>
          <PersonName>{getUserData(maxBooks?.userID)?.displayName}</PersonName>
          <TextStyle>{getUserData(maxBooks?.userID)?.introduce}</TextStyle>
          <TextDivStyle winner={maxBooks}>
            {maxBooks.point > 0 ? (
              `?????????????????? ?????? ${maxBooks.point} ???`
            ) : isInsder ? (
              <span>
                ????????????
                <EmptyLink to={`/group/${groupID}/bookshelf`}>
                  ??????????????????
                </EmptyLink>
                ?????????
              </span>
            ) : (
              "????????????????????????????????????"
            )}
          </TextDivStyle>
        </Detail>
      </ItemWp>
    </WinnerWrapper>
  );
};

export default BestBoard;

const WinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
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

const EmptyLink = styled(Link)`
  text-decoration: none;
  color: #f27e59;
  font-weight: 600;
`;

const ItemWp = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PersonName = styled.p`
  font-weight: 700;
  line-height: 20px;
  font-size: 1rem;
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

const TextDivStyle = styled.div`
  font-weight: ${(props) => (props.winner?.point > 0 ? "600" : "400")};
  line-height: 20px;
  font-size: 0.8rem;
  text-decoration: none;
  color: ${(props) =>
    props.winner?.point > 0 ? "#f27e59" : "rgba(117,117,117,1)"};
`;
