import React, { useEffect, useState } from "react";
import {
  useLocation,
  useParams,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import ApplicationPopup from "./components/ApplicationPopup";
import * as firebase from "../../utils/firebase";
import { useSelector } from "react-redux";
import camera from "./../../sources/camera.png";
import checked from "./../../sources/checked.png";
import GroupPage from ".";
import NotesPage from "../Notes/NotesPage";
import Bookshelff from "../Bookshelf";
import GroupMilestone from "../MileStones/GroupMilestone";
import { successAlert, errorAlert } from "../../utils/alert";
import {
  Bookshelf,
  Miles,
  Folder,
  SaveImage,
  TopCover,
  EditImage,
  DivCtn,
  ImgWrapper,
  Wrapper,
  NameLogo,
  NameInput,
  UlStyled,
  WelcomeToggle,
  LiStyled,
  ShareStyled,
  LinkStyled,
  Shield,
  EditIcon,
  ShareIcon,
  SubmitIcon,
  TitleBar,
} from "./style/GroupHeader.style.jsx";

const GroupHeader = () => {
  const { groupID } = useParams();
  const userData = useSelector((state) => state.userData);
  const groupsList = useSelector((state) => state.groupsList);
  const [actEditImage, setActEditImage] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [applicationData, setApplicationData] = useState({});
  const [appliedData, setAppliedData] = useState("");
  const [imageCover, setImageCover] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [actEdit, setActEdit] = useState(false);
  const [active, setActive] = useState("");
  const [content, setContent] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setActive("");
      if (groupsList.length > 0) {
        firebase.getTotalApplicationList(groupID, setApplicationData);
        const currentGroupData = groupsList?.find((g) => g.groupID === groupID);

        if (currentGroupData) {
          setTitleValue(currentGroupData?.name);
          setContent(currentGroupData);
          setImageCover(currentGroupData.coverImage);
        }
      }
    }
    return () => {
      isMounted = false;
    };
  }, [groupsList, groupID]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const data = applicationData.data?.find(
        (each) => each.applicantID === userData?.uid
      );
      if (data) {
        setAppliedData(data);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [applicationData]);

  const root = window.location.host;
  const pathname = useLocation().pathname;
  const { path } = useRouteMatch();

  const handleSubmitImg = () => {
    setActEditImage(!actEditImage);
    firebase
      .editGroupImage(file, content.groupID)
      .then(() => successAlert("修改成功！"));
  };

  const handleApplicationBtn = () => {
    if (userData === null) {
      errorAlert("請先登入或加入會員");
      return;
    }
    setShowApplication(!showApplication);
  };

  const previewImg = file ? URL.createObjectURL(file) : imageCover;

  let checkMember, checkOwner, checkGeneralMember;

  const checkStatus = () => {
    let isMounted = true;

    if (isMounted) {
      checkMember =
        (userData !== null && content?.membersList?.includes(userData?.uid)) ||
        content?.creatorID === userData?.uid;
      checkOwner = content?.creatorID === userData?.uid;
      checkGeneralMember =
        userData !== null && content?.membersList?.includes(userData?.uid);
    }

    return () => {
      isMounted = false;
    };
  };
  checkStatus();

  const submitTitle = () => {
    setActEdit(false);
    const data = {
      name: titleValue,
    };
    firebase.editGroupData(data, content.groupID);
    successAlert("資料修改成功");
  };

  if (showApplication) {
    return (
      <Shield
        data-target="shield"
        onClick={(e) => {
          e.target.dataset.target === "shield" &&
            setShowApplication(!showApplication);
        }}
      >
        <ApplicationPopup
          appliedData={appliedData}
          groupData={content}
          applicationData={applicationData}
        />
      </Shield>
    );
  }
  return (
    <>
      <ImgWrapper>
        <input
          type="file"
          id="uploadImg"
          style={{ display: "none" }}
          onChange={(e) => {
            setFile(e.target.files[0]);
            setActEditImage(!actEditImage);
          }}
        />
        <TopCover style={{ backgroundImage: `url(${previewImg})` }} />
        {checkOwner && !actEditImage && (
          <div>
            <DivCtn as="label" htmlFor="uploadImg">
              <EditImage src={camera} />
            </DivCtn>
          </div>
        )}
        {checkOwner && actEditImage && (
          <SaveImage src={checked} onClick={handleSubmitImg} />
        )}
      </ImgWrapper>
      <WelcomeToggle>
        <ShareStyled
          onClick={() => {
            navigator.clipboard.writeText(root + pathname);
            successAlert("成功複製連結！");
          }}
        >
          <ShareIcon />
        </ShareStyled>
        {content?.creatorID === userData?.uid &&
          applicationData?.count !== undefined && (
            <>
              <LiStyled
                setShowApplication={setShowApplication}
                onClick={() => {
                  setShowApplication(!showApplication);
                }}
              >
                {`待審申請 ${applicationData?.count} 則`}
              </LiStyled>
            </>
          )}
        {!checkGeneralMember && !checkOwner && (
          <LiStyled onClick={handleApplicationBtn}>
            {appliedData ? "等候審核" : "申請加入"}
          </LiStyled>
        )}
      </WelcomeToggle>
      <Wrapper>
        <TitleBar>
          {!actEdit && (
            <NameLogo to={`/group/${groupID}`}>{titleValue}</NameLogo>
          )}
          {actEdit && (
            <NameInput
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              actEdit={actEdit}
            />
          )}
          {checkOwner && !actEdit && (
            <EditIcon
              onClick={() => {
                setActEdit(!actEdit);
              }}
            />
          )}
          {checkOwner && actEdit && <SubmitIcon onClick={submitTitle} />}
        </TitleBar>

        <UlStyled>
          <LinkStyled
            to={`/group/${groupID}/bookshelf`}
            onClick={() => {
              setActive("bookShelf");
            }}
            tag={(active === "bookShelf").toString()}
          >
            <Bookshelf />
            <span>社團書櫃</span>
          </LinkStyled>

          <LinkStyled
            to={`/group/${groupID}/articles`}
            onClick={() => {
              setActive("milestone");
            }}
            tag={(active === "milestone").toString()}
          >
            <Miles />
            <span> 成果分享</span>
          </LinkStyled>
          {checkMember && (
            <LinkStyled
              to={`/group/${groupID}/notes`}
              onClick={() => {
                setActive("note");
              }}
              tag={(active === "note").toString()}
            >
              <Folder />
              <span>社團筆記</span>
            </LinkStyled>
          )}
        </UlStyled>
      </Wrapper>
      <Switch>
        <Route exact path={`${path}`}>
          <GroupPage />
        </Route>
        <Route exact path={`${path}/bookshelf`}>
          <Bookshelff />
        </Route>
        <Route exact path={`${path}/articles`}>
          <GroupMilestone />
        </Route>
        <Route exact path={`${path}/notes`}>
          <NotesPage />
        </Route>
      </Switch>
    </>
  );
};

export default GroupHeader;
