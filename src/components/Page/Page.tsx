/** ***************
* Page component implements displaying a page in the application
**************** */

import './Page.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getPage } from '../../utils/Api';
import {
    Page as PageState,
    SiteInfo
} from '../../utils/types';
import PageContent from '../PageContent/PageContent';
import SectionHeader from '../SectionHeader/SectionHeader';

interface PageProps {
    currentPageData: PageState,
    siteInfo: SiteInfo,
    setPageData: (a: PageState) => void
}

const Page: React.FC<PageProps> = ({ currentPageData, siteInfo, setPageData }) => {
    const { pageId } = useParams();

    useEffect(() => {
        if (pageId) {
            getPage(parseInt(pageId), siteInfo.siteUrl)
                .then(page => {
                    setPageData(page);
                });
        }
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
