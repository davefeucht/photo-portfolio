/*****************
* Categories component displays a list of existing photo categories 
* and makes them clickable to display just a single category.
*****************/

import React from "react";
import axios from "axios";
import CategoryList from "./styledComponents/CategoryList.jsx";
import CategoryThumbnail from "./CategoryThumbnail.jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setCategoryList} from "../actions/actions.js";

class Categories extends React.Component {

  static propTypes = {
    siteUrl: PropTypes.string,
    categoryList: PropTypes.array
  };

  //Method to get all existing categories
  _getCategories() {
    const getCategoriesRequest = `https://${this.props.siteUrl}/wp-json/wp/v2/categories?exclude=175`;
    axios.get(getCategoriesRequest)
      .then(res => {
        const categories = res.data;
        this.props.setCategoryList(categories);
      })
      .catch(error => {
        const errorMsg = "Did not work: " + (error.response ? error.response : error);
      });
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
    categoryList = this.props.categoryList.map(category =>
    { 
      //Display the Category component, and pass along the showSpecificCategory function as a prop, so that we can call it from the Category component
      return ( <CategoryThumbnail key={category.id.toString()} id={category.id} name={category.name} clickCategory={this._showSpecificCategory.bind(this)} /> ); }
    );

    return (
      <CategoryList>
        {categoryList} 
      </CategoryList>
    );
  }
}

const mapStateToProps = state => {
  return {
    siteUrl: state.applicationState.siteUrl, 
    categoryList: state.applicationState.categoryList
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setCategoryList: bindActionCreators(setCategoryList, dispatch)
  }; 
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);