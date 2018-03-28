/****************
* Index component which includes the PhotoPortfolio component
****************/

import React from "react";
import {render} from "react-dom";
import PhotoPortfolio from "./PhotoPortfolio.jsx";
import "./sass/main.scss";

//Render the PhotoPortfolio component in the 'photo-portfolio' container on the page.
render(<PhotoPortfolio />, document.getElementById("photo-portfolio"));
