/*****************
* CategoryThumbnail component displays the post image for a particular category.
*****************/

import React, { useEffect } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';
import './CategoryThumbnail.css';
import API from '../../utils/Api';

const CategoryThumbnail = observer(({ id, index, name, stateStore, api, clickCategory }) => {
  //Function to open the category using the function passed in from the parent component
  const _openCategory = () => {
    clickCategory(id, name);
  }

  if (!stateStore.categoryList[index].thumbnail_image) {
    api.getCategoryImage(id, index);
  }

  const divStyle = {backgroundImage: "url(" + (stateStore.categoryList[index].thumbnail_image ? stateStore.categoryList[index].thumbnail_image : "")+ ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "auto 100%"};

  return ( 
    <div style={divStyle} className="category-thumbnail" onClick={_openCategory.bind(this)}>
    </div>
  );
});

CategoryThumbnail.displayName = 'CategoryThumbnail';

export default CategoryThumbnail;