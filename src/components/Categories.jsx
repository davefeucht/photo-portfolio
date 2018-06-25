/*****************
* Categories component displays a list of existing photo categories 
* and makes them clickable to display just a single category.
*****************/

import React from "react";
import axios from "axios";
import CategoryList from "./styledComponents/CategoryList.jsx";
import CategoryThumbnail from "./CategoryThumbnail.jsx";
import PropTypes from "prop-types";

export default class Categories extends React.Component {

  static propTypes = {
    site: PropTypes.string,
    showSingleCategory: PropTypes.func
  };

  /* Add Default Props */

  //Set up state variables for list of categories, whether to show all categories, and if not, which
  //single category to show.
  //NOTE: Take list of categories out of state and store in a member variable.
  state = {
    categories: [],
    errorMsg: ""
  };

  _isMounted = false;

  //Method to get all existing categories
  _getCategories() {
    const getCategoriesRequest = `https://${this.props.site}/wp-json/wp/v2/categories?exclude=175`;
    if(this._isMounted) {
      axios.get(getCategoriesRequest)
        .then(res => {
          const categories = res.data;
          this.setState({ categories });
        })
        .catch(error => {
          const errorMsg = "Did not work: " + (error.response ? error.response : error);
          this.setState({ errorMsg });
        });
    }
  }

  _showSpecificCategory(categoryId, categoryName) {
    this.props.showSingleCategory(categoryId, categoryName);
  }

  //Just before the component is added to the DOM, get the list of categories.
  componentWillMount() {
    this._isMounted = true;
    this._getCategories();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  render() {
    let categoryList = [];

    categoryList = this.state.categories.map(category =>
    { 
      //Display the Category component, and pass along the showSpecificCategory function as a prop, so that we can call it from the Category component
      return ( <CategoryThumbnail key={category.id.toString()} id={category.id} name={category.name} site={this.props.site} clickCategory={this._showSpecificCategory.bind(this)} /> ); }
    );

    return (
      <CategoryList>
        {categoryList} 
      </CategoryList>
    );
  }
}