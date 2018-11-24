/****************
* Post component displays one individual Post
****************/

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import FullPost from "./styledComponents/FullPost.jsx";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setPostUrls} from "../actions/actions.js";

class Post extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.number,
    context: PropTypes.string,
    site: PropTypes.string,
    clickImage: PropTypes.func
  };

  _getPostImage() {
    const getPostImageURI = `https://${this.props.siteUrl}/wp-json/wp/v2/media/${this.props.image}`; 
    axios.get(getPostImageURI)
      .then(res => {
        let thumbnailImage = new Image();
        let fullImage = new Image();
        const thumbnailUrl = res.data.media_details.sizes.thumbnail.source_url;
        const fullImageUrl = res.data.media_details.sizes.full.source_url;
        this.props.setPostUrls({ thumbnail_image: thumbnailUrl, full_image: fullImageUrl });
        thumbnailImage.src = thumbnailUrl;
        fullImage.src = fullImageUrl;
      });
  } 

  _showAllPosts(event) {
    event.preventDefault();
    this.props.clickImage(this.props.id);
  }

  componentWillMount() {
    this._getPostImage();
  }

  render() {
    
    let divStyle = {backgroundImage: "url(" + this.props.fullImageUrl + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "contain"};
    let classList = "post";

    return(
      <FullPost className={classList} style={divStyle} onClick={this._showAllPosts.bind(this)}>
      </FullPost>
    );
  }  
}

const mapStateToProps = state => {
  return {
    thumbnailImageUrl: state.applicationState.singlePostToShow.thumbnail_image,
    fullImageUrl: state.applicationState.singlePostToShow.full_image,
    siteUrl: state.applicationState.siteUrl,
    showAllPosts: state.visibilityFilter.showAllPosts
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setPostUrls: bindActionCreators(setPostUrls, dispatch)
  }; 
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);