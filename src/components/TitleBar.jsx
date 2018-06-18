/*****************
* TitleBar component implements the title bar of the application
*****************/

import React from "react";
import StyledTitleBar from "./styledComponents/StyledTitleBar.jsx";
import SiteTitle from "./styledComponents/SiteTitle.jsx";

export default function TitleBar (props) {

    return (
      <StyledTitleBar>
        <SiteTitle>{props.siteName}</SiteTitle>
      </StyledTitleBar>
    );
}