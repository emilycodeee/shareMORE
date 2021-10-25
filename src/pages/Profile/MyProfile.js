import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  justify-content: center;
`;
const Sider = styled.div`
  width: 10em;
  background-color: red;
`;

const Main = styled.div`
  width: 10em;
  background-color: red;
`;

const MyProfilePage = () => {
  return (
    <Wrapper>
      <Sider>
        <div>我的社群</div>
        <div>我的筆記收藏</div>
        <div>我的里程碑</div>
        <div>帳戶設定</div>
      </Sider>
      <div>
        <p>我的社群</p>
      </div>
    </Wrapper>
  );
};

export default MyProfilePage;
