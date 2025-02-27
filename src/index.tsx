/*
 * Index which includes the PhotoPortfolio component
*/

import './assets/stylesheets/main.scss';

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import PhotoPortfolio from './components/PhotoPortfolio/PhotoPortfolio';
import StateStore from './StateStore/store';

const store = new StateStore();
const rootNode = document.getElementById('photo-portfolio');
if (rootNode) {
    store.setApplicationRoot(rootNode);
}
const root = createRoot(store.applicationRoot);

// Render the PhotoPortfolio component in the 'photo-portfolio' container on the page.
root.render(
    <HashRouter>
        <PhotoPortfolio stateStore={store} />
    </HashRouter>
);
