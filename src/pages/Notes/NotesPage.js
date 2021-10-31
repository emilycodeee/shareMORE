import React from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as firebase from "../../utils/firebase";

const Wrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const Notes = styled(Link)`
  box-shadow: 0 2px 10px #a2a2a2;
  margin-bottom: 2rem;
  height: 150px;
  text-decoration: none;
  color: black;
  border-radius: 25px;
  border: 1px solid rgb(204, 204, 204);
  display: flex;
`;

const Content = styled.div`
  padding: 0 1rem 1rem 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const Search = styled.input`
  width: 70%;
  height: 1.8rem;
  border-radius: 25px;
  box-shadow: none;
  border: 1px solid rgb(204, 204, 204);
  padding: 4px 0px 4px 50px;
  font-size: 18px;
  margin: 2rem 0;
`;

const TopBtn = styled.div`
  /* flex-grow: 1; */
  align-self: center;
  text-align: center;
  width: 8%;
  padding: 1% 0;
  margin-left: 1rem;
  border-radius: 25px;
  background-color: #f5f5f5;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 6px;
  cursor: pointer;
`;

const Cover = styled.img`
  width: 20%;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
`;

const TopCtn = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const TitleStyle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  margin-top: 1rem;
`;

const TimeTag = styled.p`
  align-self: flex-end;
  margin: 3px 0;
  font-size: 12px;
  font-weight: 550;
  color: rgb(111 104 102);
`;

const TextTag = styled.p`
  margin-top: 1rem;
`;

const NotesPage = () => {
  const { groupID } = useParams();
  const history = useHistory();
  const [notesList, setNotesList] = useState([]);
  const groupsList = useSelector((state) => state.groupsList);
  const userData = useSelector((state) => state.userData);

  const currentGroupData = groupsList.find((item) => item.groupID === groupID);

  useEffect(() => {
    firebase
      .getGroupNotes("groups", groupID, "notes")
      .then((res) => setNotesList(res))
      .catch((err) => console.log(err));
  }, []);

  const getTime = (content) => {
    const time = new Date(content.creationTime?.toDate()).toLocaleString(
      "zh-TW"
    );
    return time;
  };

  // console.log(notesList);
  // console.log(
  //   "check",
  //   currentGroupData.membersList.includes(userData.uid) ||
  //     currentGroupData.creatorID === userData.uid
  // );
  // if (currentGroupData) {
  //   const checkStatus =
  //     currentGroupData.membersList?.includes(userData.uid) ||
  //     currentGroupData.creatorID === userData.uid;
  //   if (!checkStatus) {
  //     alert("僅有社員可以查看社群筆記，請先加入會員");
  //     return;
  //   }
  // }

  // if (notesList?.length === 0) {
  //   alert("目前尚未建立社群筆記");
  //   history.push(`/group/${groupID}`);
  //   return;
  // }
  return (
    <Wrapper>
      <TopCtn>
        <Search placeholder="請輸入標題名稱、內容..." />
        <TopBtn>最新發起</TopBtn>
        <TopBtn>排序</TopBtn>
      </TopCtn>
      {notesList?.length === 0 && <div>目前尚未建立社群筆記</div>}
      {notesList?.map((item) => {
        return (
          <Notes
            key={item?.noteID}
            to={`/group/${groupID}/notes/${item?.noteID}`}
          >
            <Cover src={item.coverImage} />
            <Content>
              <TitleStyle>{item.title}</TitleStyle>
              <TimeTag>{getTime(item)}</TimeTag>
              <TextTag>{item.introduce}</TextTag>
            </Content>
          </Notes>
        );
      })}
    </Wrapper>
  );
};

export default NotesPage;
