/*****************
* Category component displays the posts for a particular category.
*****************/

import React from "react";
import { observer } from 'mobx-react';
import Posts from "../Posts/Posts.jsx";
import CategoryHeader from "../CategoryHeader/CategoryHeader.jsx";
import './Category.css';

const Category = observer(( { props }) => {

  return ( 
    <div>
      <CategoryHeader categoryId={props.categoryId} categoryName={props.categoryName} clickCategory={props.setShowAllCategories.bind(this)} />
      <Posts site={props.siteUrl} category={props.categoryId} />
    </div>
  );
});

Category.displayName = 'Category';

export default Category;