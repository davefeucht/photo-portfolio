/*****************
* Category component displays the posts for a particular category.
* Props:
*  id: PropTypes.number,
*  name: PropTypes.string,
*  site: PropTypes.string,
*  clickCategory: PropTypes.func
*****************/

import React from "react";
import axios from "axios";
import Posts from "./Posts.jsx";
import CategoryHeader from "./CategoryHeader.jsx";
import StyledCategory from "./styledComponents/StyledCategory.jsx";
import PropTypes from "prop-types";

export default class Category extends React.Component {

  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    site: PropTypes.string,
    clickCategory: PropTypes.func
  };

  state = {
    categoryPost: {},
    errorMsg: ""
  };

  //Function to get the 'main' post for the category
  _getCategoryPost(categoryId) {
    let getCategoryPostURI = "http://" + this.props.site + "/wp-json/wp/v2/posts?categories=" + categoryId;
    axios.get(getCategoryPostURI)
      .then(res => {
        if(res.data[0] !== undefined) {
          const categoryPost = res.data[0];
          this.setState({categoryPost});
        }
      })
      .catch(error => {
        const errorMsg = "Could not get posts for this category: " + (error.response ? error.response : error);
        this.setState({ errorMsg });
      });
  }

  //When the component is about to mount, get the main post for the category
  componentWillMount() {
    this._getCategoryPost(this.props.id);
  }

  render() {
    return ( 
      <StyledCategory>
        <CategoryHeader id={this.props.id} name={this.props.name} clickCategory={this.props.clickCategory.bind(this)} />
        <Posts site={this.props.site} category={this.props.id} />
      </StyledCategory>
    );
  }
}