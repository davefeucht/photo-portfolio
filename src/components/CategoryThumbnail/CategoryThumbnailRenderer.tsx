import CategoryTitle from 'components/CategoryTitle/CategoryTitle';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    id: number;
    name: string;
    thumbnailUrl: string;
}

const CategoryThumbnailRenderer: React.FC<Props> = ({
    id,
    name,
    thumbnailUrl
}) => {
    const divStyle = { backgroundImage: `url(${thumbnailUrl || ''})` };

    return (
        <Link to={`/category/${id}`}>
            <div style={divStyle} className="category-thumbnail" aria-label={`category-${name.split(' ').join('-')}`}>
                <CategoryTitle title={name} />
            </div>
        </Link>
    );
};

export default CategoryThumbnailRenderer;
