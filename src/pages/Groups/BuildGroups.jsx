import React from "react";
import SimpleEditor from "../../components/SimpleEditor";
import Select from "react-select";
import { useState, useEffect } from "react";
import { createGroup } from "../../utils/firebase";
import { useHistory } from "react-router-dom";
import { initText, uploadPicture } from "../../utils/common";
import { useSelector } from "react-redux";
import { errorAlert, successAlert, warningAlert } from "../../utils/alert";
import {
  MainContainer,
  LabelCtn,
  LabelWrapper,
  Field,
  ImgField,
  InputCtn,
  TextareaCtn,
  EditArea,
  Slogan,
  UploadBtn,
  SubmitBtn,
  PreViewCtn,
} from "./style/BuildGroups.style";

const BuildGroups = () => {
  const history = useHistory();
  const categoryList = useSelector((state) => state.categoryList);
  const userData = useSelector((state) => state.userData);

  const CategoryOpt = categoryList.map((item) => {
    return { value: item.name, label: item.name };
  });

  const [file, setFile] = useState(null);
  const [subClassesName, setSubClassesName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubClass, setSelectedSubClass] = useState(null);

  //status
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(initText);
  const [goalDate, setGoalDate] = useState("");
  const [introduce, setIntroduce] = useState("");

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const subCategoryObj = categoryList.find(
        (item) => item.name === selectedCategory
      );
      const subCategoryOpt = subCategoryObj?.subClasses.map((item) => {
        return { value: item, label: item };
      });
      setSubClassesName(subCategoryOpt);
    }
    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  const previewImg = file
    ? URL.createObjectURL(file)
    : "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2Fdefault.jpg?alt=media&token=da2e2f35-7239-4961-94bb-89af13aaca66";

  const handleSubmit = () => {
    if (userData === null) {
      warningAlert("??????????????????????????????");
      return;
    }

    if (goal.length === 0 || name.length === 0 || goalDate.length === 0) {
      errorAlert("?????????????????????");
      return;
    }

    if (selectedCategory === null || selectedSubClass === null) {
      errorAlert("?????????????????????");
      return;
    }

    const data = {
      name,
      goal,
      goalDate,
      category: selectedCategory,
      subClass: selectedSubClass,
      creationTime: new Date(),
      introduce,
      creatorID: userData.uid,
      public: true,
    };
    createGroup(data, file).then((res) => {
      successAlert("?????????????????????");
      history.push(`/group/${res}`);
    });
  };

  const today = new Date().toISOString().split("T")[0];
  return (
    <MainContainer>
      <Slogan>shareMore????????????????????????</Slogan>
      <Field>
        <LabelWrapper>
          <LabelCtn>????????????</LabelCtn>
          <Select
            defaultValue={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.value);
            }}
            options={CategoryOpt}
          />
        </LabelWrapper>
        <LabelWrapper>
          <LabelCtn>?????????</LabelCtn>
          <Select
            defaultValue={selectedSubClass}
            onChange={(e) => {
              setSelectedSubClass(e.value);
            }}
            options={subClassesName}
          />
        </LabelWrapper>
      </Field>

      <Field>
        <LabelCtn>????????????</LabelCtn>
        <InputCtn
          placeholder="?????????????????????????????????"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Field>
      <EditArea>
        <LabelCtn>????????????</LabelCtn>
        <SimpleEditor goal={goal} setGoal={setGoal} />
      </EditArea>
      <Field>
        <LabelCtn>???????????????</LabelCtn>
        <InputCtn
          type="date"
          min={today}
          onChange={(e) => {
            setGoalDate(e.target.value);
          }}
        />
      </Field>
      <Field>
        <LabelCtn>????????????</LabelCtn>
        <TextareaCtn
          style={{ minHeight: "100px" }}
          placeholder="??????????????????????????????......"
          value={introduce}
          onChange={(e) => {
            setIntroduce(e.target.value);
          }}
        />
      </Field>
      <ImgField>
        <InputCtn
          type="file"
          id="upload-img"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            uploadPicture(e, setFile);
          }}
        />
        <UploadBtn htmlFor="upload-img">
          <PreViewCtn src={previewImg} style={{ width: "300px" }} />
        </UploadBtn>
      </ImgField>
      <SubmitBtn onClick={handleSubmit}>????????????</SubmitBtn>
    </MainContainer>
  );
};

export default BuildGroups;
