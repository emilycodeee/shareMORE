import Header from "./Header";
import styled from "styled-components";

const Main = styled.div`
  margin: 0 auto;
`;

const Layouts = (props) => {
  return (
    <>
      <Header user={props.user} />
      <Main>{props.children}</Main>
    </>
  );
};

export default Layouts;
