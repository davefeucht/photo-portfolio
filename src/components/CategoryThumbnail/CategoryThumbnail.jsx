/*****************
* CategoryThumbnail component displays the post image for a particular category.
*****************/

import React from "react";
import axios from "axios";
import observer from 'mobx-react';
import './CategoryThumbnail.css';

const CategoryThumbnail = observer(( {props }) => {

  //Function to get a random post image URL for the category
  const _getCategoryImage = (categoryId) => {
    //Define the request string to get the posts for this category
    const getCategoryPostURI = `https://${props.siteUrl}/wp-json/wp/v2/posts?categories=${categoryId}`;
    //Make the request
    axios.get(getCategoryPostURI) 
      .then((response) => {
        //Determine a random post from the ones returned
        const numberOfPosts = response.data.length;
        const randomPost = Math.floor((Math.random() * (numberOfPosts + 1)));

        //If this post does exist in the returned results
        if(response.data[randomPost] !== undefined) {
          //Define the request string to get the featured media for the random post
          const getCategoryImage = `https://${props.siteUrl}/wp-json/wp/v2/media/${response.data[randomPost].featured_media}/`; 
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
              this.props.setCategoryThumbnail({category_index: props.index, image_url: fullImageUrl});
            })
        }
      })
  }

  //Function to open the category using the function passed in from the parent component
  const _openCategory = () => {
    this.props.clickCategory(props.id, props.name);
  }

  const _highlightCategory = () => {
    /*
    if(!this.state.categoryClasses.includes("hovered")) {
      const categoryClasses = this.state.categoryClasses.concat(["hovered"]);
      this.setState({categoryClasses});
    }
    */
  }

  const _unHighlightCategory = () => {
    /*
    if(this.state.categoryClasses.includes("hovered")) {
      const categoryClasses = this.state.categoryClasses.filter(element => element !== "hovered");
      this.setState({categoryClasses});
    }
    */
  }

  this._getCategoryImage(this.props.id);

  const divStyle = {backgroundImage: "url(" + (props.categoryList[props.index].thumbnail_image ? props.categoryList[props.index].thumbnail_image : "")+ ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "auto 100%"};

  return ( 
    <div style={divStyle} className="category-thumbnail" onClick={_openCategory.bind(this)} onMouseOver={_highlightCategory.bind(this)} onMouseOut={_unHighlightCategory.bind(this)}>
    </div>
  );
});

export default CategoryThumbnail;