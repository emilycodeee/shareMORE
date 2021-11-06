import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import GroupsCard from "../Home/components/GroupsCard";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
const MainCtn = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  padding: 1em;
  align-items: flex-start;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1.3em;
  grid-row-gap: 1.3em;
  margin: 0 auto;
  /* border: 1px solid red; */

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ListStyle = styled.li`
  cursor: pointer;
  /* text-decoration: none; */
  list-style: none;
  font-weight: 600;
  margin: 1rem 0;
  font-size: 1.2rem;
`;

const SubList = styled.li`
  display: ${(props) => (props.active === props.category ? "block" : "none")};
  cursor: pointer;
  list-style: none;
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ContentCtn = styled.div`
  display: flex;
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

const Slide = styled.div`
  width: 25%;
  /* ${(props) => console.log(props)} */
`;

const TopCtn = styled.div`
  display: flex;
  justify-content: center;
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

const GroupsPage = () => {
  const groupsList = useSelector((state) => state.groupsList);
  const categoryList = useSelector((state) => state.categoryList);
  const [active, setActive] = useState(false);
  const [subClassesName, setSubClassesName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubClass, setSelectedSubClass] = useState(null);
  const [renderGroups, setRenderGroups] = useState([]);

  const handleSubCategory = (e) => {
    const target = e.target.innerText;
    const filterCategory = groupsList.filter((g) => g.subClass === target);
    setRenderGroups(filterCategory);
    console.log(target);
  };

  const handleCategory = (e) => {
    const target = e.target.innerText;
    const filterCategory = groupsList.filter((g) => g.category === target);
    setRenderGroups(filterCategory);
    setSubClassesName(target);
  };

  useEffect(() => {
    setRenderGroups(groupsList);
  }, [groupsList]);

  return (
    <MainCtn>
      <TopCtn>
        <Search placeholder="請輸入社群名稱..." />
        <TopBtn>最新發起</TopBtn>
        <TopBtn>排序</TopBtn>
      </TopCtn>
      <ContentCtn>
        <Slide>
          {categoryList.map((item, i) => (
            <div key={uuidv4()}>
              <ListStyle onClick={handleCategory}>{item.name}</ListStyle>
              {item.subClasses.map((sitem, i) => (
                <SubList
                  key={uuidv4()}
                  category={item.name}
                  active={subClassesName}
                  onClick={handleSubCategory}
                >
                  {sitem}
                </SubList>
              ))}
            </div>
          ))}
        </Slide>
        <Wrapper>
          {renderGroups.map((item) => {
            return <GroupsCard item={item} key={item.groupID} />;
          })}
        </Wrapper>
      </ContentCtn>
    </MainCtn>
  );
};

export default GroupsPage;
