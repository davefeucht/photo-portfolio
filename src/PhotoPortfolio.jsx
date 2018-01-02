import React from 'react';
import TitleBar from './TitleBar.jsx';
import Categories from './Categories.jsx';

class PhotoPortfolio extends React.Component {
  constructor(props) {
    super(props);

    this.site_url = `dev.throughapinhole.com`;

    this.state = {
      singleCategoryToShow: 0
    }

  }

  render () {

    return (
      <div className="app">
        <TitleBar />
        <Categories site={this.site_url} />
      </div>
    );
  }
}

export default PhotoPortfolio;
