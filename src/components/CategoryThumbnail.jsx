/*****************
* CategoryThumbnail component displays the post image for a particular category.
* Props:
*  id: PropTypes.number,
*  name: PropTypes.string,
*  site: PropTypes.string,
*  clickCategory: PropTypes.func
*****************/

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import StyledCategoryThumbnail from "./styledComponents/StyledCategoryThumbnail.jsx";

export default class CategoryThumbnail extends React.Component {

  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    site: PropTypes.string,
    clickCategory: PropTypes.func
  };

  state = {
    categoryClasses: ["category-thumbnail"],
    categoryImage: 0,
    fullImageUrl: "",
    errorMsg: ""
  };

  //Function to get the 'main' post image URL for the category
  _getCategoryImage(categoryId) {
    const getCategoryPostURI = `http://${this.props.site}/wp-json/wp/v2/posts?categories=${categoryId}`;
    axios.get(getCategoryPostURI) 
      .then((response) => {
        if(response.data[0] !== undefined) {
          const getCategoryImage = `http://${this.props.site}/wp-json/wp/v2/media/${response.data[0].featured_media}/`; 
          axios.get(getCategoryImage)
            .then(response => {
              const fullImageUrl = response.data.media_details.sizes.large.source_url;
              this.setState({fullImageUrl});
            })
            .catch(error => {
              const errorMsg = "Could not get image for this category: " + (error.response ? error.response : error);
              this.setState({ errorMsg });
            })
        }
      })
      .catch(error => {
        const errorMsg = "Could not get featured post for this category: " + (error.response ? error.response : error);
        this.setState({ errorMsg });
      })
  }

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
    this._getCategoryImage(this.props.id);
  }

  render() {
    const divStyle = {backgroundImage: "url(" + this.state.fullImageUrl + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "auto 100%"};

    return ( 
      <StyledCategoryThumbnail style={divStyle} className={this.state.categoryClasses.join(" ")} onClick={this._openCategory.bind(this)} onMouseOver={this._highlightCategory.bind(this)} onMouseOut={this._unHighlightCategory.bind(this)}>
      </StyledCategoryThumbnail>
    );
  }
}