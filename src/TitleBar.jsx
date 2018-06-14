/*****************
* TitleBar component implements the title bar of the application
*****************/

import React from "react";


export default class TitleBar extends React.Component {

  render () {
    return (
      <div className="site-header">
        <h1 className="site-title">Through A Pinhole</h1>
      </div>
    );
  }
}