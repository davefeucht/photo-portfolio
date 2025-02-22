/** ***************
* Page component implements displaying a page in the application
**************** */

import './Page.css';

import PageRenderer from 'components/Page/PageRenderer';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from 'utils/StoreContext';
import { Store } from 'utils/types';

const Page: React.FC = () => {
    const { pageId } = useParams();
    const store = useContext(StoreContext) as Store;

    useEffect(() => {
        if (pageId) {
            store.getPage(parseInt(pageId));
        }
    }, [pageId]);

    return (
        <PageRenderer
            title={store.currentPageData.title?.rendered}
            content={store.currentPageData.content?.rendered}
        />
    );
};

Page.displayName = 'Page';

export default observer(Page);
