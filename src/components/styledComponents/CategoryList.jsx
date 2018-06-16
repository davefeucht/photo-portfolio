import styled from "styled-components";

const CategoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(var(--number-of-columns), 1fr);
  height: 100%;
`;

export default CategoryList;