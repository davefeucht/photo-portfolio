/*****************
* Posts component displays a list of Posts
*****************/

import React from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';
import Post from '../Post.jsx';
import PostThumbnail from '../PostThumbnail.jsx';
import './Posts.css';

const Posts = observer(( { props }) => {

  //Function to get all posts for a given category
  const _getPosts = () => {
    const getPostsURI = `https://${props.siteUrl}/wp-json/wp/v2/posts?categories=${this.props.postCategory}`;
    axios.get(getPostsURI)
      .then(res => {
        const posts = res.data;
        props.setCategoryPosts(posts);
      });
  }

  //Function to get data about the category in which these posts are found
  const _getPostsCategory = () => {
    const getPostsCategoryURI = `https://${props.siteUrl}/wp-json/wp/v2/categories/${props.postCategory}`; 
    axios.get(getPostsCategoryURI)
      .then(res => {
        const categoryData = res.data;
        props.setCategoryData(categoryData);
      });
  }
  
  //Function to show a single post when clicked
  const _showSinglePost = (postId) => {
    const showAllPosts = false;
    const name = "";
    props.setShowAllPosts(showAllPosts);
    props.setSinglePostToShow({postId, name});
  }

  //Function to show all posts in the category
  const _showAllPosts = (postId) => {
    const showAllPosts = true;
    const name = "";
    props.setShowAllPosts(showAllPosts);
    props.setSinglePostToShow({postId, name}); 
  }

  //Function to show all the categories - onClick of 'Back To Categories' text
  const _showAllCategories = () => {
    props.clickCategory();
  }

  //When the component is about to mount, get the posts for the category and get the category info
  _getPosts();
  _getPostsCategory();

  let postList = [];

  //If we are showing all posts, then map the list of posts to a list of PostThumbnail components
  if(this.props.showAllPosts) {
    postList = this.props.categoryPosts.map((post, index) =>
    { return ( <PostThumbnail key={post.id.toString()} id={post.id} index={index} image={post.featured_media} site={props.siteUrl} clickImage={_showSinglePost.bind(this)}/> ); }
    );
  }
    
  //Otherwise, display the single post which matches the 'singlePostToShow'
  else {
    props.categoryPosts.forEach(post => {
      if(post.id == props.singlePostToShow) {
        postList[0] = <Post key={props.singlePostToShow.toString()} id={props.singlePostToShow} category={props.postCategory} categoryName={props.categoryData.name} title={post.title.rendered} image={post.featured_media} context="full-image" site={props.siteUrl} clickImage={_showAllPosts.bind(this)} />;
      }
    });
  }
    
  return (
    <PostList>
      {postList} 
    </PostList>
  );
});

export default Posts;