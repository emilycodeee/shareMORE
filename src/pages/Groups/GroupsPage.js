import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import GroupsCard from "../Home/components/GroupsCard";
import { useState, useEffect } from "react";

const MainCtn = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: grid;
  width: 90%;
  padding: 1em;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1.3em;
  grid-row-gap: 1.3em;
  /* border: 1px solid red; */

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ListStyle = styled.li`
  /* text-decoration: none; */
  list-style: none;
`;

const ContentCtn = styled.div`
  display: flex;
`;

const Slide = styled.div``;

const GroupsPage = () => {
  const groupsList = useSelector((state) => state.groupsList);
  const categoryList = useSelector((state) => state.categoryList);
  const [active, setActive] = useState(false);
  const [subClassesName, setSubClassesName] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubClass, setSelectedSubClass] = useState(null);

  const handleCategory = (e) => {
    const target = e.target.innerText;
    const choose = categoryList.find((item) => item.name === target);
    setSubClassesName(choose.subClasses);
    // console.log(e.target.innerText);
  };

  return (
    <MainCtn>
      <input placeholder="請輸入社群名稱..." />
      <ContentCtn>
        <Slide>
          {categoryList.map((item, i) => (
            <ListStyle key={item.name} onClick={handleCategory}>
              {item.name}
            </ListStyle>
          ))}

          <Slide>
            {subClassesName.map((item, i) => (
              <ListStyle key={item}>{item}</ListStyle>
            ))}
          </Slide>
        </Slide>
        <Wrapper>
          {groupsList.map((item) => {
            return <GroupsCard item={item} key={item.groupID} />;
          })}
        </Wrapper>
      </ContentCtn>
    </MainCtn>
  );
};

export default GroupsPage;
