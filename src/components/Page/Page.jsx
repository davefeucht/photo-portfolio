/*****************
* Page component implements displaying a page in the application
*****************/

import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import SectionHeader from '../SectionHeader/SectionHeader.jsx';
import PageContent from '../PageContent/PageContent.jsx';
import './Page.css';

const Page = ({ stateStore, api }) => {
    let { pageId } = useParams();
    const { currentPageData } = stateStore;

    useEffect(() => {
        api.getPage(pageId);
    }, [pageId]);

    return (
        <div className="page">
            <SectionHeader title={currentPageData.title?.rendered} />
            <PageContent content={currentPageData.content?.rendered} />
        </div>
    );
};

Page.displayName = 'Page';

Page.propTypes = {
    stateStore: PropTypes.object.isRequired,
    api: PropTypes.object.isRequired
};

export default observer(Page);
