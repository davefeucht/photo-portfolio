/*****************
* SectionHeader component implements the title bar of a Category or Page
*****************/

import React from 'react';
import PropTypes from 'prop-types';
import './SectionHeader.css';

const SectionHeader = ({ title }) => {
    return (
        <div className="section-header">
            <div className="title">{title}</div>
        </div>
    );
};

SectionHeader.displayName = 'SectionHeader';

SectionHeader.propTypes = {
    title: PropTypes.string
};

export default SectionHeader;
