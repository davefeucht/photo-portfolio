/****************
* Post component displays one individual Post
****************/

import React from "react";
import axios from "axios";
import { observer } from 'mobx-react';
import './Post.css';

const Post = observer(({ props }) => {
  const _getPostImage = () => {
    const getPostImageURI = `https://${props.siteUrl}/wp-json/wp/v2/media/${this.props.image}`; 
    axios.get(getPostImageURI)
      .then(res => {
        let thumbnailImage = new Image();
        let fullImage = new Image();
        const thumbnailUrl = res.data.media_details.sizes.thumbnail.source_url;
        const fullImageUrl = res.data.media_details.sizes.full.source_url;
        props.setFullImageUrl(fullImageUrl);
        thumbnailImage.src = thumbnailUrl;
        fullImage.src = fullImageUrl;
      });
  } 

  const _showAllPosts = (event) => {
    event.preventDefault();
    props.clickImage(this.props.id);
  }
    
 _getPostImage();

  let divStyle = {backgroundImage: "url(" + props.fullImageUrl + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "contain"};
  let classList = "post";

  return(
    <div className={classList} style={divStyle} onClick={_showAllPosts.bind(this)}>
    </div>
  );
});

Post.displayName = 'Post';

export default Post;