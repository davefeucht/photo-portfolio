import styled from "styled-components";

const App = styled.div`
  height: 100vh;
  display: grid;
  grid-template-areas: "header" "content" "footer";
  grid-template-rows: 3rem auto 2rem;
`;

export default App;