import React from "react";
import styled from "styled-components";
import clap from "../../../sources/clap.png";
import claped from "../../../sources/claped.png";
import comment from "../../../sources/comment.png";
import dots from "../../../sources/dots.png";
import { useState, useEffect } from "react";
import LeaveMessage from "./LeaveMessage";
import * as firebase from "../../../utils/firebase";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  margin: 0 auto;

  border-radius: 10px;
  background-color: #f5f5f5;
  margin: 1rem 0;
  padding: 1rem 1rem;
  position: relative;
`;

const AvatarCtn = styled.img`
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  margin-right: 10px;
`;

const UserWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const UserDetail = styled.div`
  height: 30px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Pstyled = styled.div`
  font-size: 14px;
`;

const IconWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  margin-top: 10px;
`;

const HeadIcon = styled.img`
  cursor: pointer;
  height: 15px;
  margin-right: 5px;
`;

const IconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 10px;
  padding: 5px;
  &:hover {
    background-color: white;
  }
`;

const Icon = styled.img`
  height: 1.2rem;
  margin: 0 auto;
  cursor: pointer;
`;

const CountWrapper = styled.div`
  display: flex;
  position: relative;
`;

const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 2.5rem;
  right: 0;
  z-index: 99;
`;

const MoreBtn = styled.div`
  cursor: pointer;
  width: 6rem;
  text-align: center;
  background-color: #e5e5e5;
  font-weight: 550;
  padding: 0.5rem 0.2rem;
  &:hover {
    background-color: #eeeeee;
  }
`;

const Count = styled.div`
  position: absolute;
  top: 0;
  right: -10px;
  font-size: 12px;
`;

const CommentCtn = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostArea = styled.textarea`
  margin-top: 0.5rem;
  font-size: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  background-color: #eeeeee;
  border: none;
  outline: none;
  color: black;
`;

const ButtonSet = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 0.5rem;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;

const ButtonStyled = styled.button`
  padding: 8px 12px;
  margin-left: 10px;
  display: flex;
  justify-content: end;
  border: none;
  border-radius: 10px;
  outline: none;
`;

const ContentArea = styled.div`
  line-height: 1.4rem;
`;

const EditContentArea = styled.textarea`
  width: 100%;
  padding: 2px 5px;
  outline: none;
  margin-left: 1rem;
  resize: none;
  height: auto;
`;

const EditAreaWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditSubmitBtn = styled.button`
  cursor: pointer;
  width: 60px;
  height: 30px;
  background-color: #eeeeee;
  outline: none;
  border: 1px solid rgb(203, 195, 194);
  font-size: 10px;
  margin-left: 0.5rem;
`;

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
    firebase.postCommentsListener(item.groupID, item.postID, setRenderPost);
  }, []);

  const LeaveMsgHandler = () => {
    const data = {
      creatorID: userData.uid,
      content: textValue,
      creationTime: new Date(),
    };
    firebase.sendPostComment(item.groupID, item.postID, data);
    setTextValue("");
    setShowBtn(false);
  };

  const handleClap = () => {
    firebase.clapsForPost(item.groupID, item.postID, userData.uid);
  };

  const handleDelete = () => {
    setShowDots(!showDots);
    firebase.deleteComment(item.groupID, item.postID).then(() => {
      alert("刪除成功");
    });
  };

  const handleEdit = () => {
    firebase.editComment(item.groupID, item.postID, editText);
    alert("編輯成功");
    setShowEdit(false);
    setShowDots(false);
  };

  const handleCancelEdit = () => {
    setShowEdit(false);
    setShowDots(false);
  };

  // console.log(renderPost);
  const checkPostSender = postSender?.uid === userData?.uid;

  const checkGroupOwner = content?.creatorID === userData?.uid;
  return (
    <div>
      <Wrapper>
        <UserWrapper>
          <AvatarCtn src={postSender?.avatar} />
          <UserDetail>
            <Pstyled>{postSender?.displayName}</Pstyled>
            <Pstyled>
              {item.creationTime?.toDate().toLocaleString("zh-TW")}
            </Pstyled>
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
                編輯
              </MoreBtn>
            )}
            <MoreBtn onClick={handleDelete}>刪除</MoreBtn>
            {checkGroupOwner && (
              <MoreBtn>
                <LinkStyle to={`/group/${groupID}/notes/${postID}/post`}>
                  設為精選筆記
                </LinkStyle>
              </MoreBtn>
            )}
          </DropDown>
        )}
        {showEdit && (
          <EditAreaWrapper>
            <EditContentArea
              // onBlur={() => setShowEdit(false)}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />

            <EditSubmitBtn onClick={handleEdit}>送出</EditSubmitBtn>
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
              <Icon
                src={item.clapBy?.includes(userData?.uid) ? claped : clap}
              />
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
              <Icon src={comment} />
            </CountWrapper>
          </IconDiv>
        </IconWrapper>
      </Wrapper>

      {showComment && (
        <div>
          {renderPost.map((item) => {
            return <LeaveMessage itemData={item} key={item.commentID} />;
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
              placeholder="留言..."
            />

            {showBtn && (
              <ButtonSet>
                <ButtonStyled onClick={LeaveMsgHandler}>送出</ButtonStyled>
                <ButtonStyled
                  onClick={() => {
                    setShowComment(!showComment);
                    setShowBtn(false);
                  }}
                >
                  取消
                </ButtonStyled>
              </ButtonSet>
            )}
          </CommentCtn>
        </div>
      )}
    </div>
  );
};

export default PostContainer;
