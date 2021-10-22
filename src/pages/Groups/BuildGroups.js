import React from "react";
import SimpleEditor from "../../components/SimpleEditor";
import Select from "react-select";
import { useState, useEffect } from "react";
import styled from "styled-components";
import * as firebase from "../../utils/firebase";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 5% 20%;
`;

const LabelCtn = styled.label`
  /* color: red; */
  display: flex;
  flex-wrap: nowrap;
  margin-right: 10px;
`;

const Field = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;

const InputCtn = styled.input`
  /* width: 200px; */
  flex-grow: 1;
  resize: none;

  /* overflow: hidden; */
  /* width: 100%; */
  /* min-height: 50px; */
`;

const EditBtn = styled.div`
  color: red;
`;

const EditArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const BuildGroups = ({ user, categoriesName }) => {
  console.log(user);
  const initText = `<p>-目標建立tips-</p><p>SMART 原則</p><p>S- Specific (具體的)</p><p>M- Measurable (可衡量的)</p><p>A- Attainable (可實現的)</p><p>R- Relevant（息息相關的）</p><p>T- Timely (有時限的)</p>`;
  //init
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
    firebase.getQueryFilter(
      "categories",
      "name",
      selectedCategory,
      setSubClassesName
    );
  }, [selectedCategory]);

  const previewImg = file
    ? URL.createObjectURL(file)
    : "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image.jpg";

  const handleSubmit = () => {
    const data = {
      name,
      goal,
      goalDate,
      category: selectedCategory,
      subClass: selectedSubClass,
      creationTime: new Date(),
      introduce,
      creatorId: user.email,
      public: true,
    };
    firebase.createGroup(data, file);
  };

  return (
    <MainContainer>
      <Field>
        <LabelCtn>主題類別</LabelCtn>
        <Select
          defaultValue={selectedCategory}
          onChange={(e) => {
            console.log(e);
            setSelectedCategory(e.value);
          }}
          options={categoriesName}
        />
      </Field>
      <Field>
        <LabelCtn>子類別</LabelCtn>
        <Select
          defaultValue={selectedSubClass}
          onChange={(e) => {
            console.log(e);
            setSelectedSubClass(e.value);
          }}
          options={subClassesName}
        />
      </Field>
      <Field>
        <LabelCtn>社團名稱</LabelCtn>
        <InputCtn
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Field>
      <EditArea>
        <LabelCtn>社團學習目標</LabelCtn>
        <SimpleEditor goal={goal} setGoal={setGoal} />
      </EditArea>
      <Field>
        <LabelCtn>為目標訂下完成日</LabelCtn>
        <InputCtn
          type="date"
          onChange={(e) => {
            setGoalDate(e.target.value);
          }}
        />
      </Field>
      <Field>
        <LabelCtn>社團介紹</LabelCtn>
        <InputCtn
          style={{ minHeight: "100px" }}
          placeholder="關於這個社團我想說......"
          value={introduce}
          onChange={(e) => {
            setIntroduce(e.target.value);
          }}
        />
      </Field>
      <InputCtn
        type="file"
        id="upload-img"
        style={{ display: "none" }}
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <img src={previewImg} style={{ width: "300px" }} />
      <label htmlFor="upload-img">上傳文章圖片</label>

      <button onClick={handleSubmit}>確認送出</button>
    </MainContainer>
  );
};

export default BuildGroups;
