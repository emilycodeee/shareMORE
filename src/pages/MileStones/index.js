import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router";
import * as firebase from "../../utils/firebase";
import HtmlParser from "react-html-parser";
import styled from "styled-components";
import save from "../../sources/save.png";
import share from "../../sources/share.png";
import saved from "../../sources/saved.png";
import clap from "../../sources/clap.png";
import claped from "../../sources/claped.png";
import comment from "../../sources/comment.png";
import CommentReply from "./components/CommentReply";

import "../../../node_modules/react-quill/dist/quill.snow.css";

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
  margin: 30px 10px;
  border-radius: 30px;
  padding: 30px;
  border: 1px solid #3e2914;
`;

const SideSetting = styled.div`
  width: 10%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 30px;
  height: 600px;
  border: 1px solid #d1cbcb;
  border-radius: 25px;
  position: sticky;
  top: 20px;
  left: 0;
`;

const Icon = styled.img`
  height: 1.5rem;
  margin: 0 auto;
  cursor: pointer;
  margin-bottom: 1.2rem;
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
  top: -17px;
  right: -5px;
  font-size: 14px;
`;

const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin: 20px 0;
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
  font-size: 14px;
`;

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

const EditLink = styled(Link)`
  color: black;
  text-decoration: none;
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

const PageShield = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  /* cursor: zoom-out; */
`;

const AuthorDataCtn = styled.div`
  display: flex;
  align-items: center;
`;

const CommentCtn = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-right: 120px;
  max-width: 70%;
  outline: none;
  background-color: white;
  z-index: 99;
  border-radius: 3px;
  /* 卷軸 */
  min-height: 150px;
  padding: 0px 0px 20px;
  max-height: calc(100vh - 240px);
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const MainPost = styled.div`
  /* width: 100%; */
  display: flex;
  /* flex-direction: column; */
  padding: 1rem 1rem 0.5rem 1rem;
  margin: 0px;
  justify-content: center;
  align-items: flex-start;
`;

const PostAvatar = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

const TextPost = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* align-items: ; */
`;

const TagCtn = styled.div`
  font-weight: 550;
  width: 100%;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #dee2e6;
`;

const TextAreaStyle = styled.textarea`
  resize: none;
  border: 1px solid rgb(203, 195, 194);
  border-radius: 3px;
  height: 3rem;
  padding: 0.5rem;
`;

const PostBtn = styled.button`
  margin-top: 1rem;
  color: rgb(255 182 0);
  background-color: transparent;
  font-size: 12px;
  border: 1px solid rgb(255 182 0);
  border-radius: 2px;
  min-width: 80px;
  padding: 4px;
  cursor: pointer;
  align-self: flex-end;
`;

const MilestonePage = () => {
  const { milestoneID } = useParams();
  const history = useHistory();
  const [content, setContent] = useState({});
  const [showCmt, setShowCmt] = useState(false);
  const [cmtValue, setCmtValue] = useState("");
  const [publicStatus, setPublicStatus] = useState(null);
  const [renderPost, setRenderPost] = useState([]);
  const usersList = useSelector((state) => state.usersList);
  const groupsList = useSelector((state) => state.groupsList);
  const userData = useSelector((state) => state.userData);
  const currentUser = usersList.find((item) => item.uid === userData?.uid);
  const root = window.location.host;
  const pathname = useLocation().pathname;

  const handleSave = () => {
    firebase.clapsForMilestone(milestoneID, userData.uid, "saveBy");
  };
  console.log("contentcontent", content);
  const handleClap = () => {
    firebase.clapsForMilestone(milestoneID, userData.uid, "clapBy");
  };

  const handleSendComment = () => {
    const data = {
      content: cmtValue,
      creationTime: new Date(),
      creatorID: userData.uid,
      milestoneID: milestoneID,
    };

    firebase.sendMilestoneComment(milestoneID, data).then(() => {
      setCmtValue("");
    });
  };

  const handleDelete = () => {
    const check = window.confirm("刪除將不可恢復，請再次確認是否刪除");
    if (check) {
      firebase.deleteMilestone("articles", milestoneID).then(() => {
        history.push("/");
        // alert("文章已經刪除囉！");
      });
    }
    console.log(check);
  };

  const handlePrivate = () => {
    console.log(publicStatus);

    firebase
      .toggleMilestone("articles", milestoneID, !publicStatus)
      .then(() => {
        if (publicStatus) history.push("/");
      });
  };

  useEffect(() => {
    firebase.milestoneListener("articles", milestoneID, setContent);
    firebase.postMilestoneListener("articles", milestoneID, setRenderPost);
    // console.log("contentcontent", content);
  }, []);

  useEffect(() => {
    if (content?.creatorID) {
      setPublicStatus(content.public);

      if (!content.public && userData?.uid !== content?.creatorID) {
        history.push("/");
      }
    }
  }, [content]);

  const authorData = usersList.find((item) => item.uid === content?.creatorID);
  const groupData = groupsList.find(
    (item) => item.groupID === content?.groupID
  );
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
              <TopPTag>
                發布日期：
                {content?.creationTime?.toDate().toLocaleString("zh-TW")}
              </TopPTag>
            </div>
          </AuthorDataCtn>
          {userData?.uid === authorData?.uid && (
            <div>
              <EditLink to={`/milestone/${milestoneID}/edit`}>編輯</EditLink>
              <EditBtn onClick={handleDelete}>刪除</EditBtn>
              <EditBtn onClick={handlePrivate}>
                設為{publicStatus ? "非公開" : "公開"}
              </EditBtn>
            </div>
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
        <Icon
          onClick={handleSave}
          src={content?.saveBy?.includes(userData?.uid) ? saved : save}
        />
        <CountWrapper onClick={handleClap}>
          <Icon
            src={content?.clapBy?.includes(userData?.uid) ? claped : clap}
          />
          <Count>{content?.clapBy?.length > 0 && content?.clapBy.length}</Count>
        </CountWrapper>
        <CountWrapper onClick={() => setShowCmt(!showCmt)}>
          <Icon src={comment} />
          <Count>{renderPost.length > 0 && renderPost.length}</Count>
        </CountWrapper>
      </SideSetting>
      {showCmt && (
        <PageShield
          data-target="shield"
          onClick={(e) => {
            e.target.dataset.target === "shield" && setShowCmt(!showCmt);
          }}
        >
          <CommentCtn>
            <TagCtn>發表回應</TagCtn>
            <MainPost>
              <PostAvatar src={currentUser?.avatar} />
              <TextPost>
                <TextAreaStyle
                  placeholder="想說點什麼嗎？"
                  value={cmtValue}
                  onChange={(e) => setCmtValue(e.target.value)}
                />
                <PostBtn onClick={handleSendComment}>送出留言</PostBtn>
              </TextPost>
            </MainPost>
            {renderPost.map((item) => (
              <CommentReply key={item.postID} item={item} author={authorData} />
            ))}
          </CommentCtn>
        </PageShield>
      )}
    </Container>
  );
};

export default MilestonePage;
