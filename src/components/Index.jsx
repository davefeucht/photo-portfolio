/****************
* Index component which includes the PhotoPortfolio component
****************/

import React from 'react';
import { render } from 'react-dom';
import PhotoPortfolio from './PhotoPortfolio/PhotoPortfolio.jsx';
import stateStore from '../store/store';
import API from '../utils/Api';
import '../sass/main.scss';

const store = new stateStore();
const api = new API(store);

store.setApplicationRoot(document.getElementById("photo-portfolio"));
store.setModalDiv(document.getElementById("modal"));

//Render the PhotoPortfolio component in the 'photo-portfolio' container on the page.
render(
  <PhotoPortfolio stateStore={store} api={api}/>,
  store.applicationRoot
);