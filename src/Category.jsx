import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Posts from './Posts.jsx';
import Post from './Post.jsx';

class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryPost: {},
      showAllPosts: false,
      errorMsg: ""
    }
  }

  _getCategoryPost(categoryId) {
    let getCategoryPostURI = 'http://' + this.props.site + '/wp-json/wp/v2/posts?categories=' + categoryId;
    axios.get(getCategoryPostURI)
    .then(res => {
      if(res.data[0] !== undefined) {
        const categoryPost = res.data[0];
        this.setState({categoryPost});
      }
    }, error => {
      const errorMsg = 'Did not work: ' + (error.response ? error.response : error);
      this.setState({ errorMsg });
    });
  }

  _openCategory(categoryId) {
    this.setState({showAllPosts: !this.state.showAllPosts}); 
  }

  componentWillMount() {
    this._getCategoryPost(this.props.id);
  }

  render() {
    let postBody = "";
    if(!this.state.showAllPosts) {
      if(!(Object.keys(this.state.categoryPost).length === 0 && this.state.categoryPost.constructor === Object)) {
        postBody = <Post key={this.state.categoryPost.id.toString()} category={this.props.id} categoryName={this.props.name} title={this.state.categoryPost.title.rendered} id={this.state.categoryPost.id} image={this.state.categoryPost.featured_media} context="category-image" site={this.props.site} />;
      }
      else {
      }
    }
    else {
      postBody = <Posts site={this.props.site} category={this.props.id} />;
    }
    return ( 
      <div className="category" onClick={this._openCategory.bind(this)}>
        <div className="category-title">
          {this.props.name}
        </div>
        {postBody}
      </div>
    );
  }

}

export default Category;
