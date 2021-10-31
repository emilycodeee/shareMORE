import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import * as firebase from "../../utils/firebase";
import HtmlParser from "react-html-parser";
import styled from "styled-components";
import save from "../../sources/save.png";
import share from "../../sources/share.png";
import saved from "../../sources/saved.png";
import clap from "../../sources/clap.png";
import claped from "../../sources/claped.png";
import comment from "../../sources/comment.png";
import PostContainer from "../Groups/components/PostContainer";
// import "react-quill/dist/quill.snow.css";
import "../../../node_modules/react-quill/dist/quill.snow.css";
// import PostContainer from "./components/PostContainer";
// import GroupHeader from "./components/GroupHeader";

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  /* align-items: center; */
`;

const TopCover = styled.div`
  /* opacity: 0.8; */
  width: 700px;
  height: 300px;
  /* border: 1px solid red; */
  background-size: cover;
  background-position: center;
  margin: 1.5rem 0;
`;

const Wrapper = styled.div`
  margin: 30px;
  border-radius: 30px;
  padding: 30px;
  border: 1px solid #3e2914;
`;

const SideSetting = styled.div`
  width: 15%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 30px;
  height: 100vh;
  border: 1px solid #d1cbcb;
`;

const Icon = styled.img`
  height: 1.5rem;
  margin: 0 auto;
  cursor: pointer;
  margin-bottom: 1rem;
  /* position: relative; */
`;

const CountWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Count = styled.div`
  position: absolute;
  top: -7px;
  right: 15px;
  font-size: 14px;
`;

const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const TinyAvatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

const HeadDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  margin-bottom: 1rem;
  /* margin-bottom: 10px; */
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: rgb(255 182 0);
  font-weight: 550;
  &:hover {
    color: rgb(255 217 121);
  }
`;

const TopPTag = styled.p`
  font-weight: 500;
  font-size: 13px;
`;

const AuthorBtn = styled.div``;

const EditBtn = styled.button`
  margin-left: 10px;
  border-radius: 8px;
  padding: 5px 10px;
  border: 1px solid #d1cbcb;
  outline: none;
  text-align: center;
  text-align: end;
  background-color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #d1cbcb;
  }
`;

const AuthorDataCtn = styled.div`
  display: flex;
  align-items: center;
`;

const MilestonePage = () => {
  const { milestoneID } = useParams();
  const [content, setContent] = useState({});

  const usersList = useSelector((state) => state.usersList);
  const groupsList = useSelector((state) => state.groupsList);
  const userData = useSelector((state) => state.userData);

  const root = window.location.host;
  const pathname = useLocation().pathname;

  // console.log(authorData);
  useEffect(() => {
    firebase
      .getTopLevelContent("articles", milestoneID)
      .then((res) => setContent(res))
      .catch((err) => console.log(err));

    // firebase.postsListener(groupID, setRenderPost);
  }, []);
  console.log("content", content);

  const authorData = usersList.find((item) => item.uid === content?.creatorID);
  const groupData = groupsList.find(
    (item) => item.groupID === content?.groupID
  );

  const time = new Date(content.creationTime?.toDate()).toLocaleString("zh-TW");
  return (
    <Container>
      <Wrapper>
        <h1>{content?.title}</h1>
        <HeadDetail>
          <AuthorDataCtn>
            <Link to={`/profile/${authorData?.uid}`}>
              <TinyAvatar src={authorData?.avatar} />
            </Link>
            <div>
              <TopPTag>作者：{authorData?.displayName}</TopPTag>
              <TopPTag>
                啟發自：
                <LinkStyle to={`/group/${content?.groupID}`}>
                  {groupData?.name}
                </LinkStyle>
              </TopPTag>
              <TopPTag>發布日期：{time}</TopPTag>
            </div>
          </AuthorDataCtn>
          {userData?.uid === authorData?.uid && (
            <AuthorBtn>
              <EditBtn>編輯</EditBtn>
              <EditBtn>刪除</EditBtn>
              <EditBtn>設為非公開</EditBtn>
            </AuthorBtn>
          )}
        </HeadDetail>
        <div>
          <TopCover
            style={{ backgroundImage: `url(${content?.coverImage})` }}
          />
        </div>
        <div className="ql-editor">{HtmlParser(content?.content)}</div>
      </Wrapper>
      <SideSetting>
        <Link to={`/profile/${authorData?.uid}`}>
          <Avatar src={authorData?.avatar} />
        </Link>
        <h3>{authorData?.displayName}</h3>
        <P>{authorData?.introduce}</P>
        <Icon
          src={share}
          onClick={() => {
            navigator.clipboard.writeText(root + pathname);
            alert(`複製連結成功！`);
          }}
        />
        <Icon src={save} />
        <CountWrapper>
          <Icon src={claped} />
          <Count>1</Count>
        </CountWrapper>
        <CountWrapper>
          <Icon src={comment} />
          <Count>1</Count>
        </CountWrapper>
      </SideSetting>
    </Container>
  );
};

export default MilestonePage;
