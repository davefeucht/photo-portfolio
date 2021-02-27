/*****************
* CategoryThumbnail component displays the post image for a particular category.
*****************/

import React from 'react';
import { observer } from 'mobx-react';
import { Link, useRouteMatch } from 'react-router-dom';
import CategoryTitle from '../CategoryTitle/CategoryTitle.jsx';
import './CategoryThumbnail.css';

const CategoryThumbnail = observer(({ id, index, name, stateStore, api }) => {
  let { url } = useRouteMatch();

  if (!stateStore.categoryList[index].thumbnail_image) {
    api.getCategoryImage(id, index);
  }

  const divStyle = {backgroundImage: "url(" + (stateStore.categoryList[index].thumbnail_image ? stateStore.categoryList[index].thumbnail_image : "")+ ")"};

  return ( 
    <Link to={`${url}category/${id}`}>
      <div style={divStyle} className="category-thumbnail">
        <CategoryTitle name={name} />
      </div>
    </Link>
  );
});

CategoryThumbnail.displayName = 'CategoryThumbnail';

export default CategoryThumbnail;