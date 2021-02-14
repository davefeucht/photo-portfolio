/*****************
* CategoryHeader component implements the title bar of a Category
*****************/

import React from "react";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';
import './CategoryHeader.css';

const CategoryHeader = observer(({ stateStore }) => {
  return (
    <div className="category-header">
      <div className="title">{stateStore.currentCategoryData.name}</div>
      <div className="subtitle">
        <Link to="/">Back to Categories</Link>
      </div>
    </div>
  );
});

CategoryHeader.displayName = 'CategoryHeader';

export default CategoryHeader;