/** ***************
* Page component implements displaying a page in the application
**************** */

import './Page.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getPage } from '../../utils/Api';
import { Store } from '../../utils/types';
import PageContent from '../PageContent/PageContent';
import SectionHeader from '../SectionHeader/SectionHeader';

interface PageProps {
    stateStore: Store
}

const Page: React.FC<PageProps> = ({ stateStore }) => {
    const { pageId } = useParams();
    const { currentPageData } = stateStore;

    useEffect(() => {
        getPage(parseInt(pageId), stateStore.siteInfo.siteUrl)
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
};

Page.displayName = 'Page';

export default observer(Page);
