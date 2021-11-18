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
import Swal from "sweetalert2";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import { FaRegThumbsUp, FaThumbsUp, FaRegCommentAlt } from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { RiShareForwardFill } from "react-icons/ri";

const Container = styled.div`
  /* position: relative; */
  max-width: 1560px;
  width: 80%;
  padding: 1rem;
  height: fit-content;
  display: flex;
  margin: 0 auto;
  margin-top: 3rem;
  gap: 1rem;
  @media only screen and (max-width: 992px) {
    flex-direction: column;
    padding-bottom: 0;
  }
`;

const TopCover = styled.div`
  width: 100%;
  height: 30vw;
  background-size: cover;
  background-position: center;
  margin: 1.5rem 0;
`;

const Wrapper = styled.div`
  border-radius: 4px;
  padding: 30px;
  background-color: #fffdfd;
  border: none;
  width: 80%;
  /* border: 1px solid red; */
  @media only screen and (max-width: 992px) {
    /* position: fixed; */
    width: 100%;
  }
`;

const AuthorLink = styled(Link)`
  @media only screen and (max-width: 992px) {
    /* position: fixed; */
    display: none;
  }
`;

const SideSetting = styled.div`
  width: 15%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 30px;
  height: 100vh;
  /* transform: translateY(0px); */
  /* border: 1px solid #f27e59; */
  border-radius: 4px;
  position: sticky;
  top: 20px;
  left: 0;
  gap: 1rem;

  h3 {
    word-wrap: break-word;
    text-align: center;
  }
  @media only screen and (max-width: 992px) {
    flex-direction: row;
    background-color: #fff4e4;
    h3 {
      display: none;
    }
    width: 100%;
    /* height: 10%; */
    position: static;
    /* top: 0; */
    /* bottom: 80px; */
    height: 13vh;
    margin-top: 0;
    /* height: 100vh; */
  }
`;

const Icon = styled.img`
  height: 1.5rem;
  margin: 0 auto;
  cursor: pointer;
`;

const IconWord = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  span {
    color: #f27e59;
    font-weight: 600;
  }
  @media only screen and (max-width: 992px) {
    /* width: 1rem */
    /* margin: 1rem; */
  }
`;

const CountWrapper = styled.div`
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 3px;
  span {
    color: #f27e59;
    font-weight: 600;
    display: none;
  }
  @media only screen and (max-width: 992px) {
    margin-top: 0;
    /* margin: 1rem; */
    flex-direction: column;
    span {
      display: block;
    }
  }
`;

const Count = styled.div`
  position: absolute;
  top: -17px;
  right: -5px;
  font-size: 14px;
  color: #f27e59;
  font-weight: 600;
  /* display: none; */
`;

const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  /* margin: 20px 0; */
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const TinyAvatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

const HeadDetail = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 992px) {
    flex-direction: column;
  }
`;

const P = styled.p`
  margin-bottom: 1rem;
  /* margin-bottom: 10px; */
  text-align: center;

  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: #f27e59;
  font-weight: 600;
  &:hover {
    /* font-weight: ; */
  }
`;

const TopPTag = styled.p`
  font-weight: 500;
  font-size: 14px;
  &:first-child {
    font-weight: 600;
  }
`;

const EditBtn = styled.button`
  /* width: 30%; */

  border-radius: 4px;
  list-style: none;
  font-weight: 600;
  font-size: 0.8rem;
  height: auto;
  text-decoration: none;
  color: #f27e59;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: none;
  /* min-width: 80px; */
  padding: 5px;
  cursor: pointer;
  border: 1px solid #f27e59;
  background-color: transparent;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
  @media only screen and (max-width: 992px) {
    padding: 2px;
    font-size: 0.6rem;
  }
`;

const ButtonSet = styled.div`
  display: flex;
  gap: 10px;
  @media only screen and (max-width: 992px) {
    margin-top: 10px;
    align-self: flex-end;
  }
`;

const EditLink = styled(Link)`
  /* width: 30%; */
  border-radius: 4px;
  list-style: none;
  font-weight: 600;
  font-size: 0.8rem;
  height: auto;
  text-decoration: none;
  color: #f27e59;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: none;
  /* min-width: 80px; */
  padding: 5px 5px;
  cursor: pointer;
  border: 1px solid #f27e59;
  background-color: transparent;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
  @media only screen and (max-width: 992px) {
    padding: 2px;
    font-size: 0.6rem;
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
  @media only screen and (max-width: 992px) {
    align-self: flex-start;
  }
`;

const CommentCtn = styled.div`
  border-top: 3px solid #f27e59;
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

  @media only screen and (max-width: 500px) {
    width: 90%;
  }
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
  color: #f27e59;
  background-color: transparent;
  font-size: 12px;
  border: 1px solid #f27e59;
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

  // const memberCheckAlert = () => {
  //   if (userData === null) {
  //     Swal.fire({
  //       icon: "info",
  //       title: "Oops...",
  //       text: "請先登入或註冊會員！",
  //     });
  //     return;
  //   }
  // };

  const handleSave = () => {
    if (userData === null) {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "請先登入或註冊會員！",
      });
      return;
    }
    firebase.clapsForMilestone(milestoneID, userData?.uid, "saveBy");
  };
  // console.log("contentcontent", content);
  const handleClap = () => {
    if (userData === null) {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "請先登入或註冊會員！",
      });
      return;
    }
    firebase.clapsForMilestone(milestoneID, userData?.uid, "clapBy");
  };

  const handleSendComment = () => {
    const data = {
      content: cmtValue,
      creationTime: new Date(),
      creatorID: userData.uid,
      milestoneID: milestoneID,
    };

    firebase.sendMilestoneComment(milestoneID, data).then(() => {
      firebase.sendMilestoneNotification(
        milestoneID,
        authorData?.uid,
        userData.uid
      );
      setCmtValue("");
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "確定要刪除嗎?",
      text: "刪除將不可恢復，請再次確認是否刪除！",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "確定",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        firebase.deleteMilestone("articles", milestoneID).then(() => {
          history.push("/");
          // alert("文章已經刪除囉！");
        });
        Swal.fire("Deleted!", "文章已經刪除囉！", "success");
      }
    });
  };

  const handlePrivate = () => {
    console.log(publicStatus);

    firebase
      .toggleMilestone("articles", milestoneID, !publicStatus)
      .then(() => {
        if (publicStatus) {
          Swal.fire({
            title: "文章已設為隱藏，若要調整請至個人頁面",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
          history.push("/");
        }
      });
  };

  const handleActiveComment = () => {
    if (userData === null) {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "請先登入或註冊會員！",
      });
      return;
    } else {
      setShowCmt(!showCmt);
    }
    // if (userData) {
    // }
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
              <TopPTag>{authorData?.displayName}</TopPTag>
              <TopPTag>
                啟發自：
                <LinkStyle to={`/group/${content?.groupID}`}>
                  {groupData?.name}
                </LinkStyle>
              </TopPTag>
              <TopPTag>
                {content?.creationTime?.toDate().toLocaleString("zh-TW")}
              </TopPTag>
            </div>
          </AuthorDataCtn>
          {userData?.uid === authorData?.uid && (
            <ButtonSet>
              <EditLink to={`/article/${milestoneID}/edit`}>編輯</EditLink>
              <EditBtn onClick={handleDelete}>刪除</EditBtn>
              <EditBtn onClick={handlePrivate}>
                設為{publicStatus ? "非公開" : "公開"}
              </EditBtn>
            </ButtonSet>
          )}
        </HeadDetail>
        <div>
          <TopCover
            style={{ backgroundImage: `url(${content?.coverImage})` }}
          />
        </div>
        <QlContent>
          <div className="ql-editor">{HtmlParser(content?.content)}</div>
        </QlContent>
      </Wrapper>
      <SideSetting>
        <AuthorLink to={`/profile/${authorData?.uid}`}>
          <Avatar src={authorData?.avatar} />
        </AuthorLink>
        <h3>{authorData?.displayName}</h3>
        <P>{authorData?.introduce}</P>
        <IconSet>
          <IconWord
            onClick={() => {
              navigator.clipboard.writeText(root + pathname);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "成功複製連結",
                showConfirmButton: false,
                timer: 1500,
              });
            }}
          >
            <Share />

            <span>分享</span>
          </IconWord>
          <IconWord onClick={handleSave}>
            {content?.saveBy?.includes(userData?.uid) ? <Saved /> : <Save />}

            <span>收藏</span>
          </IconWord>
          <CountWrapper onClick={handleClap}>
            {content?.clapBy?.includes(userData?.uid) ? (
              <ThumbsUpFilled />
            ) : (
              <ThumbsUp />
            )}
            <span>給讚</span>
            <Count>
              {content?.clapBy?.length > 0 && content?.clapBy.length}
            </Count>
          </CountWrapper>
          <CountWrapper onClick={handleActiveComment}>
            <Comment />
            {/* <Icon src={comment} /> */}
            <span>留言</span>
            <Count>{renderPost.length > 0 && renderPost.length}</Count>
          </CountWrapper>
        </IconSet>
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

const iconStyle = {
  width: "1.4rem",
  height: "1.4rem",
  color: "#f27e59",
};

const ThumbsUpFilled = styled(FaThumbsUp)`
  ${iconStyle}
`;

const ThumbsUp = styled(FaRegThumbsUp)`
  ${iconStyle}
`;

const Comment = styled(FaRegCommentAlt)`
  ${iconStyle}
`;

const Save = styled(BsBookmark)`
  ${iconStyle}
`;

const Saved = styled(BsBookmarkFill)`
  ${iconStyle}
`;

const Share = styled(RiShareForwardFill)`
  ${iconStyle}
  width: 1.5rem;
  height: 1.5rem;
`;

// import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
// import { RiShareForwardFill } from "react-icons/ri";

const IconSet = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media only screen and (max-width: 992px) {
    /* border: 1px solid red; */
    position: fixed;
    bottom: 0;
    flex-direction: row;
    width: 100vw;
    align-items: flex-start;
    justify-content: space-evenly;
    padding: 1.2rem 0 1rem 0;
    left: 0;
    background-color: #fff4e4;
    box-shadow: rgb(0 0 0 / 16%) 0px -4px 11px 0px;
  }
`;

const QlContent = styled.div`
  height: fit-content;
  margin: 0 auto;
  background-color: #fff;
  img {
    max-width: 100%;
  }
`;
