import React from "react";
import { useState, useEffect, useRef } from "react";
import RichTextEditor from "../../components/RichTextEditor";
import * as firebase from "../../utils/firebase";
import Select from "react-select";
import Switch from "../../components/Switch";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  successAlert,
  warningAlert,
  errorAlert,
  textAlert,
} from "../../utils/alert";
import { DisappearedLoading } from "react-loadingg";
import {
  ContainerStyled,
  MainContainer,
  SideSetting,
  LabelCtn,
  InputCtn,
  UploadBtn,
  SubmitBtn,
  SwitchCtn,
  SettingLb,
  PreViewCtn,
  EditorArea,
  SettingWrapper,
  Introduce,
  OriginLabel,
} from "./style/MilestoneEditor.style.jsx";

const MilestoneEditor = () => {
  const history = useHistory();
  const groupsList = useSelector((state) => state.groupsList);
  const userData = useSelector((state) => state.userData);
  const { milestoneID } = useParams();
  const [originContent, setOriginContent] = useState(null);
  const [title, setTitle] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [groupsName, setgroupsName] = useState("");
  const [selected, setSelected] = useState(null);
  const [check, setCheck] = useState(true);
  const [originLabel, setOriginLabel] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2Fdefault.jpg?alt=media&token=da2e2f35-7239-4961-94bb-89af13aaca66"
  );
  const editMode = useRef(false);

  if (userData === null) {
    history.push("/");
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (milestoneID) {
        firebase.getMilestone("articles", milestoneID).then((res) => {
          if (
            userData !== undefined &&
            groupsList.length > 0 &&
            Object.keys(userData).length > 0
          ) {
            if (res.creatorID !== userData.uid) history.push("/");
            setTitle(res.title);
            setIntroduce(res.introduce);
            setOriginLabel(
              groupsList.find((item) => item.groupID === res.groupID)?.name
            );
            setSelected(res.groupID);
            setValue(res.content);
            setCheck(res.public);
            setOriginContent(res);
            setPreviewUrl(res.coverImage);
            setIsLoading(false);
            editMode.current = true;
          }
        });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [userData, groupsList]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (
        userData !== undefined &&
        groupsList.length > 0 &&
        Object.keys(userData).length > 0
      ) {
        const myGroups = groupsList.filter((g) =>
          g.membersList?.includes(userData.uid)
        );
        const myCreateGroups = groupsList.filter(
          (g) => g.creatorID === userData.uid
        );

        const groupOpt = [...myGroups, ...myCreateGroups].map((g) => {
          return { value: g.groupID, label: g.name };
        });

        if (groupOpt.length === 0) {
          textAlert("目前沒有任何所屬社群，到廣場看看有興趣的主題吧！");
          history.push("/");
        }
        setgroupsName(groupOpt);
        setIsLoading(false);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [userData, groupsList]);

  const editorHandler = (e) => {
    setValue(e);
  };

  const handleSubmit = () => {
    if (userData === null) {
      warningAlert("請先登入或註冊會員！");
      return;
    }

    if (value.length === 0 || introduce.length === 0) {
      errorAlert("請填寫完整內容!");
      return;
    }

    if (selected === null) {
      errorAlert("請選擇社群名稱!");
      return;
    }

    if (editMode.current) {
      const data = {
        coverImage: originContent.coverImage,
        content: value,
        groupID: selected,
        public: check,
        title,
        introduce,
      };

      firebase
        .editArticles(data, file, milestoneID, originContent.coverImage)
        .then(() => {
          successAlert("編輯成功");
          history.push(`/article/${milestoneID}`);
        });
    } else {
      const data = {
        creatorID: userData.uid,
        content: value,
        groupID: selected,
        public: check,
        creationTime: new Date(),
        title,
        introduce,
      };

      firebase.postArticles(data, file).then((res) => {
        successAlert("建立成功");
        history.push(`/article/${res}`);
      });
    }
  };

  const previewImg = file ? URL.createObjectURL(file) : previewUrl;
  if (userData === undefined || isLoading) {
    return <DisappearedLoading />;
  } else if (!isLoading)
    return (
      <ContainerStyled>
        <MainContainer>
          <LabelCtn>分享我的學習成果</LabelCtn>
          <InputCtn
            placeholder="請輸入標題..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <EditorArea>
            <RichTextEditor value={value} editorHandler={editorHandler} />
          </EditorArea>
        </MainContainer>
        <SideSetting>
          <SettingLb> 文章設定</SettingLb>
          <SettingWrapper>
            <SwitchCtn>
              <div>設為公開</div>
              <Switch check={check} setCheck={setCheck} />
            </SwitchCtn>
            {editMode.current && (
              <OriginLabel>原社團設定為：{originLabel}</OriginLabel>
            )}
            <Select
              defaultValue={selected}
              onChange={(e) => {
                setSelected(e.value);
              }}
              options={groupsName}
            />
            <Introduce
              value={introduce}
              placeholder="請輸入文章摘要"
              onChange={(e) => setIntroduce(e.target.value)}
            />
            <input
              type="file"
              id="upload-img"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  if (!e.target.files[0].type.includes("image")) {
                    errorAlert("圖片格式怪怪的");
                    return;
                  }
                }
                setFile(e.target.files[0]);
              }}
            />
            <UploadBtn htmlFor="upload-img">
              <PreViewCtn src={previewImg} />
            </UploadBtn>
          </SettingWrapper>
          <SubmitBtn onClick={handleSubmit}>確認送出</SubmitBtn>
        </SideSetting>
      </ContainerStyled>
    );
};

export default MilestoneEditor;
