import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MemberImg = styled.img`
  border-radius: 50%;
  height: 2rem;
  margin: 5px;
  border-radius: 50%;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

const LinkContainer = styled(Link)``;

const MemberAvatar = ({ userList, data }) => {
  // console.log(data);
  const memberData = userList.find((item) => item.userID === data.memberID);
  // console.log(memberData);
  return (
    <LinkContainer to={`/profile/${memberData?.userID}`}>
      <MemberImg src={memberData?.avatar} />
    </LinkContainer>
  );
};

export default MemberAvatar;
