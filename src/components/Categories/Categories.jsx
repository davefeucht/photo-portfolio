/*****************
* Categories component displays a list of existing photo categories 
* and makes them clickable to display just a single category.
*****************/

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import CategoryThumbnail from '../CategoryThumbnail/CategoryThumbnail.jsx';
import './Categories.css';

const Categories = ({ stateStore, api }) => {
  const setRows = () => {
    const numberOfColumns = document.body.style.getPropertyValue('--number-of-columns');
    const numberOfCategories = stateStore.categoryList.length;
    document.body.style.setProperty('--number-of-rows', numberOfCategories / numberOfColumns);
  };

  useEffect(() => {
    setRows();
    const disposer = reaction(
      () => [stateStore.screenInfo.width, stateStore.screenInfo.height],
      () => setRows()
    );
    return () => {
      disposer();
    }
  });

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
};

Categories.propTypes = {
  stateStore: PropTypes.object.isRequired,
  api: PropTypes.object.isRequired
};

Categories.displayName = 'Categories';

export default observer(Categories);