import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Category from './Category.jsx';

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      errorMsg: ""
    }
  }

  _getCategories() {
    axios.get('http://' + this.props.site + '/wp-json/wp/v2/categories?exclude=1')
    .then(res => {
      const categories = res.data;
      this.setState({ categories });
    }, error => {
      const errorMsg = 'Did not work: ' + (error.response ? error.response : error);
      this.setState({ errorMsg });
    });
  }

  componentWillMount() {
    this._getCategories();
  }
  
  render() {
    let categoryList = [];
    categoryList = this.state.categories.map(category =>
      { return ( <Category key={category.id.toString()} id={category.id} name={category.name} site={this.props.site} /> ); }
    );
    return (
      <div className="category-list">
        {categoryList} 
        <div>{this.state.errorMsg}</div>
      </div>
    );
  }
}

export default Categories;
