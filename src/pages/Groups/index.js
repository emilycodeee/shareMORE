import React from "react";
import { useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import * as firebase from "../../utils/firebase";
import HtmlParser from "react-html-parser";
import styled from "styled-components";
import PostContainer from "./components/PostContainer";
import GroupHeader from "./components/GroupHeader";
import fish from "../../sources/fish.png";
import moreIcon from "../../sources/three-dots.png";
import MemberAvatar from "./components/MemberAvatar";
import { dateCounter } from "../../utils/commonText";

import { useSelector } from "react-redux";

const SectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const MemberContainer = styled.div`
  min-height: 35px;
  box-shadow: 2px 2px 3px #d1cbcb;
  border-radius: 20px;
  border: 1px solid #d1cbcb;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  padding: 0.6rem;
`;

const TopCover = styled.div`
  border-radius: 30px;
  opacity: 0.8;
  margin-bottom: 0.8rem;
  height: 300px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 2px 5px grey;
`;

const LabelStyled = styled.label`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 2px;
  padding: 10px;
`;

const ContentStyled = styled.div`
  line-height: 1.5rem;
  box-shadow: 2px 2px 3px #d1cbcb;
  border-radius: 20px;
  border: 1px solid #d1cbcb;
  padding: 1rem;
`;

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 30px;
  padding: 30px;
  border: 1px solid #3e2914;
`;

const Text = styled.div`
  align-self: center;
`;

const PostArea = styled.textarea`
  resize: none;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  background-color: #eeeeee;
  color: black;
`;

const PostBtn = styled.button`
  margin-top: 0.5rem;
  height: 2rem;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  border-radius: 10px;
  outline: none;
`;

const GoalDate = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GroupPage = () => {
  const userData = useSelector((state) => state.userData);
  const usersList = useSelector((state) => state.usersList);

  const { groupID } = useParams();
  const [showBtn, setShowBtn] = useState(false);
  const [content, setContent] = useState({});
  const [textValue, setTextValue] = useState("");
  const [renderPost, setRenderPost] = useState([]);
  const [renderMember, setRenderMember] = useState([]);

  useEffect(() => {
    firebase
      .getTopLevelContent("groups", groupID)
      .then((res) => setContent(res))
      .catch((err) => console.log(err));
    firebase.postsListener(groupID, setRenderPost);
    firebase.getMembersList(groupID, setRenderMember);
  }, []);

  dateCounter(content.goalDate);

  const postHandler = () => {
    const data = {
      content: textValue,
      creationTime: new Date(),
      creatorID: userData.uid,
      groupID: groupID,
    };
    firebase.sendGroupsPost(groupID, data);
    setShowBtn(false);
    setTextValue("");
  };
  const stationHead = usersList.find(
    (item) => item?.uid === content?.creatorID
  );

  const dateText = ` 預計完成日：${content?.goalDate}，還有
            ${dateCounter(content?.goalDate)} 天`;

  const checkMember =
    (userData !== null && content?.membersList?.includes(userData?.uid)) ||
    content?.creatorID === userData?.uid;
  return (
    <Wrapper>
      <TopCover style={{ backgroundImage: `url(${content.coverImage})` }} />
      <GroupHeader content={content} stationHead={stationHead} />
      <SectionStyled>
        <LabelStyled>學習夥伴</LabelStyled>
        <MemberContainer>
          {renderMember.length === 0 && (
            <Text>再等一下，夥伴們正在火速趕來中</Text>
          )}

          {renderMember.map((item) => (
            <MemberAvatar src={fish} key={item.memberID} data={item} />
          ))}
        </MemberContainer>
      </SectionStyled>
      <SectionStyled>
        <LabelStyled>關於我們</LabelStyled>
        <ContentStyled>{content.introduce}</ContentStyled>
      </SectionStyled>
      <SectionStyled>
        <GoalDate>
          <LabelStyled>學習目標</LabelStyled>
          <LabelStyled>{dateText}</LabelStyled>
        </GoalDate>
        <ContentStyled>{HtmlParser(content.goal)}</ContentStyled>
      </SectionStyled>
      <hr />
      {checkMember && (
        <SectionStyled>
          <PostArea
            value={textValue}
            placeholder="想討論什麼嗎..."
            onFocus={() => {
              setShowBtn(true);
            }}
            onChange={(e) => setTextValue(e.target.value)}
          />
          {showBtn && <PostBtn onClick={postHandler}>留言</PostBtn>}

          {renderPost?.map((item) => {
            return (
              <PostContainer key={item.postID} item={item} content={content} />
            );
          })}
        </SectionStyled>
      )}
    </Wrapper>
  );
};

export default GroupPage;
