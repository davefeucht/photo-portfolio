/*****************
* Categories component displays a list of existing photo categories 
* and makes them clickable to display just a single category.
*****************/

import React from 'react';
import { observer } from "mobx-react";
import CategoryThumbnail from "../CategoryThumbnail/CategoryThumbnail.jsx";
import './Categories.css';

const Categories = observer(({ stateStore, api }) => {

  const _mapCategoryList = () => {
      return stateStore.categoryList.map((category, index) => { 
        //Display the Category component, and pass along the showSpecificCategory function as a prop, so that we can call it from the Category component
        return ( <CategoryThumbnail key={category.id.toString()} id={category.id} index={index} name={category.name} stateStore={stateStore} api={api} /> ); }
      );
  }
  
  return (
    <div className="category-list">
      {_mapCategoryList()} 
    </div>
  );
});

Categories.displayName = 'Categories';

export default Categories;