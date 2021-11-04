import React from "react";
import { useState } from "react";
import styled from "styled-components";
import * as firebase from "../../utils/firebase";

// https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey

const Ctn = styled.div`
  border: 1px solid red;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const Book = () => {
  const apiKey = "AIzaSyAqLYhGrr5TzR7I_X4OqAXWRfH4DDdKvzc";

  const [value, setValue] = useState("");
  const [content, setContent] = useState([]);
  const [book, choiceBook] = useState({});
  const submit = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${value}&maxResults=40`
    )
      .then((res) => res.json())
      .then((data) => setContent(data.items))
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
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={submit}>送出</button>
      <Wrapper>
        {content.length > 1 &&
          content?.map((b, i) => {
            console.log(b.volumeInfo.title);
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
      </Wrapper>
    </div>
  );
};

export default Book;
