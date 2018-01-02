import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Post from './Post.jsx';

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      showAllPosts: true,
      categoryData: {},
      singlePostToShow: 0,
      errorMsg: ""
    }
  }

  _getPosts() {
    axios.get(`http://` + this.props.site + `/wp-json/wp/v2/posts?categories=` + this.props.category)
    .then(res => {
      const posts = res.data;
      this.setState({ posts });
    }, error => {
      const errorMsg = 'Did not work: ' + (error.response ? error.response : error);
      this.setState({ errorMsg });
    });
  }

  _getPostsCategory() {
    axios.get(`http://` + this.props.site + `/wp-json/wp/v2/categories/` + this.props.category)
    .then(res => {
      const categoryData = res.data;
      this.setState({ categoryData });
    }, error => {
      const errorMsg = 'Did not work: ' + (error.response ? error.response : error);
      this.setState({ errorMsg });
    });
  }
  
  _showAllPosts() {
    const showAllPosts = true;
    const singlePostToShow = 0;
    this.setState({ showAllPosts });
    this.setState({ singlePostToShow }); 
  }

  componentWillMount() {
    this._getPosts();
    this._getPostsCategory();
  }

  render() {
    let postList = [];
    let categoryHeader = "";
    if(this.state.showAllPosts) {
      postList = this.state.posts.map(post =>
        { return ( <Post key={post.id.toString()} category={this.props.category} categoryName={this.state.categoryData.name} title={post.title.rendered} id={post.id} image={post.featured_media} context="thumbnail" site={this.props.site} /> ); }
      );
      categoryHeader = <h2 className="category-title">{this.state.categoryData.name}</h2>;
    }
    else {
      this.state.posts.forEach(post => {
        if(post.id == this.state.singlePostToShow) {
          postList[0] = <Post key={this.state.singlePostToShow.toString()} id={this.state.singlePostToShow} category={this.props.category} categoryName={this.state.categoryData.name} title={post.title.rendered} image={post.featured_media} context="full-image" site={this.props.site} />;
        }
      });
    }
    
    return (
      <div>
        {postList} 
        <div>{this.state.errorMsg}</div>
      </div>
    );
  }
}

export default Posts;
