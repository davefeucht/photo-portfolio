/*******************
* Top level PhotoPortfolio component. Sets up the base site URL and 
* loads the title bar and list of categories.
*******************/

import React from "react";
import TitleBar from "./TitleBar.jsx";
import Categories from "./Categories.jsx";

class PhotoPortfolio extends React.Component {
  constructor(props) {
    //Call React.Component constructor with the props passed to the PhotoPortfolio component
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
        <div className="site-footer">
          Copyright @2018 Dave Feucht   
        </div>
      </div>
    );
  }
}

export default PhotoPortfolio;
