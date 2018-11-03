/****************
* Post component displays one individual Post
****************/

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import FullPost from "./styledComponents/FullPost.jsx";

export default class Post extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.number,
    context: PropTypes.string,
    site: PropTypes.string,
    clickImage: PropTypes.func
  };

  state = {
    thumbnailUrl: "",
    fullImageUrl: "",
    showFullImage: false,
    inList: true,
    errorMsg: ""
  };

  _getPostImage(image_resource) {
    const getPostImageURI = `https://${this.props.site}/wp-json/wp/v2/media/${image_resource}`; 
    axios.get(getPostImageURI)
      .then(res => {
        let thumbnailImage = new Image();
        let fullImage = new Image();
        const thumbnailUrl = res.data.media_details.sizes.thumbnail.source_url;
        const fullImageUrl = res.data.media_details.sizes.full.source_url;
        this.setState({ thumbnailUrl });
        this.setState({ fullImageUrl });
        thumbnailImage.src = thumbnailUrl;
        fullImage.src = fullImageUrl;
      }, error => {
        const errorMsg = "Did not work: " + (error.response ? error.response : error);
        this.setState({ errorMsg });
      });
  } 

  _getNextPostImage() {

  }

  _getPreviousPostImage() {

  }

  _showAllPosts(event) {
    event.preventDefault();
    this.props.clickImage(this.props.id);
    this.setState({showFullImage: !this.state.showFullImage}); 
  }

  componentWillMount() {
    this._getPostImage(this.props.image);
  }

  render() {
    
    let divStyle = {backgroundImage: "url(" + this.state.fullImageUrl + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "contain"};
    let classList = "post";

    return(
      <FullPost className={classList} style={divStyle} onClick={this._showAllPosts.bind(this)}>
      </FullPost>
    );
  }  
}