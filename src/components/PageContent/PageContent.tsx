/** ***************
* PageContent component implements displaying the content of a page in the application
**************** */

import './PageContent.css';

import * as React from 'react';

interface PageContentProps {
    content: string
}

const PageContent: React.FC<PageContentProps> = ({ content }) => {
    return (
        <div
            className="page__content"
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

PageContent.displayName = 'PageContent';

export default PageContent;
