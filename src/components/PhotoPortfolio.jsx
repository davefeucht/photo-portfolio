/*******************
* Top level PhotoPortfolio component. Sets up the base site URL and 
* loads the title bar and list of categories.
*******************/

import React from "react";
import App from "./styledComponents/App.jsx";
import TitleBar from "./TitleBar.jsx";
import MainContent from "./styledComponents/MainContent.jsx";
import Categories from "./Categories.jsx";
import Category from "./Category.jsx";
import Footer from "./Footer.jsx";

export default class PhotoPortfolio extends React.Component {

  static site_url = "throughapinhole.com";

  state = {
    showAllCategories: true,
    singleCategoryToShow: {id: 0, name: ""},
  }

  //Method to display a single category when one is clicked on.
  _showSpecificCategory(categoryId, categoryName) {
    this.setState({showAllCategories: false}); 
    this.setState({singleCategoryToShow: {id: categoryId, name: categoryName}}); 
  }
  
  //Method to display all existing categories.
  _showAllCategories() {
    this.setState({showAllCategories: true});
  }

  render () {
    let contentToDisplay = <Categories site={PhotoPortfolio.site_url} showSingleCategory={this._showSpecificCategory.bind(this)} />

    if(!this.state.showAllCategories) {
      contentToDisplay = <Category key={this.state.singleCategoryToShow.id.toString()} id={this.state.singleCategoryToShow.id} name={this.state.singleCategoryToShow.name} site={PhotoPortfolio.site_url} clickCategory={this._showAllCategories.bind(this)} />; 
    }

    return (

      <App>
        <TitleBar />
        <MainContent>
          {contentToDisplay}
        </MainContent>
        <Footer />
      </App>
    );
  }
}