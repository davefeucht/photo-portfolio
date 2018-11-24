/*****************
* Posts component displays a list of Posts
*****************/

import React from "react";
import axios from "axios";
import Post from "./Post.jsx";
import PostThumbnail from "./PostThumbnail.jsx";
import PostList from "./styledComponents/PostList.jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setCategoryPosts, setCategoryData, setShowAllPosts, setSinglePostToShow} from "../actions/actions.js";

class Posts extends React.Component {
  static propTypes = {
    postCategory: PropTypes.number,
    siteUrl: PropTypes.string,
    categoryData: PropTypes.object,
    categoryPosts: PropTypes.array,
    showAllPosts: PropTypes.bool,
    singlePostToShow: PropTypes.number
  };

  //Function to get all posts for a given category
  _getPosts() {
    const getPostsURI = `https://${this.props.siteUrl}/wp-json/wp/v2/posts?categories=${this.props.postCategory}`;
    axios.get(getPostsURI)
      .then(res => {
        const posts = res.data;
        this.props.setCategoryPosts(posts);
      });
  }

  //Function to get data about the category in which these posts are found
  _getPostsCategory() {
    const getPostsCategoryURI = `https://${this.props.siteUrl}/wp-json/wp/v2/categories/${this.props.postCategory}`; 
    axios.get(getPostsCategoryURI)
      .then(res => {
        const categoryData = res.data;
        this.props.setCategoryData(categoryData);
      });
  }
  
  //Function to show a single post when clicked
  _showSinglePost(postId) {
    const showAllPosts = false;
    const name = "";
    this.props.setShowAllPosts(showAllPosts);
    this.props.setSinglePostToShow({postId, name});
  }

  //Function to show all posts in the category
  _showAllPosts(postId) {
    const showAllPosts = true;
    const name = "";
    this.props.setShowAllPosts(showAllPosts);
    this.props.setSinglePostToShow({postId, name}); 
  }

  //Function to show all the categories - onClick of 'Back To Categories' text
  _showAllCategories() {
    this.props.clickCategory();
  }

  //When the component is about to mount, get the posts for the category and get the category info
  componentWillMount() {
    this._getPosts();
    this._getPostsCategory();
  }

  render() {
    let postList = [];

    //If we are showing all posts, then map the list of posts to a list of PostThumbnail components
    if(this.props.showAllPosts) {
      postList = this.props.categoryPosts.map(post =>
      { return ( <PostThumbnail key={post.id.toString()} id={post.id} image={post.featured_media} site={this.props.siteUrl} clickImage={this._showSinglePost.bind(this)}/> ); }
      );
    }
    
    //Otherwise, display the single post which matches the 'singlePostToShow'
    else {
      this.props.categoryPosts.forEach(post => {
        if(post.id == this.props.singlePostToShow) {
          postList[0] = <Post key={this.props.singlePostToShow.toString()} id={this.props.singlePostToShow} category={this.props.postCategory} categoryName={this.props.categoryData.name} title={post.title.rendered} image={post.featured_media} context="full-image" site={this.props.siteUrl} clickImage={this._showAllPosts.bind(this)} />;
        }
      });
    }
    
    return (
      <PostList>
        {postList} 
      </PostList>
    );
  }
}

const mapStateToProps = state => {
  return {
    postCategory: state.visibilityFilter.singleCategoryToShow.categoryId, 
    siteUrl: state.applicationState.siteUrl,
    categoryData: state.applicationState.currentCategoryData,
    categoryPosts: state.applicationState.currentCategoryPosts,
    showAllPosts: state.visibilityFilter.showAllPosts,
    singlePostToShow: state.visibilityFilter.singlePostToShow.postId
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setCategoryPosts: bindActionCreators(setCategoryPosts, dispatch),
    setCategoryData: bindActionCreators(setCategoryData, dispatch),
    setShowAllPosts: bindActionCreators(setShowAllPosts, dispatch),
    setSinglePostToShow: bindActionCreators(setSinglePostToShow, dispatch)
  }; 
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);