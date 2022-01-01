/*****************
* Category component displays the posts for a particular category.
*****************/

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import {
    useParams
} from 'react-router-dom';
import Posts from '../Posts/Posts.jsx';
import CategoryHeader from '../CategoryHeader/CategoryHeader.jsx';
import './Category.css';

const Category = ({ stateStore, api }) => {
    const { categoryId } = useParams();

    useEffect(() => {
        api.getPosts(categoryId);
        api.getCategoryInfo(categoryId);
    }, [categoryId]);

    return (
        <div className="category">
            <CategoryHeader stateStore={stateStore} categoryData={stateStore.currentCategoryData} />
            <Posts stateStore={stateStore} categoryId={categoryId} api={api} />
        </div>
    );
};

Category.displayName = 'Category';

Category.propTypes = {
    stateStore: PropTypes.object.isRequired,
    api: PropTypes.object.isRequired
};

export default observer(Category);
