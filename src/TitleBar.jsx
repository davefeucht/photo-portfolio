import React from 'react';
import ReactDOM from 'react-dom';


class TitleBar extends React.Component {
  constructor(props) {
    super(props);

  }

  render () {
    return (
      <div className="site-header">
        <h1 className="site-title">Through A Pinhole</h1>
      </div>
    );
  }
}

export default TitleBar
