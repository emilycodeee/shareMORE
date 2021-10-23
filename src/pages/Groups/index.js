import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as firebase from "../../utils/firebase";
import HtmlParser from "react-html-parser";
import styled from "styled-components";
import PostContainet from "./components/PostContainer";
import GroupHeader from "./components/GroupHeader";

const SectionStyled = styled.section`
  display: flex;
  flex-direction: column;
`;

const memberContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
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

const GroupPage = ({ user, userList }) => {
  const { groupID } = useParams();
  const [content, setContent] = useState({});
  const [textValue, setTextValue] = useState("");

  const [renderPost, setRenderPost] = useState([]);

  useEffect(() => {
    firebase.getGroupContent(groupID, setContent);
    firebase.postsListener(groupID, setRenderPost);
  }, []);

  const postHandler = () => {
    const data = {
      content: textValue,
      creationTime: new Date(),
      creatorID: user.email,
    };
    firebase.sendGroupsPost(groupID, data);
    setTextValue("");
  };

  // userList.find((each) => {
  //   each.email === item.creatorID;
  // });
  // console.log(userList);
  return (
    <div>
      <TopCover style={{ backgroundImage: `url(${content.coverImage})` }} />
      <GroupHeader content={content} user={user} userList={userList} />
      <SectionStyled>
        <label>學習夥伴</label>
        {/* <memberContainer></memberContainer> */}
      </SectionStyled>
      <SectionStyled>
        <label>社團介紹</label>
        <div>{content.introduce}</div>
      </SectionStyled>

      <SectionStyled>
        <label>學習目標</label>
        {HtmlParser(content.goal)}
      </SectionStyled>
      <hr />
      <SectionStyled>
        {/* <label>社團留言板</label> */}
        <textarea
          value={textValue}
          placeholder="說點什麼吧"
          onChange={(e) => setTextValue(e.target.value)}
        />
        <button onClick={postHandler}>發布</button>
        {renderPost.map((item) => {
          return <PostContainet item={item} userList={userList} />;
        })}
      </SectionStyled>
    </div>
  );
};

export default GroupPage;
