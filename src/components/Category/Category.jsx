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

import { getCategoryInfo, getPosts } from '../../utils/Api.js';

import './Category.css';

const Category = ({ stateStore }) => {
    const { categoryId } = useParams();

    useEffect(() => {
        getPosts(categoryId, stateStore);
        getCategoryInfo(categoryId, stateStore);
    }, [categoryId]);

    return (
        <div className="category">
            <SectionHeader stateStore={stateStore} title={stateStore.currentCategoryData.name} />
            <Posts stateStore={stateStore} categoryId={categoryId} />
            <Outlet />
        </div>
    );
};

Category.displayName = 'Category';

Category.propTypes = {
    stateStore: PropTypes.object.isRequired
};

export default observer(Category);
