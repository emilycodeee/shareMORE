import React from "react";
import styled from "styled-components";
import clap from "../../../sources/clap.png";
import claped from "../../../sources/claped.png";
import save from "../../../sources/save.png";
import saved from "../../../sources/saved.png";
import share from "../../../sources/share.png";
import comment from "../../../sources/comment.png";
import dots from "../../../sources/dots.png";
import { useState, useEffect } from "react";
import LeaveMessage from "./LeaveMessage";
import * as firebase from "../../../utils/firebase";

const Wrapper = styled.div`
  background-color: salmon;
  margin-top: 5px;
  padding: 10px;
`;

const AvatarCtn = styled.img`
  border-radius: 50%;
  height: 30px;
  margin-right: 10px;
`;

const UserWrapper = styled.div`
  display: flex;
  /* justify-content: space-between; */
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
  border: 1px solid red;
  margin-top: 10px;
`;

const HeadIcon = styled.img`
  height: 15px;
  margin-right: 5px;
`;

const IconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: lightblue;
  }
`;

const Icon = styled.img`
  height: 15px;
  margin: 0 auto;
  cursor: pointer;
`;

const MessageCtn = styled.div`
  border: 1px solid red;
`;

const CountWrapper = styled.div`
  /* border: 2px solid red; */
  display: flex;
  position: relative;
`;

const Count = styled.div`
  position: absolute;
  top: 0;
  right: -10px;
  font-size: 12px;
`;

const PostContainet = ({ item, userList, user }) => {
  const [showComment, setShowComment] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [renderPost, setRenderPost] = useState([]);
  const [textValue, setTextValue] = useState("");
  const postSender = userList.find((each) => each.userID === item.creatorID);
  // console.log(postSender);
  // console.log(item.groupID, item.postID);

  useEffect(() => {
    firebase.postCommentsListener(item.groupID, item.postID, setRenderPost);
  }, []);

  const LeaveMsgHandler = () => {
    const data = {
      creatorID: user.uid,
      content: textValue,
      creationTime: new Date(),
    };
    firebase.sendPostComment(item.groupID, item.postID, data);
    setTextValue("");
    setShowBtn(false);
    // console.log("k");
  };

  // console.log(textValue);

  // console.log("🎗", renderPost);

  return (
    <div>
      <Wrapper>
        <UserWrapper>
          <AvatarCtn src={postSender?.avatar} />
          <UserDetail>
            <Pstyled>{postSender?.displayName}</Pstyled>
            <Pstyled>
              {item.creationTime?.toDate().toLocaleString("en-US")}
            </Pstyled>
          </UserDetail>
          <HeadIcon src={dots} />
        </UserWrapper>
        {/* <div>
          <div>編輯</div>
          <div>刪除</div>
          <div>設為精選筆記</div>
        </div> */}
        <div>{item.content}</div>
        <IconWrapper>
          <IconDiv>
            <CountWrapper>
              <Icon src={clap} />
              <Count>1</Count>
            </CountWrapper>
          </IconDiv>
          <IconDiv
            onClick={() => {
              setShowComment(!showComment);
            }}
          >
            <Icon src={comment} />
          </IconDiv>
        </IconWrapper>
      </Wrapper>
      {showComment && (
        <MessageCtn>
          <div>
            <textarea
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
              <>
                <button onClick={LeaveMsgHandler}>送出</button>
                <button
                  onClick={() => {
                    setShowComment(!showComment);
                    setShowBtn(false);
                  }}
                >
                  取消
                </button>
              </>
            )}
          </div>

          {renderPost.map((item) => {
            return (
              <LeaveMessage
                itemData={item}
                key={item.commentID}
                userList={userList}
              />
            );
          })}
        </MessageCtn>
      )}
    </div>
  );
};

export default PostContainet;
