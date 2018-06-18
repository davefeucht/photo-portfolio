import styled from "styled-components";

const PostList = styled.div`
  height: 100%;
  grid-area: category-content;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 1fr 1fr; 
  grid-gap: 5px;
`;

export default PostList;