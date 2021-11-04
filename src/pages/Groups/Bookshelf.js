import React from "react";
import styled, { keyframes } from "styled-components";
import bookshelf from "../../sources/bookshelf.jpg";
import { GiNotebook } from "react-icons/gi";
import { useState } from "react";

const Wrapper = styled.div`
  width: 1000px;
  /* width: 100%; */

  margin: 0 auto;
`;

const Img = styled.img`
  width: 100%;
  /* padding: 0;
  max-width: 800px; */
`;

const typing = keyframes`
	from { width: 0 }
`;

// @keyframes typing {
// 	from { width: 0 }
// }

const caret = keyframes`
	50% { border-right-color: transparent; }
`;

const Run = styled.h1`
  font: bold 200% Consolas, Monaco, monospace;
  /* 	width: 8.25em; */
  width: 34rem;
  white-space: nowrap;
  overflow: hidden;
  border-right: 0.05em solid;
  color: white;
  animation: ${typing} 6s steps(15) infinite, ${caret} 1s steps(1) infinite;
`;

const TopCover = styled.div`
  opacity: 0.8;
  margin-bottom: 0.8rem;
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 2px 5px grey;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// @keyframes caret {
// 	50% { border-right-color: transparent; }
// }

// h1 {
// 	font: bold 200% Consolas, Monaco, monospace;
// /* 	width: 8.25em; */
// 	width: 15ch;
// 	white-space: nowrap;
// 	overflow: hidden;
// 	border-right: .05em solid;
// 	animation: typing 4s steps(15) infinite,
// 	           caret 1s steps(1) infinite;
// }

const Bookshelf = () => {
  return (
    <Wrapper>
      <TopCover style={{ backgroundImage: `url(${bookshelf})` }}>
        <Run>找書更方便！一起建立社群書櫃！</Run>
      </TopCover>
      <button>
        推薦選書
        <GiNotebook />
      </button>
      <div>目前還沒有書本</div>
    </Wrapper>
  );
};

export default Bookshelf;
