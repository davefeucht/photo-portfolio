/*******************
* Top level PhotoPortfolio component. Sets up the base site URL and 
* loads the title bar and list of categories.
*******************/

import React from "react";
import TitleBar from "./TitleBar.jsx";
import Categories from "./Categories.jsx";
import Footer from "./Footer.jsx";

export default class PhotoPortfolio extends React.Component {
  constructor(props) {
    super(props);

    //Set up the base site url
    this.site_url = "throughapinhole.com";

  }

  render () {

    return (
      <div className="app">
        <TitleBar />
        <div className="content">
          <Categories site={this.site_url} />
        </div>
        <Footer />
      </div>
    );
  }
}