import React, { useEffect, useState } from "react";
import {
  useLocation,
  useParams,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import ApplicationPopup from "./components/ApplicationPopup";
import {
  getTotalApplicationList,
  editGroupImage,
  editGroupData,
} from "../../utils/firebase";
import { useSelector } from "react-redux";
import camera from "./../../sources/camera.png";
import checked from "./../../sources/checked.png";
import GroupPage from ".";
import NotesPage from "../Notes/NotesPage";
import Bookshelff from "../Bookshelf";
import GroupMilestone from "../MileStones/GroupMilestone";
import { successAlert, errorAlert } from "../../utils/alert";
import { DisappearedLoading } from "react-loadingg";
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
} from "./style/GroupHeader.style";

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
  const [isLoading, setIsLoading] = useState(true);
  const [checkMember, setCheckMember] = useState(false);
  const [checkOwner, setCheckOwner] = useState(false);
  const root = window.location.host;
  const pathname = useLocation().pathname;
  const { path } = useRouteMatch();

  useEffect(() => {
    setActive("");
    if (groupsList.length > 0) {
      const unsubscribe = getTotalApplicationList(
        groupID,
        setApplicationData,
        userData,
        setAppliedData
      );

      const currentGroupData = groupsList?.find((g) => g.groupID === groupID);
      if (currentGroupData) {
        setTitleValue(currentGroupData?.name);
        setContent(currentGroupData);
        setCheckMember(currentGroupData.membersList?.includes(userData?.uid));
        setCheckOwner(currentGroupData.creatorID === userData?.uid);
        setImageCover(currentGroupData.coverImage);
      }
      setIsLoading(false);
      return () => {
        unsubscribe();
      };
    }
  }, [groupsList, groupID, userData]);

  const handleSubmitImg = () => {
    setActEditImage(!actEditImage);
    editGroupImage(file, content.groupID).then(() =>
      successAlert("???????????????")
    );
  };

  const handleApplicationBtn = () => {
    if (userData === null) {
      errorAlert("???????????????????????????");
      return;
    }
    setShowApplication(!showApplication);
  };

  const previewImg = file ? URL.createObjectURL(file) : imageCover;

  const submitTitle = () => {
    setActEdit(false);
    const data = {
      name: titleValue,
    };
    editGroupData(data, content.groupID);
    successAlert("??????????????????");
  };

  if (userData === undefined || isLoading) {
    return <DisappearedLoading />;
  } else if (!isLoading)
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
            successAlert("?????????????????????");
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
                {`???????????? ${applicationData?.count} ???`}
              </LiStyled>
            </>
          )}
        {!checkMember && !checkOwner && (
          <LiStyled onClick={handleApplicationBtn}>
            {appliedData ? "????????????" : "????????????"}
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
            <span>????????????</span>
          </LinkStyled>

          <LinkStyled
            to={`/group/${groupID}/articles`}
            onClick={() => {
              setActive("milestone");
            }}
            tag={(active === "milestone").toString()}
          >
            <Miles />
            <span> ????????????</span>
          </LinkStyled>
          {(checkMember || checkOwner) && (
            <LinkStyled
              to={`/group/${groupID}/notes`}
              onClick={() => {
                setActive("note");
              }}
              tag={(active === "note").toString()}
            >
              <Folder />
              <span>????????????</span>
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
