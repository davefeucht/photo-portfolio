import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import StyledPostThumbnail from "./styledComponents/StyledPostThumbnail.jsx";

export default class PostThumbnail extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    image: PropTypes.number,
    site: PropTypes.string,
    clickImage: PropTypes.func
  };

  state = {
    thumbnailUrl: ""
  };

  _getPostThumbnail() {
    axios.get("http://" + this.props.site + "/wp-json/wp/v2/media/" + this.props.image + "/")
      .then(res => {
        let thumbnailImage = new Image();
        const thumbnailUrl = res.data.media_details.sizes.medium.source_url;
        this.setState({ thumbnailUrl });
        thumbnailImage.src = thumbnailUrl;
      }, error => {
        const errorMsg = "Did not work: " + (error.response ? error.response : error);
        this.setState({ errorMsg });
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
    const divStyle = {backgroundImage: "url(" + this.state.thumbnailUrl + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "cover"};

    return(
      <StyledPostThumbnail style={divStyle} onClick={this._showFullPost.bind(this)} />
    );
  }
}