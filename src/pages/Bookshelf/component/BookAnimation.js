import React from "react";
import styled, { keyframes } from "styled-components";

const BookAnimation = () => {
  return (
    <Main xmlns="http://www.w3.org/2000/svg" viewBox="0 0 749 260">
      <Libro
        d="M-.3 198.8h403.4l24 55.5s60.7-61 127.7-27.8h33s59.8-65.5 118.6-49l-17.6-39c-45.3 4.7-84.2 18-105 55L515.3 48.6s-98.7-16.4-129.2 13.3l64.5 142.4s74-41 110.9-10.3c0 0-61.5-9.5-132.8 35.5l-18.6-39.1-16.8-3.1-30.5-80.2s20.5 13.2 22.5-19.8C428.8 52.7 509.6 64 509.6 64S543.8-5.3 628.4 8l48.9 105s-71.5 22.1-81 89.4l152.4.3"
        fill="none"
        stroke="#f27e59"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
      />
      <div>社群書櫃目前還空空的</div>
    </Main>
  );
};

export default BookAnimation;

const Main = styled.svg`
  /* position: absolute; */
  /* top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
  margin: auto;
`;

const book = keyframes`
  100%{
    stroke-dashoffset:0;
  }
  0%{
    stroke-dashoffset: -2493.08;
  }
`;

const Libro = styled.path`
  stroke-width: 3px;
  stroke-dashoffset: -2493.08;
  stroke-dasharray: 2493.08;
  animation-name: ${book};
  animation-duration: 5s;
  animation-iteration-count: 1;
  /* animation-iteraction-count: 1; */
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
`;

// @keyframes book {
//   100%{
//     stroke-dashoffset:0;
//   }
//   0%{
//     stroke-dashoffset: -2493.08;
//   }
// }
