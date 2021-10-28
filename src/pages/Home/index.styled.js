import React from "react";
import styled from "styled-components";

export const TopCover = styled.div`
  padding: 0;
  margin: 0;
  height: 720px;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

export const ViderCover = styled.video`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: auto;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export const Shield = styled.div`
  z-index: 3;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
`;
