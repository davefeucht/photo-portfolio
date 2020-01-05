/*****************
* Posts component displays a list of Posts
*****************/

import React from 'react';
import { observer } from 'mobx-react';
import Post from '../Post/Post.jsx';
import PostThumbnail from '../PostThumbnail/PostThumbnail.jsx';
import './Posts.css';

const Posts = observer(({ stateStore, categoryId, categoryName, api }) => {

  //Function to show a single post when clicked
  const _showSinglePost = (postId) => {
    const showAllPosts = false;
    const name = "";
    //props.setShowAllPosts(showAllPosts);
    //props.setSinglePostToShow({postId, name});
  }

  //Function to show all posts in the category
  const _showAllPosts = (postId) => {
    const showAllPosts = true;
    const name = "";
    //props.setShowAllPosts(showAllPosts);
    //props.setSinglePostToShow({postId, name}); 
  }

  //Function to show all the categories - onClick of 'Back To Categories' text
  const _showAllCategories = () => {
    //props.clickCategory();
  }

  //When the component is about to mount, get the posts for the category and get the category info
  api.getPosts(categoryId);
  api.getCategoryInfo(categoryId);

  let postList = [];

  //If we are showing all posts, then map the list of posts to a list of PostThumbnail components
  if(stateStore.visibilityFlags.showAllPosts) {
    postList = stateStore.currentCategoryPosts.map((post, index) => { 
      return ( <PostThumbnail key={post.id.toString()} id={post.id} index={index} image={post.featured_media} clickImage={_showSinglePost.bind(this)}/> ); 
    });
  }
    
  //Otherwise, display the single post which matches the 'singlePostToShow'
  else {
    stateStore.currentCategoryPosts.forEach(post => {
      if(post.id == stateStore.visiblePost.postId) {
        postList[0] = <Post key={stateStore.visiblePost.postId.toString()} id={stateStore.visiblePost.postId} category={categoryId} categoryName={categoryName} title={post.title.rendered} image={post.featured_media} context="full-image" clickImage={_showAllPosts.bind(this)} />;
      }
    });
  }
    
  return (
    <div className="posts">
      <div>
        {postList} 
      </div>
    </div>
  );
});

Posts.displayName = 'Posts';

export default Posts;