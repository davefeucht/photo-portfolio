/*****************
* Categories component displays a list of existing photo categories 
* and makes them clickable to display just a single category.
* Props:
*  site: PropTypes.string
*****************/

import React from "react";
import axios from "axios";
import Category from "./Category.jsx";
import CategoryThumbnail from "./CategoryThumbnail.jsx";
import PropTypes from "prop-types";

export default class Categories extends React.Component {

  static propTypes = {
    site: PropTypes.string
  };

  /* Add Default Props */

  //Set up state variables for list of categories, whether to show all categories, and if not, which
  //single category to show.
  //NOTE: Take list of categories out of state and store in a member variable.
  state = {
    categories: [],
    showAllCategories: true,
    singleCategoryToShow: {id: 0, name: ""},
    errorMsg: ""
  };

  //Method to get all existing categories
  _getCategories() {
    axios.get("http://" + this.props.site + "/wp-json/wp/v2/categories?exclude=175")
      .then(res => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch(error => {
        const errorMsg = "Did not work: " + (error.response ? error.response : error);
        this.setState({ errorMsg });
      });
  }

  //Method to display a single category when one is clicked on.
  _showSpecificCategory(categoryId, categoryName) {
    this.setState({showAllCategories: false}); 
    this.setState({singleCategoryToShow: {id: categoryId, name: categoryName}}); 
  }
  
  //Method to display all existing categories.
  _showAllCategories() {
    this.setState({showAllCategories: true});
  }

  //Just before the component is added to the DOM, get the list of categories.
  componentWillMount() {
    this._getCategories();
  }
  
  render() {
    let categoryList = [];
    //If we are showing all the categories
    if(this.state.showAllCategories) {
      //Set the CSS variable number of columns to show
      document.documentElement.style.setProperty("--number-of-columns", this.state.categories.length);      

      //Then we take the category list and map it into a list of Category components to be displayed
      categoryList = this.state.categories.map(category =>
      { 
        //Display the Category component, and pass along the showSpecificCategory function as a prop, so that we can call it from the Category component
        return ( <CategoryThumbnail key={category.id.toString()} id={category.id} name={category.name} site={this.props.site} clickCategory={this._showSpecificCategory.bind(this)} /> ); }
      );
    }
    //Otherwise, we display a Posts component which displays the list of posts for a particular category
    else {
      //Display the Posts component and pass along the showAllCategories function as a prop, so that we can call it from the Posts component
      categoryList = <Category key={this.state.singleCategoryToShow.id.toString()} id={this.state.singleCategoryToShow.id} name={this.state.singleCategoryToShow.name} site={this.props.site} clickCategory={this._showAllCategories.bind(this)} />; 
    }
    return (
      <div className="category-list">
        {categoryList} 
      </div>
    );
  }
}