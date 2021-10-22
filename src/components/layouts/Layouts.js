import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const Main = styled.main`
  /* margin-top: 140px;
  min-height: calc(100vh - 255px);
  @media only screen and (max-width: 1280px) {
    margin-top: 92px;
    min-height: calc(100vh - 300px);
  } */
`;

const Layouts = (props) => {
  return (
    <div>
      <Header user={props.user} />
      <Main>{props.children}</Main>
      <Footer />
    </div>
  );
};

export default Layouts;
