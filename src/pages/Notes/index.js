import React from "react";
import styled from "styled-components";
import { useLocation, useParams, useHistory } from "react-router";
import { useState, useEffect } from "react";
import * as firebase from "../../utils/firebase";
import { useSelector } from "react-redux";
import HtmlParser from "react-html-parser";
import { convertTime } from "../../utils/commonText";
import {
  BsPencilSquare,
  BsFillTrashFill,
  BsFillHouseDoorFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const TopCover = styled.div`
  /* opacity: 0.8; */

  width: 700px;
  height: 300px;
  /* border: 1px solid red; */
  background-size: cover;
  background-position: center;
  /* margin: 0 auto; */
  margin-top: 2rem;
`;

const Wrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafa;
`;

const ContentStyle = styled.div`
  padding: 1rem;
`;

const TopArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconCtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.5rem;
  margin-left: 0.3rem;
  cursor: pointer;
`;

const IconLink = styled(Link)`
  background-color: transparent;
  border: none;
  padding: 0.5rem;
  margin-left: 0.3rem;
  cursor: pointer;
`;

const IconsWrapper = styled.div`
  display: flex;
  margin-left: 1rem;
`;

const NotePage = () => {
  const { groupID, postID } = useParams();
  const userData = useSelector((state) => state.userData);
  const groupsList = useSelector((state) => state.groupsList);
  const currentGroupData = groupsList.find((item) => item.groupID === groupID);
  console.log(currentGroupData);
  const [noteContent, setNoteContent] = useState("");
  const history = useHistory();
  const checkGroupCreator = currentGroupData?.creatorID === userData?.uid;
  console.log(checkGroupCreator);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      firebase
        .getGroupsNoteContent("groups", groupID, "notes", postID)
        .then((res) => setNoteContent(res))
        .catch((err) => console.log(err));
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // const handleEdit = () => {};

  const handleDelete = () => {
    const check = window.confirm("刪除後將不可恢復，確認要刪除嗎？");
    if (check) {
      firebase.deleteDocc("groups", groupID, "notes", postID).then(() => {
        history.push(`/group/${groupID}/notes`);
      });
    }
  };

  console.log(noteContent);

  return (
    <Wrapper>
      <TopCover
        style={{ backgroundImage: `url(${noteContent?.coverImage})` }}
      />

      <TopArea>
        <h1>{noteContent.title}</h1>
        <IconsWrapper>
          {checkGroupCreator && (
            <>
              <IconLink to={`/group/${groupID}/notes/${postID}/edit`}>
                <BsPencilSquare />
              </IconLink>
              <IconCtn>
                <BsFillTrashFill onClick={handleDelete} />
              </IconCtn>
            </>
          )}
          <IconLink to={`/group/${groupID}`}>
            <BsFillHouseDoorFill />
          </IconLink>
        </IconsWrapper>
      </TopArea>

      <label>{convertTime(noteContent?.creationTime)}</label>

      <ContentStyle>
        <div className="ql-editor">{HtmlParser(noteContent?.content)}</div>
      </ContentStyle>
      <hr />
    </Wrapper>
  );
};

export default NotePage;
