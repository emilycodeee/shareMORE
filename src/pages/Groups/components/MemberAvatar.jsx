import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MemberAvatar = ({ data }) => {
  const usersList = useSelector((state) => state.usersList);
  const memberData = usersList.find((item) => item.uid === data.memberID);

  return (
    <Link to={`/profile/${memberData?.uid}`}>
      <MemberImg src={memberData?.avatar} />
    </Link>
  );
};

export default MemberAvatar;

const MemberImg = styled.img`
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  margin: 5px;
  border-radius: 50%;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;
