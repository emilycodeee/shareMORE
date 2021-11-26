import React from "react";
import { DisappearedLoading } from "react-loadingg";
import { useParams, useHistory, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getGroupNotes } from "../../utils/firebase";
import {
  Empty,
  CreateButton,
  Wrapper,
  Notes,
  NotesArea,
  Content,
  Cover,
  TitleStyle,
  TimeTag,
  TextTag,
} from "./style/NotesPage.style";

const NotesPage = () => {
  const { groupID } = useParams();
  const history = useHistory();
  const endpoint = useLocation().pathname;
  const [contentsList, setContentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const groupsList = useSelector((state) => state.groupsList);
  const usersList = useSelector((state) => state.usersList);
  const userData = useSelector((state) => state.userData);

  if (userData === null) {
    history.push(`/group/${groupID}`);
  }

  useEffect(() => {
    if (groupsList.length > 0) {
      const checkGroup = groupsList.findIndex((g) => g.groupID === groupID);
      if (checkGroup < 0) {
        history.push("/404");
      } else {
        const groupDetail = groupsList.find((g) => g.groupID === groupID);
        const checkMembership =
          groupDetail?.membersList?.includes(userData?.uid) ||
          groupDetail?.creatorID === userData?.uid;

        if (!checkMembership) {
          history.push(`/group/${groupID}`);
        }
        setIsLoading(false);
      }
    }
  }, [userData, groupsList]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getGroupNotes("groups", groupID, "notes")
        .then((res) => setContentsList(res))
        .catch((err) => console.log(err));
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const getTime = (content) => {
    const time = new Date(content.creationTime?.toDate()).toLocaleString(
      "zh-TW"
    );
    return time;
  };

  if (userData === undefined || isLoading) {
    return <DisappearedLoading />;
  } else if (!isLoading)
    return (
      <>
        <Wrapper>
          {endpoint.includes("notes") && (
            <CreateButton to={`/group/${groupID}/new/notes`}>
              建立社團筆記
            </CreateButton>
          )}

          {contentsList?.length === 0 && (
            <Empty>
              <div>目前尚未建立社群筆記，就從你開始吧</div>
              <lottie-player
                src="https://assets5.lottiefiles.com/packages/lf20_n2m0isqh.json"
                background="transparent"
                speed="1"
                style={{ maxWidth: "250px", maxHeight: "250px" }}
                loop
                autoplay
              />
            </Empty>
          )}

          <NotesArea>
            {contentsList?.map((item) => {
              let url;
              if (endpoint.includes("notes")) {
                url = `/group/${groupID}/notes/${item?.noteID}`;
              } else if (endpoint.includes("milestones")) {
                url = `/article/${item.milestoneID}`;
              }
              return (
                <Notes key={item?.noteID || item?.milestoneID} to={url}>
                  <Cover itemImg={item.coverImage} />
                  <Content>
                    <TitleStyle>{item.title}</TitleStyle>
                    <TimeTag>
                      {
                        usersList.find((p) => p.uid === item.creatorID)
                          ?.displayName
                      }
                    </TimeTag>
                    <TimeTag>{getTime(item)}</TimeTag>
                    <TextTag>{item.introduce}</TextTag>
                  </Content>
                </Notes>
              );
            })}
          </NotesArea>
        </Wrapper>
      </>
    );
};

export default NotesPage;
