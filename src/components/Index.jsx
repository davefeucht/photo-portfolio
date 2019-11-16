/****************
* Index component which includes the PhotoPortfolio component
****************/

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import PhotoPortfolio from './PhotoPortfolio/PhotoPortfolio.jsx';
import stateStore from '../store/state_store';
import photoPortfolioState from '../reducers/reducers.js';
import '../sass/main.scss';

const mobxStore = new stateStore();
const store = createStore(photoPortfolioState, /* preloadedState, */ devToolsEnhancer());

//Render the PhotoPortfolio component in the 'photo-portfolio' container on the page.
render(
  <Provider store={store}>
    <PhotoPortfolio stateStore={mobxStore}/>
  </Provider>,
  document.getElementById("photo-portfolio")
);