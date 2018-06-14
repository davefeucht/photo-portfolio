/*****************
* Category component displays the posts for a particular category.
* Props:
*  id: PropTypes.number,
*  name: PropTypes.string,
*  site: PropTypes.string,
*  showAllPosts: PropTypes.bool,
*  clickCategory: PropTypes.func
*****************/

import React from "react";
import axios from "axios";
import Posts from "./Posts.jsx";
import Post from "./Post.jsx";
import PropTypes from "prop-types";

export default class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryClasses: ["category"],
      categoryPost: {},
      errorMsg: ""
    };
  }

  //Function to get the 'main' post for the category
  _getCategoryPost(categoryId) {
    let getCategoryPostURI = "http://" + this.props.site + "/wp-json/wp/v2/posts?categories=" + categoryId;
    axios.get(getCategoryPostURI)
      .then(res => {
        if(res.data[0] !== undefined) {
          const categoryPost = res.data[0];
          this.setState({categoryPost});
        }
      })
      .catch(error => {
        const errorMsg = "Could not get posts for this category: " + (error.response ? error.response : error);
        this.setState({ errorMsg });
      });
  }

  //Function to open a specific category when it is clicked
  _openCategory() {
    this.props.clickCategory(this.props.id, this.props.name);
  }

  _highlightCategory() {
    if(!this.state.categoryClasses.includes("hovered")) {
      const categoryClasses = this.state.categoryClasses.concat(["hovered"]);
      this.setState({categoryClasses});
    }
  }

  _unHighlightCategory() {
    if(this.state.categoryClasses.includes("hovered")) {
      const categoryClasses = this.state.categoryClasses.filter(element => element !== "hovered");
      this.setState({categoryClasses});
    }
  }

  //When the component is about to mount, get the main post for the category
  componentWillMount() {
    this._getCategoryPost(this.props.id);
  }

  render() {
    let postBody = "";

    //If we are displaying all posts, display the Posts component
    if(this.props.showAllPosts) {
      //categoryTitle = <div className="category-title">{this.props.name}</div>;
      postBody = <Posts site={this.props.site} category={this.props.id} />;
    }
    
    //Otherwise display the single post that was clicked
    else {
      //If posts could be retrieved, display the single post which was clicked
      if(!(Object.keys(this.state.categoryPost).length === 0 && this.state.categoryPost.constructor === Object)) {

        postBody = <Post key={this.state.categoryPost.id.toString()} category={this.props.id} categoryName={this.props.name} title={this.state.categoryPost.title.rendered} id={this.state.categoryPost.id} image={this.state.categoryPost.featured_media} context="category-image" site={this.props.site} clickImage={this._openCategory.bind(this)} />;
      }
    }
    return ( 
      <div className={this.state.categoryClasses.join(" ")} onClick={this._openCategory.bind(this)} onMouseOver={this._highlightCategory.bind(this)} onMouseOut={this._unHighlightCategory.bind(this)}>
        {postBody}
      </div>
    );
  }

}

Category.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  site: PropTypes.string,
  showAllPosts: PropTypes.bool,
  clickCategory: PropTypes.func
};