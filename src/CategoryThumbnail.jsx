/*****************
* CategoryThumbnail component displays the post image for a particular category.
* Props:
*  id: PropTypes.number,
*  name: PropTypes.string,
*  site: PropTypes.string,
*  showAllPosts: PropTypes.bool,
*  clickCategory: PropTypes.func
*****************/

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default class CategoryThumbnail extends React.Component {
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
    const divStyle = {backgroundImage: "url(" + this.state.fullImageUrl + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "auto 100%"};

    return ( 
      <div style={divStyle} className={this.state.categoryClasses.join(" ")} onClick={this._openCategory.bind(this)} onMouseOver={this._highlightCategory.bind(this)} onMouseOut={this._unHighlightCategory.bind(this)}>
      </div>
    );
  }

}

CategoryThumbnail.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  site: PropTypes.string,
  showAllPosts: PropTypes.bool,
  clickCategory: PropTypes.func
};