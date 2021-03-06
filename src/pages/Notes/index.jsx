import React from "react";
import HtmlParser from "react-html-parser";
import { deleteDocItem, getGroupsNoteContent } from "../../utils/firebase";
import { useParams, useHistory } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { convertTime } from "../../utils/common";
import { DisappearedLoading } from "react-loadingg";
import { deleteAlert } from "../../utils/alert";
import {
  TopCover,
  Container,
  Wrapper,
  ContentStyle,
  TopArea,
  EditLink,
  EditBtn,
  BtnWrapper,
  AuthorArea,
  Time,
  TopWrapper,
} from "./style/Index.style";

const NotePage = () => {
  const history = useHistory();
  const { groupID, postID } = useParams();
  const userData = useSelector((state) => state.userData);
  const groupsList = useSelector((state) => state.groupsList);
  const usersList = useSelector((state) => state.usersList);
  const [noteContent, setNoteContent] = useState("");
  const [noteCreator, setNoteCreator] = useState({});
  const [checkNoteCreator, setCheckNoteCreator] = useState(false);
  const [checkGroupCreator, setCheckGroupCreator] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData === null) {
      history.push("/");
    } else if (
      userData !== undefined &&
      Object.keys(userData).length > 0 &&
      groupsList.length > 0
    ) {
      const currentG = groupsList.find((g) => g.groupID === groupID);
      setCheckGroupCreator(currentG.creatorID === userData.uid);
      if (
        !currentG.membersList?.includes(userData.uid) &&
        currentG.creatorID !== userData.uid
      ) {
        history.push("/");
      } else {
        let isMounted = true;
        if (isMounted) {
          getGroupsNoteContent("groups", groupID, "notes", postID)
            .then((res) => {
              if (res === undefined) {
                history.push("/404");
              }
              setNoteContent(res);
              setCheckNoteCreator(res.creatorID === userData.uid);
              setNoteCreator(usersList.find((p) => p.uid === res.creatorID));
              setIsLoading(false);
            })
            .catch((err) => console.log(err));
        }

        return () => {
          isMounted = false;
        };
      }
    }
  }, [userData, groupsList]);

  const handleDelete = () => {
    const firebaseDelete = () => {
      deleteDocItem("groups", groupID, "notes", postID).then(() => {
        history.push(`/group/${groupID}/notes`);
      });
    };
    deleteAlert(firebaseDelete, "????????????????????????");
  };

  if (userData === undefined || isLoading) {
    return <DisappearedLoading />;
  } else if (!isLoading)
    return (
      <Container>
        <Wrapper>
          <TopArea>
            <h1>{noteContent?.title}</h1>
          </TopArea>
          <TopCover
            style={{ backgroundImage: `url(${noteContent?.coverImage})` }}
          />
          <TopWrapper>
            <AuthorArea>
              <div>
                ????????????<span>{noteCreator?.displayName}</span>
              </div>
              <Time>{convertTime(noteContent?.creationTime)}</Time>
            </AuthorArea>
            <BtnWrapper>
              {(checkGroupCreator || checkNoteCreator) && (
                <>
                  {checkNoteCreator && (
                    <EditLink to={`/group/${groupID}/notes/${postID}/edit`}>
                      ??????
                    </EditLink>
                  )}

                  <EditBtn onClick={handleDelete}>??????</EditBtn>
                  <EditLink to={`/group/${groupID}/notes`}>????????????</EditLink>
                </>
              )}
            </BtnWrapper>
          </TopWrapper>
          <ContentStyle>
            <div className="ql-editor">{HtmlParser(noteContent?.content)}</div>
          </ContentStyle>
        </Wrapper>
      </Container>
    );
};

export default NotePage;
