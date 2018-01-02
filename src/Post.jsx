import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thumbnail: "",
      fullImage: "",
      showFullImage: false,
      inList: true,
      errorMsg: ""
    };
  }

  _getPostImage() {
    axios.get(`http://` + this.props.site + `/wp-json/wp/v2/media/` + this.props.image + `/`)
    .then(res => {
      const thumbnail = res.data.media_details.sizes.medium.source_url;
      const fullImage = res.data.media_details.sizes.full.source_url;
      this.setState({ thumbnail });
      this.setState({ fullImage });
    }, error => {
      const errorMsg = 'Did not work: ' + (error.response ? error.response : error);
      this.setState({ errorMsg });
    });
  } 

  _toggleDisplay(event) {
    event.preventDefault();
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
      imgTag = <div className="post-image"><img src={this.state.thumbnail} /></div>;
    }
    else if(this.props.context == "category-image") {
      title = "";
      imgTag = <div className="post-image"><img src={this.state.thumbnail} /></div>;
    }
    else {
      title = <div className="post-title-single"><a href="#" onClick={this._toggleDisplay.bind(this)}>{this.props.title}</a></div>;
      imgTag = <div className="post-image"><img src={this.state.fullImage} /></div>;
    }

    return(
        <div className="post">
          {title}
          {imgTag}         
        </div>
    );

  }  

}

export default Post;
