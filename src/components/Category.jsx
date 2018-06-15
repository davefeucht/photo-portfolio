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
import Post from "./Post.jsx";
import PropTypes from "prop-types";

export default class Category extends React.Component {

  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    site: PropTypes.string,
    clickCategory: PropTypes.func
  };

  state = {
    categoryClasses: ["category"],
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

  //Function to open a specific category when it is clicked
  _closeCategory() {
    this.props.clickCategory(this.props.id, this.props.name);
  }

  //When the component is about to mount, get the main post for the category
  componentWillMount() {
    this._getCategoryPost(this.props.id);
  }

  render() {
    let categoryTitle = <div className="category-title">{this.props.name}</div>;
    let categorySubtitle = <div onClick={this._closeCategory.bind(this)} className="category-subtitle">Back to Categories</div>;
    return ( 
      <div className={this.state.categoryClasses.join(" ")} >
        <div>
          {categoryTitle}
          {categorySubtitle}
        </div>
        <Posts site={this.props.site} category={this.props.id} />
      </div>
    );
  }
}