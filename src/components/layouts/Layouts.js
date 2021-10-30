import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const Wrapper = styled.main`
  /* margin: 0 auto; */
`;

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
    <Wrapper>
      <Header user={props.user} />
      <Main>{props.children}</Main>
      {/* <Footer /> */}
    </Wrapper>
  );
};

export default Layouts;
