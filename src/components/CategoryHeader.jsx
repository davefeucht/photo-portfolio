/*****************
* CategoryTitle component implements the title bar of a Category
*****************/

import React from "react";
import PropTypes from "prop-types";
import StyledCategoryHeader from "./styledComponents/StyledCategoryHeader.jsx";
import CategoryTitle from "./styledComponents/CategoryTitle.jsx";
import CategorySubtitle from "./styledComponents/CategorySubtitle.jsx";

export default class CategoryHeader extends React.Component {

  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    clickCategory: PropTypes.func
  };

  //Function to close the category when it is clicked
  _closeCategory() {
    this.props.clickCategory(this.props.id, this.props.name);
  }

  render () {
    return (
      <StyledCategoryHeader>
        <CategoryTitle>{this.props.name}</CategoryTitle>
        <CategorySubtitle onClick={this._closeCategory.bind(this)}>Back to Categories</CategorySubtitle>
      </StyledCategoryHeader>
    );
  }
}