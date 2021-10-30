import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as firebase from "../../utils/firebase";
import HtmlParser from "react-html-parser";
import styled from "styled-components";
// import "react-quill/dist/quill.snow.css";
import "../../../node_modules/react-quill/dist/quill.snow.css";
// import PostContainer from "./components/PostContainer";
// import GroupHeader from "./components/GroupHeader";

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

const Wrapper = styled.div`
  margin: 30px;
  border-radius: 30px;
  padding: 30px;
  border: 1px solid #3e2914;
`;

const SideSetting = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const MilestonePage = () => {
  const { milestoneID } = useParams();
  const [content, setContent] = useState({});

  useEffect(() => {
    firebase
      .getTopLevelContent("articles", milestoneID)
      .then((res) => setContent(res))
      .catch((err) => console.log(err));
    // firebase.postsListener(groupID, setRenderPost);
  }, []);

  return (
    <div>
      <Wrapper>
        <TopCover style={{ backgroundImage: `url(${content.coverImage})` }} />
        <div>里程碑標題</div>

        <div>{content.title}</div>
        <div>里程碑內容</div>
        <div className="ql-editor">{HtmlParser(content.content)}</div>
      </Wrapper>
      <SideSetting>
        <div>作者</div>
      </SideSetting>
    </div>
  );
};

export default MilestonePage;
