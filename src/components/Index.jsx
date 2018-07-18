/****************
* Index component which includes the PhotoPortfolio component
****************/

import React from "react";
import {render} from "react-dom";
import {createStore} from "redux";
import PhotoPortfolio from "./PhotoPortfolio.jsx";
import photoPortfolio from "../reducers/reducers.js";
import "../sass/main.scss";
import {toggleShowAllPosts, VisibilityFilters} from "../actions/actions.js";

const store = createStore(photoPortfolio);

console.log(store.getState());

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(toggleShowAllPosts(VisibilityFilters.SHOW_SINGLE));
store.dispatch(toggleShowAllPosts(VisibilityFilters.SHOW_ALL));

//Render the PhotoPortfolio component in the 'photo-portfolio' container on the page.
render(<PhotoPortfolio />, document.getElementById("photo-portfolio"));