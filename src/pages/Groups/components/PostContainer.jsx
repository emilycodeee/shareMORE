import React from "react";
import dots from "../../../sources/dots.png";
import { useState, useEffect } from "react";
import ReplyMessage from "./ReplyMessage";
import {
  postCommentsListener,
  sendPostComment,
  deleteComment,
  clapsForPost,
  editComment,
} from "../../../utils/firebase";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { successAlert } from "../../../utils/alert";
import {
  ThumbsUpFilled,
  ThumbsUp,
  Comment,
  OuterWrapper,
  Wrapper,
  PostArea,
  AvatarCtn,
  UserWrapper,
  UserDetail,
  Pstyled,
  DateStyled,
  IconWrapper,
  HeadIcon,
  IconDiv,
  CountWrapper,
  DropDown,
  MoreBtn,
  Count,
  CommentCtn,
  ButtonSet,
  LinkStyle,
  ButtonStyled,
  ContentArea,
  EditContentArea,
  EditAreaWrapper,
  EditSubmitBtn,
} from "../style/PostContainer.style.jsx";

const PostContainer = ({ item, content }) => {
  const userData = useSelector((state) => state.userData);
  const usersList = useSelector((state) => state.usersList);
  const { groupID } = useParams();
  const postID = item.postID;
  const [showComment, setShowComment] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [showDots, setShowDots] = useState(false);
  const [renderPost, setRenderPost] = useState([]);
  const [textValue, setTextValue] = useState("");
  const postSender = usersList.find((each) => each.uid === item.creatorID);
  const [editText, setEditText] = useState(item.content);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const unsubscribe = postCommentsListener(
      item.groupID,
      item.postID,
      setRenderPost
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const LeaveMsgHandler = () => {
    const data = {
      creatorID: userData.uid,
      content: textValue,
      creationTime: new Date(),
    };
    sendPostComment(item.groupID, item.postID, data);
    setTextValue("");
    setShowBtn(false);
  };

  const handleClap = () => {
    clapsForPost(item.groupID, item.postID, userData.uid);
  };

  const handleDelete = () => {
    setShowDots(!showDots);
    deleteComment(item.groupID, item.postID).then(() => {
      successAlert("????????????");
    });
  };

  const handleEdit = () => {
    editComment(item.groupID, item.postID, editText);
    successAlert("????????????");
    setShowEdit(false);
    setShowDots(false);
  };

  const checkPostSender = postSender?.uid === userData?.uid;
  const checkGroupOwner = content?.creatorID === userData?.uid;
  return (
    <OuterWrapper>
      <Wrapper>
        <UserWrapper>
          <AvatarCtn src={postSender?.avatar} />
          <UserDetail>
            <Pstyled>{postSender?.displayName}</Pstyled>
            <DateStyled>
              {item.creationTime?.toDate().toLocaleString("zh-TW")}
            </DateStyled>
          </UserDetail>

          {(checkPostSender || checkGroupOwner) && (
            <HeadIcon src={dots} onClick={() => setShowDots(!showDots)} />
          )}
        </UserWrapper>

        {showDots && (
          <DropDown>
            {checkPostSender && (
              <MoreBtn
                onClick={() => {
                  setShowEdit(!showEdit);
                  setShowDots(!showDots);
                }}
              >
                ??????
              </MoreBtn>
            )}
            <MoreBtn onClick={handleDelete}>??????</MoreBtn>
            {(checkGroupOwner || checkPostSender) && (
              <MoreBtn>
                <LinkStyle to={`/group/${groupID}/notes/${postID}/post`}>
                  ????????????
                </LinkStyle>
              </MoreBtn>
            )}
          </DropDown>
        )}
        {showEdit && (
          <EditAreaWrapper>
            <EditContentArea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />

            <EditSubmitBtn onClick={handleEdit}>??????</EditSubmitBtn>
          </EditAreaWrapper>
        )}
        {!showEdit && <ContentArea>{item.content}</ContentArea>}
        <IconWrapper>
          <IconDiv
            onClick={() => {
              handleClap();
            }}
          >
            <CountWrapper>
              {item.clapBy?.includes(userData?.uid) ? (
                <ThumbsUpFilled />
              ) : (
                <ThumbsUp />
              )}

              <Count>{item.clapBy?.length > 0 && item.clapBy.length}</Count>
            </CountWrapper>
          </IconDiv>
          <IconDiv
            onClick={() => {
              setShowComment(!showComment);
            }}
          >
            <CountWrapper>
              <Count>{renderPost.length > 0 && renderPost.length}</Count>

              <Comment />
            </CountWrapper>
          </IconDiv>
        </IconWrapper>
      </Wrapper>

      {showComment && (
        <div>
          {renderPost.map((item) => {
            return <ReplyMessage itemData={item} key={item.commentID} />;
          })}
          <CommentCtn>
            <PostArea
              value={textValue}
              onFocus={(e) => {
                setShowBtn(true);
              }}
              onChange={(e) => {
                setTextValue(e.target.value);
              }}
              placeholder="???????????????..."
            />

            {showBtn && (
              <ButtonSet>
                <ButtonStyled onClick={LeaveMsgHandler}>??????</ButtonStyled>
                <ButtonStyled
                  onClick={() => {
                    setShowComment(!showComment);
                    setShowBtn(false);
                  }}
                >
                  ??????
                </ButtonStyled>
              </ButtonSet>
            )}
          </CommentCtn>
        </div>
      )}
    </OuterWrapper>
  );
};

export default PostContainer;
