/*******************
* Top level PhotoPortfolio component. Sets up the base site URL and 
* loads the title bar and list of categories.
*******************/

import React from "react";
import App from "./styledComponents/App.jsx";
import TitleBar from "./TitleBar.jsx";
import MainContent from "./styledComponents/MainContent.jsx";
import Categories from "./Categories.jsx";
import Footer from "./Footer.jsx";

export default class PhotoPortfolio extends React.Component {

  static site_url = "throughapinhole.com";

  render () {

    return (
      <App>
        <TitleBar />
        <MainContent>
          <Categories site={PhotoPortfolio.site_url} />
        </MainContent>
        <Footer />
      </App>
    );
  }
}