import React from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router";
import { useState, useEffect } from "react";
import * as firebase from "../../utils/firebase";
import { useSelector } from "react-redux";
import HtmlParser from "react-html-parser";
import { convertTime } from "../../utils/commonText";

// const Test = styled.figure`
//   background-image: url("https://d30ytfzugopzcu.cloudfront.net/2018/11/6-useful-taiwanese-learning-resources.jpg");
// `;

const TopCover = styled.div`
  /* opacity: 0.8; */

  width: 700px;
  height: 300px;
  /* border: 1px solid red; */
  background-size: cover;
  background-position: center;
  /* margin: 0 auto; */
  margin-top: 2rem;
`;

const Wrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafa;
`;

const ContentStyle = styled.div`
  padding: 1rem;
`;

const CoverImg = styled.img``;

const NotePage = () => {
  const { groupID, postID } = useParams();
  const groupsList = useSelector((state) => state.groupsList);
  const currentGroupData = groupsList.find((item) => item.groupID === groupID);
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    firebase
      .getGroupsNoteContent("groups", groupID, "notes", postID)
      .then((res) => setNoteContent(res))
      .catch((err) => console.log(err));
  }, []);

  console.log(noteContent);

  return (
    <Wrapper>
      <TopCover
        style={{ backgroundImage: `url(${noteContent?.coverImage})` }}
      />

      <h1>{noteContent.title}</h1>
      <label>{convertTime(noteContent?.creationTime)}</label>
      <ContentStyle>
        <div className="ql-editor">{HtmlParser(noteContent?.content)}</div>
      </ContentStyle>
    </Wrapper>
  );
};

export default NotePage;
