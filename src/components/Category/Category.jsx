/*****************
* Category component displays the posts for a particular category.
*****************/

import React from "react";
import { observer } from 'mobx-react';
import Posts from "../Posts/Posts.jsx";
import CategoryHeader from "../CategoryHeader/CategoryHeader.jsx";
import './Category.css';

const Category = observer(( { stateStore, categoryId, categoryName, api }) => {

  api.getPosts(categoryId);
  api.getCategoryInfo(categoryId);

  return ( 
    <div className="category">
      <CategoryHeader stateStore={stateStore} categoryId={categoryId} categoryName={categoryName} />
      <Posts stateStore={stateStore} categoryId={categoryId} categoryName={categoryName} api={api} />
    </div>
  );
});

Category.displayName = 'Category';

export default Category;