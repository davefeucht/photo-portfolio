/** ***************
* PageContent component implements displaying the content of a page in the application
**************** */

import './PageContent.css';

import PropTypes from 'prop-types';
import React from 'react';

function PageContent({ content }) {
    return (
        <div
            className="page__content"
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}

PageContent.displayName = 'PageContent';

PageContent.propTypes = {
    content: PropTypes.string.isRequired
};

export default PageContent;
