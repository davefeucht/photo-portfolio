/** ***************
* Page component implements displaying a page in the application
**************** */

import './Page.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from 'utils/StoreContext';

import { Store } from '../../utils/types';
import PageContent from '../PageContent/PageContent';
import SectionHeader from '../SectionHeader/SectionHeader';

const Page: React.FC = () => {
    const { pageId } = useParams();
    const store = useContext(StoreContext) as Store;

    useEffect(() => {
        if (pageId) {
            store.getPage(parseInt(pageId));
        }
    }, [pageId]);

    return (
        <div className="page">
            <SectionHeader title={store.currentPageData.title?.rendered} />
            <PageContent content={store.currentPageData.content?.rendered} />
        </div>
    );
};

Page.displayName = 'Page';

export default observer(Page);
