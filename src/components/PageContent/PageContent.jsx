/*****************
* PageContent component implements displaying the content of a page in the application
*****************/

import React from 'react';
import PropTypes from 'prop-types';
import './PageContent.css';

const PageContent = ({ content }) => {
    return (
        <div 
            className="page__content"
            dangerouslySetInnerHTML={{ __html: content }}
        >
        </div>
    );
};

PageContent.displayName = 'PageContent';

PageContent.propTypes = {
    content: PropTypes.string
};

export default PageContent;
