/*
 * Index which includes the PhotoPortfolio component
*/

import './assets/stylesheets/main.scss';

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import PhotoPortfolio from './components/PhotoPortfolio/PhotoPortfolio';
import StateStore from './StateStore/store';
import WordpressAPI from './utils/WordpressAPI';

const store = new StateStore();
const api = new WordpressAPI(store.siteInfo.siteUrl);
const rootNode = document.getElementById('photo-portfolio');
if (rootNode) {
    store.setApplicationRoot(rootNode);
}
const root = createRoot(store.applicationRoot);
const router = createHashRouter([
    {
        path: '*',
        element: <PhotoPortfolio stateStore={store} api={api} />
    }
]);

// Render the PhotoPortfolio component in the 'photo-portfolio' container on the page.
root.render(
    <RouterProvider router={router} />
);
