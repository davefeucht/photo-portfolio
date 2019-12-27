/****************
* PostThumbnail component displays the thumbnail image for a Post
****************/

import React from "react";
import axios from "axios";
import { observer } from 'mobx-react';
import './PostThumbnail.css';

const PostThumbnail = observer(({ props }) => {
  const _getPostThumbnail = () => {
    const getPostThumbnailURI = `https://${props.siteUrl}/wp-json/wp/v2/media/${props.image}`;
    axios.get(getPostThumbnailURI)
      .then(res => {
        let thumbnailImage = new Image();
        const thumbnailUrl = res.data.media_details.sizes.medium.source_url;
        this.props.setThumbnailImageUrl({post_index: props.index, image_url: thumbnailUrl});
        thumbnailImage.src = thumbnailUrl;
      });
  } 

  const _showFullPost = (event) => {
    event.preventDefault();
    props.clickImage(props.id);
  }

  _getPostThumbnail();

  const divStyle = {backgroundImage: "url(" + (props.categoryPosts[props.index].thumbnail_image ? props.categoryPosts[props.index].thumbnail_image : "") + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "cover"};

  return(
    <div className="post-thumbnail" style={divStyle} onClick={_showFullPost.bind(this)}></div>
  );
});

PostThumbnail.displayName = 'PostThumbnail';

export default PostThumbnail;