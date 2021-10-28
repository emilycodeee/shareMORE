import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as firebase from "../../utils/firebase";

const Wrapper = styled.div`
  display: flex;
`;

const SearchCtn = styled.input`
  float: left;
  width: 188px;
  height: 42px;
  padding: 0 15px;
  border: 1px solid var(--light);
  background-color: #eceff1;
  border-radius: 21px;
  @include font();
  &:focus {
    outline: none;
  }
`;

const ME = styled.p`
  color: red;
`;

const YOU = styled.p`
  color: blue;
`;

const Chat = styled.div`
  display: flex;
`;

const ChatRoom = ({ user, userList }) => {
  // console.log(user?.uid);
  // console.log("xxx", user);
  const { sendTo } = useParams();
  const [text, setText] = useState("");
  const [messagesData, setMessagesData] = useState([]);
  console.log(sendTo.trim().length);
  const senderData = userList?.find((item) => item.userID === user?.uid);
  console.log(senderData);

  useEffect(() => {
    if (!user) return;
    console.log(user.uid);
    firebase.getMessagesData(user.uid, sendTo, setMessagesData);
    // firebase;
    //   .getMessagesData(user.uid, setMessagesData)
    //   .then((res) => console.log(res));
  }, [user]);

  const handleSendMsg = () => {
    const usersID = [sendTo, user.uid];
    const data = {
      sender: user.uid,
      receiver: sendTo,
      usersID,
      text,
      creationTime: new Date(),
    };

    firebase.sendMessage(data, user.uid, sendTo);
  };
  // console.log(messagesData);
  // console.log(text);
  return (
    <Wrapper>
      <div>
        <h1>聊天列表</h1>
        <ul>
          <li>小王</li>
          <li>小名</li>
          <li>小山</li>
        </ul>
      </div>
      <div>
        <div>
          <h1>跟{sendTo}</h1>
          <div>開始聊天</div>
          {messagesData?.map((item) => {
            return (
              <Chat key={item.docID}>
                <div>
                  <div>
                    {/* {
                      // console.log(item)
                      userList.find((p) => item.sender === p.userID)
                        ?.displayName
                    }
                    說: */}
                  </div>
                  <div>{item.text}</div>
                  <div>2012/02/13</div>
                </div>
                <div>
                  <div>
                    {
                      // console.log(item)
                      userList.find((p) => item.receiver === p.userID)
                        ?.displayName
                    }
                    說:
                  </div>
                  <div>{item.text}</div>
                  <div>2012/02/13</div>
                </div>
              </Chat>
            );
          })}
        </div>
        <div>
          <SearchCtn
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button onClick={handleSendMsg}>送出</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default ChatRoom;
