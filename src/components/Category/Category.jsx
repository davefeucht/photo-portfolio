/*****************
* Category component displays the posts for a particular category.
*****************/

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import {
    Outlet,
    useParams
} from 'react-router-dom';
import Posts from '../Posts/Posts.jsx';
import SectionHeader from '../SectionHeader/SectionHeader.jsx';
import './Category.css';

const Category = ({ stateStore, api }) => {
    const { categoryId } = useParams();

    useEffect(() => {
        api.getPosts(categoryId);
        api.getCategoryInfo(categoryId);
    }, [categoryId]);

    return (
        <div className="category">
            <SectionHeader stateStore={stateStore} title={stateStore.currentCategoryData.name} />
            <Posts stateStore={stateStore} categoryId={categoryId} api={api} />
            <Outlet />
        </div>
    );
};

Category.displayName = 'Category';

Category.propTypes = {
    stateStore: PropTypes.object.isRequired,
    api: PropTypes.object.isRequired
};

export default observer(Category);
