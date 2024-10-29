import PageContent from 'components/PageContent/PageContent';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import * as React from 'react';

interface Props {
    title: string;
    content: string;
}

const PageRenderer: React.FC<Props> = ({
    title,
    content
}) => {
    return (
        <div className="page">
            <SectionHeader title={title} />
            <PageContent content={content} />
        </div>
    );
};

export default PageRenderer;
