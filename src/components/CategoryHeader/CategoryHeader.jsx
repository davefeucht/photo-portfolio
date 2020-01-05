/*****************
* CategoryHeader component implements the title bar of a Category
*****************/

import React from "react";
import { observer } from "mobx-react";
import './CategoryHeader.css';

const CategoryHeader = observer(({ categoryId, categoryName }) => {

  //Function to close the category when it is clicked
  const _closeCategory = () => {
    //props.clickCategory(props.categoryId, props.categoryName);
  }

  return (
    <div className="category-header">
      <div className="title">{categoryName}</div>
      <div className="subtitle" onClick={_closeCategory.bind(this)}>Back to Categories</div>
    </div>
  );
});

CategoryHeader.displayName = 'CategoryHeader';

export default CategoryHeader;