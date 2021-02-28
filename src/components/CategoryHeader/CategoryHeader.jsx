/*****************
* CategoryHeader component implements the title bar of a Category
*****************/

import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import './CategoryHeader.css';

//TODO: figure out why name is not updated properly
const CategoryHeader = ({ categoryData }) => {
  return (
    <div className="category-header">
      <div className="title">{categoryData.name}</div>
      <div className="subtitle">
        <Link to="/">Back to Categories</Link>
      </div>
    </div>
  );
};

CategoryHeader.displayName = 'CategoryHeader';

export default observer(CategoryHeader);