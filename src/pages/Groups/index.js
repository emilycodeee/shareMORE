import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as firebase from "../../utils/firebase";
import HtmlParser from "react-html-parser";
import styled from "styled-components";
import PostContainer from "./components/PostContainer";
import GroupHeader from "./components/GroupHeader";
import fish from "../../sources/fish.png";
import moreIcon from "../../sources/three-dots.png";

const SectionStyled = styled.section`
  display: flex;
  flex-direction: column;
`;

const MemberContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  padding: 0 10px;
`;

const MemberAvatar = styled.img`
  border-radius: 50%;
  height: 35px;
  margin: 5px;
`;

const memberCard = styled.div`
  border-radius: 50%;
`;

const TopCover = styled.div`
  opacity: 0.8;
  height: 300px;
  border: 1px solid red;
  background-size: cover;
  background-position: center;
`;

const LabelStyled = styled.label`
  text-align: center;
  padding: 10px;
`;

const ContentStyled = styled.div`
  background-color: lightblue;
  padding: 10px;
`;

const GroupPage = ({ user, userList }) => {
  const { groupID } = useParams();
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

    firebase.getMembersList(groupID).then((res) => setRenderMember(res));

    // .then((res) => {
    //   setRenderPost(res);
    // })
    // .catch((err) => console.log(err));
  }, []);

  const postHandler = () => {
    const data = {
      content: textValue,
      creationTime: new Date(),
      creatorID: user.uid,
      groupID: groupID,
    };
    firebase.sendGroupsPost(groupID, data);
    setTextValue("");
  };

  return (
    <div>
      <TopCover style={{ backgroundImage: `url(${content.coverImage})` }} />
      <GroupHeader content={content} user={user} userList={userList} />
      <SectionStyled>
        <LabelStyled>學習夥伴</LabelStyled>
        <MemberContainer>
          {renderMember.map((item) => (
            <MemberAvatar src={fish} key={item.memberID} />
          ))}
        </MemberContainer>
      </SectionStyled>
      <SectionStyled>
        <LabelStyled>社群介紹</LabelStyled>
        <ContentStyled>{content.introduce}</ContentStyled>
      </SectionStyled>
      <SectionStyled>
        <LabelStyled>學習目標</LabelStyled>
        <ContentStyled>{HtmlParser(content.goal)}</ContentStyled>
      </SectionStyled>
      <hr />
      {user !== null && (
        <SectionStyled>
          {/* <label>社團留言板</label> */}
          <textarea
            value={textValue}
            placeholder="說點什麼吧"
            onChange={(e) => setTextValue(e.target.value)}
          />
          <button onClick={postHandler}>發布</button>
          {renderPost?.map((item) => {
            return (
              <PostContainer
                key={item.postID}
                item={item}
                userList={userList}
                user={user}
              />
            );
          })}
        </SectionStyled>
      )}
    </div>
  );
};

export default GroupPage;
