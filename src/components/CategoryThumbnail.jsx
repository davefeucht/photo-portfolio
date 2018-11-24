/*****************
* CategoryThumbnail component displays the post image for a particular category.
*****************/

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import StyledCategoryThumbnail from "./styledComponents/StyledCategoryThumbnail.jsx";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setCategoryList, setCategoryThumbnail} from "../actions/actions.js";

class CategoryThumbnail extends React.Component {

  static propTypes = {
    id: PropTypes.number,
    index: PropTypes.number,
    name: PropTypes.string,
    siteUrl: PropTypes.string,
    clickCategory: PropTypes.func
  };

  //Function to get a random post image URL for the category
  _getCategoryImage(categoryId) {
    //Define the request string to get the posts for this category
    const getCategoryPostURI = `https://${this.props.siteUrl}/wp-json/wp/v2/posts?categories=${categoryId}`;
    //Make the request
    axios.get(getCategoryPostURI) 
      .then((response) => {
        //Determine a random post from the ones returned
        const numberOfPosts = response.data.length;
        const randomPost = Math.floor((Math.random() * (numberOfPosts + 1)));

        //If this post does exist in the returned results
        if(response.data[randomPost] !== undefined) {
          //Define the request string to get the featured media for the random post
          const getCategoryImage = `https://${this.props.siteUrl}/wp-json/wp/v2/media/${response.data[randomPost].featured_media}/`; 
          //Make the request
          axios.get(getCategoryImage)
            .then(response => {
              let fullImageUrl = "";

              //If the large size image exists, use it
              if(response.data.media_details.sizes.large) {
                fullImageUrl = response.data.media_details.sizes.large.source_url;
              }
              //Otherwise use the medium size version
              else {
                fullImageUrl = response.data.media_details.sizes.medium.source_url;
              }
              this.props.setCategoryThumbnail({category_index: this.props.index, image_url: fullImageUrl});
            })
        }
      })
  }

  //Function to open the category using the function passed in from the parent component
  _openCategory() {
    this.props.clickCategory(this.props.id, this.props.name);
  }

  _highlightCategory() {
    /*
    if(!this.state.categoryClasses.includes("hovered")) {
      const categoryClasses = this.state.categoryClasses.concat(["hovered"]);
      this.setState({categoryClasses});
    }
    */
  }

  _unHighlightCategory() {
    /*
    if(this.state.categoryClasses.includes("hovered")) {
      const categoryClasses = this.state.categoryClasses.filter(element => element !== "hovered");
      this.setState({categoryClasses});
    }
    */
  }

  //When the component is about to mount, get the random post for the category
  componentWillMount() {
    this._getCategoryImage(this.props.id);
  }

  render() {
    const divStyle = {backgroundImage: "url(" + (this.props.categoryList[this.props.index].thumbnail_image ? this.props.categoryList[this.props.index].thumbnail_image : "")+ ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "auto 100%"};

    return ( 
      <StyledCategoryThumbnail style={divStyle} className="category-thumbnail" /*{this.state.categoryClasses.join(" ")}*/ onClick={this._openCategory.bind(this)} onMouseOver={this._highlightCategory.bind(this)} onMouseOut={this._unHighlightCategory.bind(this)}>
      </StyledCategoryThumbnail>
    );
  }
}

const mapStateToProps = state => {
  return {
    siteUrl: state.applicationState.siteUrl,
    categoryList: state.applicationState.categoryList
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setCategoryThumbnail: bindActionCreators(setCategoryThumbnail, dispatch)
  }; 
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryThumbnail);