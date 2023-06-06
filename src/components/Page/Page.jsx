/** ***************
* Page component implements displaying a page in the application
**************** */

import './Page.css';

import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getPage } from '../../utils/Api.js';
import PageContent from '../PageContent/PageContent.jsx';
import SectionHeader from '../SectionHeader/SectionHeader.jsx';

function Page({ stateStore }) {
    const { pageId } = useParams();
    const { currentPageData } = stateStore;

    useEffect(() => {
        getPage(pageId, stateStore.siteInfo.siteUrl)
            .then(page => {
                stateStore.setPageData(page);
            });
    }, [pageId]);

    return (
        <div className="page">
            <SectionHeader title={currentPageData.title?.rendered} />
            <PageContent content={currentPageData.content?.rendered} />
        </div>
    );
}

Page.displayName = 'Page';

Page.propTypes = {
    stateStore: PropTypes.object.isRequired
};

export default observer(Page);
