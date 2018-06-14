import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default class PostThumbnail extends React.Component {
  constructor(props) {
    super(props);

    this.propTypes = {
      id: PropTypes.number,
      image: PropTypes.number,
      site: PropTypes.string,
      clickImage: PropTypes.func
    };

    this.state = {
      thumbnailUrl: ""
    };
  }

  _getPostThumbnail() {
    axios.get("http://" + this.props.site + "/wp-json/wp/v2/media/" + this.props.image + "/")
      .then(res => {
        let thumbnailImage = new Image();
        const thumbnailUrl = res.data.media_details.sizes.thumbnail.source_url;
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
    let divStyle = {backgroundImage: "url(" + this.state.thumbnailUrl + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "auto 100%"};

    return(
      <div className="post-thumbnail" style={divStyle} onClick={this._showFullPost.bind(this)}>
      </div>
    );
  }
}