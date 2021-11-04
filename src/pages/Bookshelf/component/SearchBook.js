import React from "react";
import styled from "styled-components";
import { useParams, useHistory, useLocation } from "react-router";
import { useState } from "react";
import * as firebase from "../../../utils/firebase";
const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-right: 120px;
  max-width: 70%;
  outline: none;
  background-color: white;
  z-index: 99;
  border-radius: 3px;
  /* 卷軸 */
  min-height: 150px;
  /* padding: 0px 0px 20px; */
  padding: 2rem;
  max-height: calc(100vh - 240px);
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const Ctn = styled.div`
  border: 1px solid red;
`;

const ResultWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const SearchBook = () => {
  const { groupID } = useParams();
  console.log(groupID);

  const [value, setValue] = useState("");
  const [content, setContent] = useState([]);
  const [book, choiceBook] = useState({});
  const submit = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${value}&maxResults=40`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.items);
        setContent(data.items);
      })
      .catch((err) => console.log(err));
  };

  const choise = (e) => {
    const a = e.target.dataset.obj;
    const obj = JSON.parse(a);
    const groupID = "9HfGGlnlwvzrgVefq3XL";
    const data = {
      ...obj,
      creator: "emily",
      public: false,
    };
    firebase.setGroupBook(groupID, data);
  };

  return (
    <Wrapper>
      <label>查找書目</label>

      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={submit}>搜尋</button>
      <ResultWrapper>
        {content.length > 1 &&
          content?.map((b, i) => {
            // console.log(b.volumeInfo.title);
            return (
              <Ctn key={i}>
                <p>作者：{b.volumeInfo.authors}</p>
                <p>書名:{b.volumeInfo.title}</p>
                <img src={b.volumeInfo?.imageLinks?.smallThumbnail} />
                <button
                  onClick={choise}
                  data-obj={JSON.stringify(b.volumeInfo)}
                >
                  選書
                </button>
              </Ctn>
            );
          })}
      </ResultWrapper>
    </Wrapper>
  );
};

export default SearchBook;
