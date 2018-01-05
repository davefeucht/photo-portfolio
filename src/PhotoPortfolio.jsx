import React from "react";
import TitleBar from "./TitleBar.jsx";
import Categories from "./Categories.jsx";

class PhotoPortfolio extends React.Component {
  constructor(props) {
    super(props);

    this.site_url = "dev.throughapinhole.com";

    this.state = {
      singleCategoryToShow: 0
    };

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
