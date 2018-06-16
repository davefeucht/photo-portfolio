/*****************
* TitleBar component implements the title bar of the application
*****************/

import React from "react";
import StyledTitleBar from "./styledComponents/StyledTitleBar.jsx";
import SiteTitle from "./styledComponents/SiteTitle.jsx";

export default class TitleBar extends React.Component {

  render () {
    return (
      <StyledTitleBar>
        <SiteTitle>Through A Pinhole</SiteTitle>
      </StyledTitleBar>
    );
  }
}