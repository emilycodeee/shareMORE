import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const BtnStyled = styled(Link)`
  border: 1px solid red;
`;

const MilestonesPage = () => {
  return (
    <div>
      <div>
        <BtnStyled to="/milestones/post">建立我的里程碑</BtnStyled>
      </div>
      <div>下面有各種</div>
    </div>
  );
};

export default MilestonesPage;
