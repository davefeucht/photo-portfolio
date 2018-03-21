/*****************
* Posts component displays a list of Posts
* Props:
*  category: PropTypes.number,
*  site: PropTypes.string,
*  clickCategory: PropTypes.func
*****************/

import React from "react";
import axios from "axios";
import Post from "./Post.jsx";
import PropTypes from "prop-types";

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      showAllPosts: true,
      categoryData: {},
      singlePostToShow: 0,
      errorMsg: ""
    };
  }

  _getPosts() {
    axios.get("http://" + this.props.site + "/wp-json/wp/v2/posts?categories=" + this.props.category)
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      }, error => {
        const errorMsg = "Did not work: " + (error.response ? error.response : error);
        this.setState({ errorMsg });
      });
  }

  _getPostsCategory() {
    axios.get("http://" + this.props.site + "/wp-json/wp/v2/categories/" + this.props.category)
      .then(res => {
        const categoryData = res.data;
        this.setState({ categoryData });
      }, error => {
        const errorMsg = "Did not work: " + (error.response ? error.response : error);
        this.setState({ errorMsg });
      });
  }
  
  _showSinglePost(postId) {
    const showAllPosts = false;
    const singlePostToShow = postId;
    this.setState({ showAllPosts });
    this.setState({ singlePostToShow });
  }

  _showAllPosts(postId) {
    const showAllPosts = true;
    const singlePostToShow = postId;
    this.setState({ showAllPosts });
    this.setState({ singlePostToShow }); 
  }

  _showAllCategories() {
    this.props.clickCategory();
  }

  componentWillMount() {
    this._getPosts();
    this._getPostsCategory();
  }

  render() {
    let postList = [];
    let categoryTitle = <div className="category-title">{this.state.categoryData.name}</div>;
    let categorySubtitle = <div onClick={this._showAllCategories.bind(this)} className="category-subtitle">Back to Categories</div>;
    if(this.state.showAllPosts) {
      postList = this.state.posts.map(post =>
      { return ( <Post key={post.id.toString()} category={this.props.category} categoryName={this.state.categoryData.name} title={post.title.rendered} id={post.id} image={post.featured_media} context="thumbnail" site={this.props.site} clickImage={this._showSinglePost.bind(this)} /> ); }
      );
    }
    else {
      this.state.posts.forEach(post => {
        if(post.id == this.state.singlePostToShow) {
          postList[0] = <Post key={this.state.singlePostToShow.toString()} id={this.state.singlePostToShow} category={this.props.category} categoryName={this.state.categoryData.name} title={post.title.rendered} image={post.featured_media} context="full-image" site={this.props.site} clickImage={this._showAllPosts.bind(this)} />;
        }
      });
    }
    
    return (
      <div className="posts"> 
        <div>
          {categoryTitle}
          {categorySubtitle}
        </div>
        <div className="post-list">
          {postList} 
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  category: PropTypes.number,
  site: PropTypes.string,
  clickCategory: PropTypes.func
};

export default Posts;
