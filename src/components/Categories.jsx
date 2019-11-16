/*****************
* Categories component displays a list of existing photo categories 
* and makes them clickable to display just a single category.
*****************/

import React from "react";
import { observer } from "mobx-react";
import axios from "axios";
import CategoryList from "./styledComponents/CategoryList.jsx";
import CategoryThumbnail from "./CategoryThumbnail.jsx";

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

  const _showSpecificCategory = (categoryId, categoryName) => {
    props.showSingleCategory(categoryId, categoryName);
  }

  _getCategories();
  
  let categoryList = [];
  categoryList = props.stateStore.categoryList.map((category, index) =>
  { 
    //Display the Category component, and pass along the showSpecificCategory function as a prop, so that we can call it from the Category component
    return ( <CategoryThumbnail key={category.id.toString()} id={category.id} index={index} name={category.name} clickCategory={_showSpecificCategory.bind(this)} /> ); }
  );

  return (
    <CategoryList>
      {categoryList} 
    </CategoryList>
  );
});

Categories.displayName = 'Categories';

export default Categories;