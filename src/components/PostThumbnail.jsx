/****************
* PostThumbnail component displays the thumbnail image for a Post
****************/

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import StyledPostThumbnail from "./styledComponents/StyledPostThumbnail.jsx";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setThumbnailImageUrl} from "../actions/actions.js";

class PostThumbnail extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    image: PropTypes.number,
    siteUrl: PropTypes.string,
    clickImage: PropTypes.func
  };

  _getPostThumbnail() {
    const getPostThumbnailURI = `https://${this.props.siteUrl}/wp-json/wp/v2/media/${this.props.image}`;
    axios.get(getPostThumbnailURI)
      .then(res => {
        let thumbnailImage = new Image();
        const thumbnailUrl = res.data.media_details.sizes.medium.source_url;
        this.props.setThumbnailImageUrl({post_index: this.props.index, image_url: thumbnailUrl});
        thumbnailImage.src = thumbnailUrl;
      });
  } 

  _showFullPost(event) {
    event.preventDefault();
    this.props.clickImage(this.props.id);
  }

  componentWillMount() {
    this._getPostThumbnail();
  }

  render() {
    const divStyle = {backgroundImage: "url(" + this.props.categoryPosts[this.props.index].thumbnail_image + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "cover"};

    return(
      <StyledPostThumbnail style={divStyle} onClick={this._showFullPost.bind(this)} />
    );
  }
}

const mapStateToProps = state => {
  return {
    categoryPosts: state.applicationState.currentCategoryPosts,
    siteUrl: state.applicationState.siteUrl
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setThumbnailImageUrl: bindActionCreators(setThumbnailImageUrl, dispatch)
  }; 
}

export default connect(mapStateToProps, mapDispatchToProps)(PostThumbnail);