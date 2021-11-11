import React from "react";
import styled from "styled-components";
import { useParams, useHistory, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as firebase from "../../utils/firebase";
import { BsUpload } from "react-icons/bs";
// BsFillFolderFill;
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
  const endpoint = useLocation().pathname;
  const history = useHistory();
  const [contentsList, setContentsList] = useState([]);
  const groupsList = useSelector((state) => state.groupsList);
  const usersList = useSelector((state) => state.usersList);
  const userData = useSelector((state) => state.userData);
  const currentGroupData = groupsList.find((item) => item?.groupID === groupID);
  let emptyText = "目前尚未建立社群筆記";
  const checkGroupCreator = currentGroupData?.creatorID === userData?.uid;
  console.log(currentGroupData);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (endpoint.includes("notes")) {
        console.log("你在筆記葉");
        firebase
          .getGroupNotes("groups", groupID, "notes")
          .then((res) => setContentsList(res))
          .catch((err) => console.log(err));
      } else if (endpoint.includes("milestones")) {
        firebase.getGroupMilestones(groupID).then((res) => {
          const filterPublic = res.filter((item) => {
            return item.public === true;
          });
          setContentsList(filterPublic);
          emptyText = "目前尚未存在與社團相關的公開里程碑";
        });
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // <LinkStyle to={`/group/${groupID}/notes/${postID}/post`}>
  //   設為精選筆記
  // </LinkStyle>;

  // FaFileUpload;

  const getTime = (content) => {
    const time = new Date(content.creationTime?.toDate()).toLocaleString(
      "zh-TW"
    );
    return time;
  };
  return (
    <Wrapper>
      <TopCtn>
        <Search placeholder="請輸入標題名稱、內容..." />
        <TopBtn>最新發起</TopBtn>
        {endpoint.includes("milestones") && (
          <TopBtn>
            <Link to="/milestones/post">建立里程碑</Link>
          </TopBtn>
        )}
        {checkGroupCreator && endpoint.includes("notes") && (
          <TopBtn>
            <Link to={`/group/${groupID}/notes/post`}>
              <BsUpload />
            </Link>
          </TopBtn>
        )}
      </TopCtn>
      {contentsList?.length === 0 && <div>{emptyText}</div>}
      {contentsList?.map((item) => {
        let url;
        if (endpoint.includes("notes")) {
          url = `/group/${groupID}/notes/${item?.noteID}`;
        } else if (endpoint.includes("milestones")) {
          url = `/milestone/${item.milestoneID}`;
        }
        return (
          <Notes key={item?.noteID || item?.milestoneID} to={url}>
            <Cover src={item.coverImage} />
            <Content>
              <TitleStyle>{item.title}</TitleStyle>
              <TimeTag>
                {usersList.find((p) => p.uid === item.creatorID)?.displayName}
              </TimeTag>
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
