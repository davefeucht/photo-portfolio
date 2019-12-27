/*****************
* CategoryHeader component implements the title bar of a Category
*****************/

import React from "react";
import { observer } from "mobx-react";
import StyledCategoryHeader from "../styledComponents/StyledCategoryHeader.jsx";
import CategoryTitle from "../styledComponents/CategoryTitle.jsx";
import './CategoryHeader.css';

const CategoryHeader = observer(( { props }) => {

  //Function to close the category when it is clicked
  const _closeCategory = () => {
    props.clickCategory(props.categoryId, props.categoryName);
  }

  return (
    <div>
      <CategoryTitle>{props.categoryName}</CategoryTitle>
      <CategorySubtitle onClick={_closeCategory.bind(this)}>Back to Categories</CategorySubtitle>
    </div>
  );
});

export default CategoryHeader;