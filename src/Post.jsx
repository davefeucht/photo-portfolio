import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thumbnailUrl: "",
      fullImageUrl: "",
      showFullImage: false,
      inList: true,
      errorMsg: ""
    };
  }

  _getPostImage() {
    axios.get("http://" + this.props.site + "/wp-json/wp/v2/media/" + this.props.image + "/")
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

  _toggleDisplay(event) {
    event.preventDefault();
    this.props.clickImage(this.props.id);
    this.setState({showFullImage: !this.state.showFullImage}); 
  }

  componentWillMount() {
    this._getPostImage();
  }

  render() {
    
    let imgTag = "";
    let title = "";

    if(this.props.context == "thumbnail") {
      title = <div className="post-title-multiple"><a href="#" onClick={this._toggleDisplay.bind(this)}>{this.props.title}</a></div>;
      if(this.state.showFullImage) {
        imgTag = <div className="post-image"><img src={this.state.fullImageUrl} /></div>;
      }
      else {
        imgTag = <div className="post-image"><img src={this.state.thumbnailUrl} /></div>;
      }
    }
    else if(this.props.context == "category-image") {
      title = "";
      imgTag = <div className="post-image"><img src={this.state.thumbnailUrl} /></div>;
    }
    else {
      title = <div className="post-title-single"><a href="#" onClick={this._toggleDisplay.bind(this)}>{this.props.title}</a></div>;
      imgTag = <div className="post-image"><img src={this.state.fullImageUrl} /></div>;
    }

    return(
      <div className="post">
        {title}
        {imgTag}         
      </div>
    );

  }  

}

Post.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.number,
  context: PropTypes.string,
  site: PropTypes.string,
  clickImage: PropTypes.func
};

export default Post;
