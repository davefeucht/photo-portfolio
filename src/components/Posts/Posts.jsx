/*****************
* Posts component displays a list of Posts
*****************/

import React from 'react';
import { observer } from 'mobx-react';
import Post from '../Post/Post.jsx';
import PostThumbnail from '../PostThumbnail/PostThumbnail.jsx';
import './Posts.css';

const Posts = observer(({ stateStore, categoryId, categoryName, api }) => {
  let postList = [];

  //If we are showing all posts, then map the list of posts to a list of PostThumbnail components
  if(stateStore.visibilityFlags.showAllPosts) {
    postList = stateStore.currentCategoryPosts.map((post, index) => { 
      return ( <PostThumbnail key={post.id.toString()} stateStore={stateStore} id={post.id} title={post.title.rendered} index={index} image={post.featured_media} api={api}/> ); 
    });
  }
    
  //Otherwise, display the single post which matches the 'singlePostToShow'
  else {
    stateStore.currentCategoryPosts.forEach(post => {
      if(post.id == stateStore.visiblePost.postId) {
        api.getPostImage(post.featured_media);
        postList[0] = <Post key={stateStore.visiblePost.postId.toString()} stateStore={stateStore} id={stateStore.visiblePost.postId} category={categoryId} categoryName={categoryName} title={post.title.rendered} image={post.featured_media} api={api} context="full-image"/>;
      }
    });
  }
    
  return (
    <div className="posts">
        {postList} 
    </div>
  );
});

Posts.displayName = 'Posts';

export default Posts;