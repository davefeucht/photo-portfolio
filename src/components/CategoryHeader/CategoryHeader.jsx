/*****************
* CategoryHeader component implements the title bar of a Category
*****************/

import React from "react";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import './CategoryHeader.css';

const CategoryHeader = observer(({ stateStore, categoryId, categoryName }) => {

  //Function to close the category when it is clicked
  const _closeCategory = () => {
    runInAction(() => {
      stateStore.setShowAllCategories(true); 
    });
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