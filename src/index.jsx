/****************
* Index which includes the PhotoPortfolio component
****************/

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import PhotoPortfolio from './components/PhotoPortfolio/PhotoPortfolio.jsx';
import stateStore from './StateStore/store';
import API from './utils/Api';
import './assets/stylesheets/main.scss';

const store = new stateStore();
const api = new API(store);
store.setApplicationRoot(document.getElementById('photo-portfolio'));
const root = createRoot(store.applicationRoot);
const router = createHashRouter([
    {
        path: '*',
        element: <PhotoPortfolio stateStore={store} api={api} />
    }
])

//Render the PhotoPortfolio component in the 'photo-portfolio' container on the page.
root.render(
  <RouterProvider router={router} />
);