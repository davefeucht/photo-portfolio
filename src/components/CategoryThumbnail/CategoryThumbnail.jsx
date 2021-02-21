/*****************
* CategoryThumbnail component displays the post image for a particular category.
*****************/

import React from 'react';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { Link, useRouteMatch } from 'react-router-dom';
import './CategoryThumbnail.css';

const CategoryThumbnail = observer(({ id, index, name, stateStore, api }) => {
  let { url } = useRouteMatch();
  //Function to open the category using the function passed in from the parent component
  const _openCategory = () => {
    runInAction(() => {
      stateStore.setVisibleCategory(id, name);
      stateStore.setShowAllCategories(false);
    });
  }

  if (!stateStore.categoryList[index].thumbnail_image) {
    api.getCategoryImage(id, index);
  }

  const divStyle = {backgroundImage: "url(" + (stateStore.categoryList[index].thumbnail_image ? stateStore.categoryList[index].thumbnail_image : "")+ ")"};

  return ( 
    <Link to={`${url}category/${id}`}>
      <div style={divStyle} className="category-thumbnail" onClick={_openCategory.bind(this)}>
      </div>
    </Link>
  );
});

CategoryThumbnail.displayName = 'CategoryThumbnail';

export default CategoryThumbnail;