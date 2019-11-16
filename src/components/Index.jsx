/****************
* Index component which includes the PhotoPortfolio component
****************/

import React from 'react';
import { render } from 'react-dom';
import PhotoPortfolio from './PhotoPortfolio/PhotoPortfolio.jsx';
import stateStore from '../store/store';
import '../sass/main.scss';

const store = new stateStore();

//Render the PhotoPortfolio component in the 'photo-portfolio' container on the page.
render(
  <PhotoPortfolio stateStore={store}/>,
  document.getElementById("photo-portfolio")
);