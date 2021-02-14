/*****************
* Category component displays the posts for a particular category.
*****************/

import React from 'react';
import { observer } from 'mobx-react';
import { 
  useParams,
} from 'react-router-dom';
import Posts from '../Posts/Posts.jsx';
import CategoryHeader from '../CategoryHeader/CategoryHeader.jsx';
import './Category.css';

const Category = observer(({ stateStore, api }) => {
  let { categoryId } = useParams();

  api.getPosts(categoryId);
  api.getCategoryInfo(categoryId);

  return ( 
    <div className="category">
      <CategoryHeader stateStore={stateStore} categoryData={stateStore.currentCategoryData}/>
      <Posts stateStore={stateStore} categoryId={categoryId} api={api} />
    </div>
  );
});

Category.displayName = 'Category';

export default Category;