import React from "react";
import styled from "styled-components";
import clap from "../../../sources/clap.png";
import claped from "../../../sources/claped.png";
import save from "../../../sources/save.png";
import saved from "../../../sources/saved.png";
import share from "../../../sources/share.png";
import comment from "../../../sources/comment.png";
import dots from "../../../sources/dots.png";

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
  border: 1px solid red;
  margin-top: 10px;
`;

const HeadIcon = styled.img`
  height: 15px;
  margin-right: 5px;
  cursor: pointer;
`;

const Icon = styled.img`
  height: 15px;
  margin-right: 5px;
  cursor: pointer;
`;

const PostContainet = ({ item, userList }) => {
  const postSender = userList.find((each) => each.email === item.creatorID);
  console.log(postSender);

  return (
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
      <div>{item.content}</div>
      <IconWrapper>
        <Icon src={clap} />
        <Icon src={comment} />
        <Icon src={save} />
        <Icon src={share} />
      </IconWrapper>
      {/* <button>刪除</button>
      <button>編輯</button>
      <button>設為精選筆記</button> */}
    </Wrapper>
  );
};

export default PostContainet;
