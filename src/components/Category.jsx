/*****************
* Category component displays the posts for a particular category.
*****************/

import React from "react";
import Posts from "./Posts.jsx";
import CategoryHeader from "./CategoryHeader.jsx";
import StyledCategory from "./styledComponents/StyledCategory.jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setShowAllCategories} from "../actions/actions.js";

class Category extends React.Component {

  static propTypes = {
    categoryId: PropTypes.number,
    categoryName: PropTypes.string,
    siteUrl: PropTypes.string
  };

  render() {

    return ( 
      <StyledCategory>
        <CategoryHeader id={this.props.id} name={this.props.name} clickCategory={this.props.setShowAllCategories.bind(this)} />
        <Posts site={this.props.site} category={this.props.id} />
      </StyledCategory>
    );
  }
}

const mapStateToProps = state => {
  return {
    siteUrl: state.applicationState.siteUrl, 
    categoryId: state.visibilityFilter.singleCategoryToShow.id,
    categoryName: state.visibilityFilter.singleCategoryToShow.name
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setShowAllCategories: bindActionCreators(setShowAllCategories, dispatch),
  }; 
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);