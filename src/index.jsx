/****************
* Index which includes the PhotoPortfolio component
****************/

import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import PhotoPortfolio from './components/PhotoPortfolio/PhotoPortfolio.jsx';
import stateStore from './StateStore/store';
import API from './utils/Api';
import './assets/stylesheets/main.scss';

const store = new stateStore();
const api = new API(store);
store.setApplicationRoot(document.getElementById('photo-portfolio'));
const root = createRoot(store.applicationRoot);

//Render the PhotoPortfolio component in the 'photo-portfolio' container on the page.
root.render(
  <Router>
    <PhotoPortfolio stateStore={store} api={api}/>
  </Router>
);