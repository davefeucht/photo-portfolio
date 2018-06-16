/*****************
* Footer component implements the footer of the application
*****************/

import React from "react";
import StyledFooter from "./styledComponents/StyledFooter.jsx";

export default class Footer extends React.Component {

  render () {
    return (
      <StyledFooter>
        Copyright @2018 Dave Feucht  
      </StyledFooter>
    );
  }
}