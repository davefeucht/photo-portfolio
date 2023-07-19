/** ***************
* Page component implements displaying a page in the application
**************** */

import './Page.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ApiContext } from '../../utils/ApiContext';
import {
    API,
    Page as PageState
} from '../../utils/types';
import PageContent from '../PageContent/PageContent';
import SectionHeader from '../SectionHeader/SectionHeader';

interface PageProps {
    currentPageData: PageState,
    setPageData: (a: PageState) => void
}

const Page: React.FC<PageProps> = ({ currentPageData, setPageData }) => {
    const { pageId } = useParams();
    const api = useContext(ApiContext) as API;
    const { getPage } = api;

    useEffect(() => {
        if (pageId) {
            getPage(parseInt(pageId))
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
