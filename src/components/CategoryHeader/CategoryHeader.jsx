/*****************
* CategoryHeader component implements the title bar of a Category
*****************/

import React from "react";
import { observer } from "mobx-react";
import './CategoryHeader.css';

const CategoryHeader = observer(( { props }) => {

  //Function to close the category when it is clicked
  const _closeCategory = () => {
    props.clickCategory(props.categoryId, props.categoryName);
  }

  return (
    <div>
      <div className="title">{props.categoryName}</div>
      <div className="subtitle" onClick={_closeCategory.bind(this)}>Back to Categories</div>
    </div>
  );
});

export default CategoryHeader;