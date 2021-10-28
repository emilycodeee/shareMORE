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
import { Link, useParams } from "react-router-dom";

const Wrapper = styled.div`
  margin: 0 auto;
  /* width: 80%; */
  border-radius: 10px;
  background-color: #f5f5f5;
  margin: 1rem 0;
  padding: 1rem 2rem;
  /* border: 1px solid red; */
  position: relative;
`;

const AvatarCtn = styled.img`
  border-radius: 50%;
  height: 2rem;
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
  /* background-color: lightblue; */
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
  /* border: 2px solid red; */
  display: flex;
  position: relative;
`;

const DropDown = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  top: 2.5rem;
  right: 0;
  z-index: 99;
  /* transition: 0.3s; */
`;

const MoreBtn = styled.div`
  cursor: pointer;
  width: 100%;
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
  /* width: 60px;
  height: 30px; */
  padding: 8px 12px;
  margin-left: 10px;

  /* border-radius: 10px; */
  /* background-color: black; */
  display: flex;
  justify-content: end;
`;

const PostContainet = ({ item, userList, user, content }) => {
  // console.log("sss", item);
  const { groupID } = useParams();
  const postID = item.postID;
  const [showComment, setShowComment] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [showDots, setShowDots] = useState(false);
  const [renderPost, setRenderPost] = useState([]);
  const [textValue, setTextValue] = useState("");
  const postSender = userList.find((each) => each.userID === item.creatorID);

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
  };

  const handleClap = () => {
    console.log("ssss", item.postID);
    firebase.clapsForPost(item.groupID, item.postID, user.uid);
  };

  const handleDelete = () => {
    console.log("delete");
    setShowDots(!showDots);
    firebase.deleteComment(item.groupID, item.postID).then(() => {
      alert("刪除成功");
    });
  };

  const handleEdit = () => {
    console.log("edit");
    setShowDots(!showDots);
  };

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
          {content.creatorID === user.uid && (
            <HeadIcon
              src={dots}
              onClick={() => setShowDots(!showDots)}
              // onMouseOver={() => setShowDots(true)}
              // onMouseLeave={() => setShowDots(false)}
            />
          )}
        </UserWrapper>

        {showDots && (
          <DropDown>
            <MoreBtn onClick={handleEdit}>編輯</MoreBtn>
            <MoreBtn onClick={handleDelete}>刪除</MoreBtn>
            <MoreBtn>
              <LinkStyle to={`/group/${groupID}/notes/${postID}/post`}>
                設為精選筆記
              </LinkStyle>
            </MoreBtn>
          </DropDown>
        )}
        <div>{item.content}</div>
        <IconWrapper>
          <IconDiv
            onClick={() => {
              handleClap();
            }}
          >
            <CountWrapper>
              <Icon src={item.clapBy?.includes(user.uid) ? claped : clap} />
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
            return (
              <LeaveMessage
                itemData={item}
                key={item.commentID}
                userList={userList}
              />
            );
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

          {/* {renderPost.map((item) => {
            return (
              <LeaveMessage
                itemData={item}
                key={item.commentID}
                userList={userList}
              />
            );
          })} */}
        </div>
      )}
    </div>
  );
};

export default PostContainet;
