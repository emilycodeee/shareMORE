import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { Link, useLocation, useHistory } from "react-router-dom";
const ProfilePage = () => {
  const { userID } = useParams();
  console.log(userID);

  return (
    <Link to={`/messages/${userID}`} style={{ height: "100px" }}>
      傳訊息
    </Link>
  );
};

export default ProfilePage;
