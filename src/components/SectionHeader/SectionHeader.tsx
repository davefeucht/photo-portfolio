/** ***************
* SectionHeader component implements the title bar of a Category or Page
**************** */

import './SectionHeader.css';

import { observer } from 'mobx-react';
import * as React from 'react';

interface SectionHeaderProps {
    title?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
    return (
        <div className="section-header">
            <div className="title">{title ?? 'No Title'}</div>
        </div>
    );
};

SectionHeader.displayName = 'SectionHeader';

export default observer(SectionHeader);
