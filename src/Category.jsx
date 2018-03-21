/*****************
* Category component displays the posts for a particular category.
* Props:
*  id: PropTypes.number,
*  name: PropTypes.string,
*  site: PropTypes.string,
*  showAllPosts: PropTypes.bool,
*  clickCategory: PropTypes.func
*****************/

import React from "react";
import axios from "axios";
import Posts from "./Posts.jsx";
import Post from "./Post.jsx";
import PropTypes from "prop-types";

class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryPost: {},
      errorMsg: ""
    };
  }

  _getCategoryPost(categoryId) {
    let getCategoryPostURI = "http://" + this.props.site + "/wp-json/wp/v2/posts?categories=" + categoryId;
    axios.get(getCategoryPostURI)
      .then(res => {
        if(res.data[0] !== undefined) {
          const categoryPost = res.data[0];
          this.setState({categoryPost});
        }
      }, error => {
        const errorMsg = "Did not work: " + (error.response ? error.response : error);
        this.setState({ errorMsg });
      });
  }

  _openCategory() {
    this.setState({showAllPosts: !this.state.showAllPosts}); 
    this.props.clickCategory(this.props.id, this.props.name);
  }

  componentWillMount() {
    this._getCategoryPost(this.props.id);
  }

  render() {
    let postBody = "";
    let categoryTitle = <div className="category-title-clickable">{this.props.name}</div>;
    let categorySubtitle = "";
    if(!this.props.showAllPosts) {
      if(!(Object.keys(this.state.categoryPost).length === 0 && this.state.categoryPost.constructor === Object)) {
        postBody = <Post key={this.state.categoryPost.id.toString()} category={this.props.id} categoryName={this.props.name} title={this.state.categoryPost.title.rendered} id={this.state.categoryPost.id} image={this.state.categoryPost.featured_media} context="category-image" site={this.props.site} />;
      }
    }
    else {
      categoryTitle = <div className="category-title">{this.props.name}</div>;
      categorySubtitle = <div className="category-subtitle">Back to Categories</div>; 
      postBody = <Posts site={this.props.site} category={this.props.id} />;
    }
    return ( 
      <div className="category" onClick={this._openCategory.bind(this)}>
        <div>
          {categoryTitle}
          {categorySubtitle}
        </div>
        {postBody}
      </div>
    );
  }

}

Category.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  site: PropTypes.string,
  showAllPosts: PropTypes.bool,
  clickCategory: PropTypes.func
};

export default Category;
