/*****************
* Posts component displays a list of Posts
*****************/

import React from 'react';
import { observer } from 'mobx-react';
import Post from '../Post/Post.jsx';
import PostThumbnail from '../PostThumbnail/PostThumbnail.jsx';
import './Posts.css';

const Posts = observer(({ stateStore, categoryId, categoryName, api }) => {

  //If we are showing all posts, then map the list of posts to a list of PostThumbnail components
  const postList = stateStore.currentCategoryPosts.map((post, index) => { 
    return ( <PostThumbnail key={post.id.toString()} stateStore={stateStore} id={post.id} title={post.title.rendered} tags={post.tags} index={index} image={post.featured_media} api={api}/> ); 
  });
    
  return (
    <div className="posts">
        {stateStore.visibilityFlags.showModal && 
          <Post key={stateStore.visiblePost.postId.toString()} 
                stateStore={stateStore} 
                title={stateStore.visiblePost.postTitle} 
                tags={stateStore.visiblePost.tags}
          />
        }
        {postList} 
    </div>
  );
});

Posts.displayName = 'Posts';

export default Posts;