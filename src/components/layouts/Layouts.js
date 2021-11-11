import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const Main = styled.div`
  /* margin-top: 140px; */
  margin: 0 auto;
  /* max-width: 1000px; */
  /* position: relative; */
  /* min-height: calc(100vh - 255px);
  */
  @media only screen and (max-width: 1280px) {
    /* max-width: 1200px; */
    /* margin-top: 92px; */
    /* min-height: calc(100vh - 300px); */
  }
`;

const Layouts = (props) => {
  return (
    <>
      <Header user={props.user} />
      <Main>{props.children}</Main>
      {/* <Footer /> */}
    </>
  );
};

export default Layouts;

// const Wrapper = styled.div`
//   height: 100%;
//   width: 100%;
//   /* margin: 2rem; */
//   background-color: rgba(255, 255, 255, 0.9);
//   @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
//     -webkit-backdrop-filter: blur(35px);
//     backdrop-filter: blur(35px);
//     background-color: rgba(255, 255, 255, 0.5);
//   }
// `;

// const Container = styled.div`
//   /* height: 100vh; */
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-image: url(${({ bg }) => bg});
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: center;
// `;
