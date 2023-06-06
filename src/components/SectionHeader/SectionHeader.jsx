/** ***************
* SectionHeader component implements the title bar of a Category or Page
**************** */

import './SectionHeader.css';

import PropTypes from 'prop-types';
import React from 'react';

function SectionHeader({ title }) {
    return (
        <div className="section-header">
            <div className="title">{title}</div>
        </div>
    );
}

SectionHeader.displayName = 'SectionHeader';

SectionHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default SectionHeader;
