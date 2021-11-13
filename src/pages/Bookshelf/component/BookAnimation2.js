import React from "react";
import styled, { keyframes } from "styled-components";

const BookAnimation2 = () => {
  return (
    <Book>
      <Cover />
      <Page />
      <Page />
      <Page />
      <Page />
      <LastPage>
        <h3 class="title">text here</h3>
      </LastPage>
      <BackCover />
    </Book>
  );
};

export default BookAnimation2;

const Book = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  perspective: 800px;
  &:hover div {
    transform: rotateX(10deg) rotateY(-180deg);
  }
  &:hover div {
    transform: rotateX(10deg) rotateY(-180deg);
    z-index: 1;
  }
`;
// .book:hover .cover {
// 	transform: rotateX(10deg) rotateY(-180deg);
// }
// .book:hover .page {
// 	transform: rotateX(10deg) rotateY(-180deg);
// 	z-index: 1;
// }

const BookRoot = {
  height: "300px",
  width: "260px",
  backgroundColor: "#353655",
  borderRadius: "2px 20px 20px 2px",
  boxShadow: "1px 1px 1px gray",
  position: "absolute",
  transform: "rotateX(10deg)",
  transformOrigin: "center left",
};

const Cover = styled.div`
  ${BookRoot}
  z-index: 1;
  transition: transform 1.5s ease;
  backface-visibility: visible;
`;

const BackCover = styled.div`
  ${BookRoot}
  z-index: -2;
`;
const pageRoot = {
  width: "250px",
  height: "280px",
  backgroundColor: "white",
  position: "absolute",
  borderRadius: "0 10px 10px 0",
  transform: "rotateX(10deg)",
  transformOrigin: "center left",
};

const LastPage = styled.div`
  ${pageRoot}
  display: grid;
  place-items: center;
  z-index: -1;
`;

const Page = styled.div`
  ${pageRoot}

  &:nth-child(1) {
    transition: all 2.2s ease 0.5s;
  }
  &:nth-child(2) {
    transition: all 2.4s ease 0.5s;
  }
  &:nth-child(3) {
    transition: all 2.4s ease 0.5s;
  }
  &:nth-child(4) {
    transition: all 2.6s ease 0.5s;
  }
  &:nth-child(5) {
    transition: all 2.8s ease 0.5s;
  }
`;

// .title {
// 	font-size: 40px;
// }
// .book:hover .cover {
// 	transform: rotateX(10deg) rotateY(-180deg);
// }
// .book:hover .page {
// 	transform: rotateX(10deg) rotateY(-180deg);
// 	z-index: 1;
// }
