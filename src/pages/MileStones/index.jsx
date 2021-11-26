import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router";
import {
  actionForMilestone,
  sendMilestoneComment,
  sendMilestoneNotification,
  deleteMilestone,
  toggleMilestone,
  milestoneListener,
  postMilestoneListener,
} from "../../utils/firebase";
import HtmlParser from "react-html-parser";
import CommentReply from "./components/CommentReply";
import {
  successAlert,
  deleteAlert,
  warningAlert,
  textAlert,
} from "../../utils/alert";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import { DisappearedLoading } from "react-loadingg";
import {
  ThumbsUpFilled,
  ThumbsUp,
  Comment,
  Save,
  Saved,
  Share,
  IconSet,
  QlContent,
  Container,
  TopCover,
  Wrapper,
  AuthorLink,
  SideSetting,
  IconWord,
  CountWrapper,
  Count,
  Avatar,
  TinyAvatar,
  HeadDetail,
  P,
  LinkStyle,
  TopPTag,
  EditBtn,
  ButtonSet,
  EditLink,
  PageShield,
  AuthorDataCtn,
  CommentCtn,
  MainPost,
  PostAvatar,
  TextPost,
  TagCtn,
  TextAreaStyle,
  PostBtn,
} from "./style/Index.style";

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
  const [isLoading, setIsLoading] = useState(true);
  const root = window.location.host;
  const pathname = useLocation().pathname;

  const handleSave = () => {
    if (userData === null) {
      warningAlert("請先登入或註冊會員！");
      return;
    }
    actionForMilestone(milestoneID, userData?.uid, "saveBy");
  };

  const handleClap = () => {
    if (userData === null) {
      warningAlert("請先登入或註冊會員！");
      return;
    }
    actionForMilestone(milestoneID, userData?.uid, "clapBy");
  };

  const handleSendComment = () => {
    const data = {
      content: cmtValue,
      creationTime: new Date(),
      creatorID: userData.uid,
      milestoneID: milestoneID,
    };

    sendMilestoneComment(milestoneID, data).then(() => {
      sendMilestoneNotification(milestoneID, authorData?.uid, userData.uid);
      setCmtValue("");
    });
  };

  const handleDelete = () => {
    const firebaseDelete = () => {
      deleteMilestone("articles", milestoneID).then(() => {
        history.push(`/group/${content?.groupID}/articles`);
      });
    };
    deleteAlert(firebaseDelete, "文章已經刪除囉！");
  };

  const handlePrivate = () => {
    toggleMilestone("articles", milestoneID, !publicStatus).then(() => {
      if (publicStatus) {
        textAlert("文章已設為隱藏，若要調整請至個人頁面");
        history.push("/");
      }
    });
  };

  const handleActiveComment = () => {
    if (userData === null) {
      warningAlert("請先登入或註冊會員！");
      return;
    } else {
      setShowCmt(!showCmt);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let isMounted = true;
    if (isMounted) {
      milestoneListener("articles", milestoneID, setContent);
      postMilestoneListener("articles", milestoneID, setRenderPost);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (content !== undefined) {
        setIsLoading(false);
        if (content?.creatorID) {
          setPublicStatus(content.public);

          if (!content.public && userData?.uid !== content?.creatorID) {
            history.push("/");
          }
        }
      } else {
        history.push("/404");
      }
    }
    return () => {
      isMounted = false;
    };
  }, [content]);

  const authorData = usersList.find((item) => item.uid === content?.creatorID);
  const groupData = groupsList.find(
    (item) => item.groupID === content?.groupID
  );
  if (isLoading) {
    return <DisappearedLoading />;
  } else
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
                successAlert("成功複製連結");
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
                <CommentReply
                  key={item.postID}
                  item={item}
                  author={authorData}
                />
              ))}
            </CommentCtn>
          </PageShield>
        )}
      </Container>
    );
};

export default MilestonePage;
