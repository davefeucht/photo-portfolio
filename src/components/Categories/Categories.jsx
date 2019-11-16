/*****************
* Categories component displays a list of existing photo categories 
* and makes them clickable to display just a single category.
*****************/

import React from "react";
import { observer } from "mobx-react";
import axios from "axios";
import CategoryThumbnail from "../CategoryThumbnail.jsx";
import './Categories.css';

const Categories = observer((props) => {

  //Method to get all existing categories
  const _getCategories = () => {
    const getCategoriesRequest = `https://${props.stateStore.siteUrl}/wp-json/wp/v2/categories?exclude=175`;
    axios.get(getCategoriesRequest)
      .then(res => {
        const categories = res.data;
        props.stateStore.setCategoryList(categories);
      })
      .catch(error => {
        const errorMsg = "Did not work: " + (error.response ? error.response : error);
      });
  }

  const _mapCategoryList = () => {
      return props.stateStore.categoryList.map((category, index) => { 
        //Display the Category component, and pass along the showSpecificCategory function as a prop, so that we can call it from the Category component
        return ( <CategoryThumbnail key={category.id.toString()} id={category.id} index={index} name={category.name} clickCategory={_showSpecificCategory.bind(this)} /> ); }
      );
  }

  const _showSpecificCategory = (categoryId, categoryName) => {
    props.showSingleCategory(categoryId, categoryName);
  }

  _getCategories();
  
  return (
    <div className="category-list">
      {_mapCategoryList()} 
    </div>
  );
});

Categories.displayName = 'Categories';

export default Categories;