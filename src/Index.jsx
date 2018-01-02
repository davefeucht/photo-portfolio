import React from 'react';
import {render} from 'react-dom';
import PhotoPortfolio from './PhotoPortfolio.jsx';

var scss = require('./sass/main.scss');

render(<PhotoPortfolio />, document.getElementById('photo-portfolio'));
