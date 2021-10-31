import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import GroupsCard from "../Home/components/GroupsCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BtnStyled = styled(Link)`
  border: 1px solid red;
`;

const MilestonesPage = () => {
  return (
    <div>
      <div>
        <BtnStyled to="/milestones/post">建立我的里程碑</BtnStyled>
      </div>
      <div>下面有各種</div>
    </div>
  );
};

export default MilestonesPage;

// const MainCtn = styled.div`
//   max-width: 1000px;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
// `;

// const Wrapper = styled.div`
//   display: grid;
//   width: 100%;
//   padding: 1em;
//   align-items: flex-start;
//   grid-template-columns: 1fr 1fr 1fr 1fr;
//   grid-column-gap: 1.3em;
//   grid-row-gap: 1.3em;
//   margin: 0 auto;
//   /* border: 1px solid red; */

//   @media only screen and (max-width: 800px) {
//     grid-template-columns: 1fr 1fr;
//   }
// `;

// const ListStyle = styled.li`
//   cursor: pointer;
//   /* text-decoration: none; */
//   list-style: none;
//   font-weight: 600;
//   margin: 1rem 0;
//   font-size: 1.2rem;
// `;

// const SubList = styled.li`
//   display: ${(props) => (props.active === props.category ? "block" : "none")};

//   list-style: none;
//   font-weight: 500;
//   font-size: 0.9rem;
//   margin-bottom: 0.5rem;
// `;

// const ContentCtn = styled.div`
//   display: flex;
// `;

// const Search = styled.input`
//   width: 70%;
//   border-radius: 25px;
//   box-shadow: none;
//   border: 1px solid rgb(204, 204, 204);
//   padding: 3px 0px 3px 50px;
//   font-size: 18px;
//   margin: 2rem 0;
// `;

// const Slide = styled.div`
//   width: 25%;
//   /* ${(props) => console.log(props)} */
// `;

// const TopCtn = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// const TopBtn = styled.div`
//   /* flex-grow: 1; */
//   align-self: center;
//   text-align: center;
//   width: 8%;
//   padding: 1% 0;
//   margin-left: 1rem;
//   border-radius: 25px;
//   background-color: #f5f5f5;
//   box-shadow: rgb(0 0 0 / 10%) 0px 2px 6px;
//   cursor: pointer;
// `;

// const GroupsPage = () => {
//   const groupsList = useSelector((state) => state.groupsList);
//   const categoryList = useSelector((state) => state.categoryList);
//   const [active, setActive] = useState(false);
//   const [subClassesName, setSubClassesName] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubClass, setSelectedSubClass] = useState(null);

//   const handleCategory = (e) => {
//     const target = e.target.innerText;
//     setSubClassesName(target);
//     // console.log(target);
//     // const choose = categoryList.find((item) => item.name === target);
//     // setSubClassesName(choose.subClasses);
//     // console.log(e.target.innerText);
//   };

//   return (
//     <MainCtn>
//       <TopCtn>
//         <Search placeholder="請輸入社群名稱..." />
//         <TopBtn>最新發起</TopBtn>
//         <TopBtn>排序</TopBtn>
//       </TopCtn>
//       <ContentCtn>
//         <Slide>
//           {categoryList.map((item, i) => (
//             <>
//               <ListStyle key={i + item.name} onClick={handleCategory}>
//                 {item.name}
//               </ListStyle>
//               {item.subClasses.map((sitem, i) => (
//                 <SubList
//                   key={i + sitem}
//                   category={item.name}
//                   active={subClassesName}
//                 >
//                   {sitem}
//                 </SubList>
//               ))}
//             </>
//           ))}
//         </Slide>
//         <Wrapper>
//           {groupsList.map((item) => {
//             return <GroupsCard item={item} key={item.groupID} />;
//           })}
//         </Wrapper>
//       </ContentCtn>
//     </MainCtn>
//   );
// };

// export default GroupsPage;
