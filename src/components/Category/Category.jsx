/*****************
* Category component displays the posts for a particular category.
*****************/

import React from "react";
import { observer } from 'mobx-react';
import Posts from "../Posts.jsx";
import CategoryHeader from "../CategoryHeader.jsx";
import StyledCategory from "../styledComponents/StyledCategory.jsx";
import './Category.css';

const Category = observer(( { props }) => {

  return ( 
    <StyledCategory>
      <CategoryHeader categoryId={props.categoryId} categoryName={props.categoryName} clickCategory={props.setShowAllCategories.bind(this)} />
      <Posts site={props.siteUrl} category={props.categoryId} />
    </StyledCategory>
  );
});

Category.displayName = 'Category';

export default Category;