/*****************
* CategoryHeader component implements the title bar of a Category
*****************/

import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import StyledCategoryHeader from "./styledComponents/StyledCategoryHeader.jsx";
import CategoryTitle from "./styledComponents/CategoryTitle.jsx";
import CategorySubtitle from "./styledComponents/CategorySubtitle.jsx";

class CategoryHeader extends React.Component {

  static propTypes = {
    categoryId: PropTypes.number,
    categoryName: PropTypes.string,
    clickCategory: PropTypes.func
  };

  //Function to close the category when it is clicked
  _closeCategory() {
    this.props.clickCategory(this.props.categoryId, this.props.categoryName);
  }

  render () {
    return (
      <StyledCategoryHeader>
        <CategoryTitle>{this.props.categoryName}</CategoryTitle>
        <CategorySubtitle onClick={this._closeCategory.bind(this)}>Back to Categories</CategorySubtitle>
      </StyledCategoryHeader>
    );
  }
}

const mapStateToProps = state => {
  return {
    categoryId: state.visibilityFilter.singleCategoryToShow.categoryId,
    categoryName: state.visibilityFilter.singleCategoryToShow.categoryName
  };
}

const mapDispatchToProps = dispatch => {
  return {
  }; 
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryHeader);