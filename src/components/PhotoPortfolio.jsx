/*******************
* Top level PhotoPortfolio component. Sets up the base site URL and 
* loads the title bar and list of categories.
*******************/

import React from "react";
import axios from "axios";
import App from "./styledComponents/App.jsx";
import TitleBar from "./TitleBar.jsx";
import MainContent from "./styledComponents/MainContent.jsx";
import Categories from "./Categories.jsx";
import Category from "./Category.jsx";
import Footer from "./Footer.jsx";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setShowAllCategories, setSiteName, setSingleCategoryToShow} from "../actions/actions.js";

class PhotoPortfolio extends React.Component {

  _getSiteInformation() {
    const getSiteInformationURI = `https://${this.props.siteUrl}/wp-json/`;

    axios.get(getSiteInformationURI)
      .then(response => {
        const siteName = response.data.name;
        this.props.setSiteName(siteName);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  //Method to display a single category when one is clicked on.
  _showSpecificCategory(categoryId, categoryName) {
    this.props.setShowAllCategories(false);
    this.props.setSingleCategoryToShow({categoryId, categoryName})
  }
  
  //Method to display all existing categories.
  _showAllCategories() {
    this.props.setShowAllCategories(true);
  }

  componentWillMount() {
    this._getSiteInformation();
  }

  render () {
    let contentToDisplay = <Categories showSingleCategory={this._showSpecificCategory.bind(this)} />

    if(!this.props.showAllCategories) {
      contentToDisplay = <Category 
        key={this.props.singleCategoryToShow.categoryId.toString()} 
        categoryId={this.props.singleCategoryToShow.categoryId} 
        name={this.props.singleCategoryToShow.categoryName} 
        site={this.props.siteUrl} 
      />; 
    }

    return (

      <App>
        <TitleBar siteName={this.props.siteName} />
        <MainContent>
          {contentToDisplay}
        </MainContent>
        <Footer />
      </App>
    );
  }
}

const mapStateToProps = state => {
  return {
    siteUrl: state.applicationState.siteUrl, 
    siteName: state.applicationState.siteName, 
    showAllCategories: state.visibilityFilter.showAllCategories, 
    singleCategoryToShow: state.visibilityFilter.singleCategoryToShow
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setShowAllCategories: bindActionCreators(setShowAllCategories, dispatch),
    setSiteName: bindActionCreators(setSiteName, dispatch),
    setSingleCategoryToShow: bindActionCreators(setSingleCategoryToShow, dispatch)
  }; 
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPortfolio);