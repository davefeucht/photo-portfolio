import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from '@mui/material/ImageListItemBar';
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
    return (
        <Link to={`/category/${id}`}>
            {thumbnailUrl && (
                <ImageListItem sx={{ overflow: "hidden" }}>
                    <img
                        src={thumbnailUrl}
                        alt={name}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={name}
                    />
                </ImageListItem>
            )}
        </Link>
    );
};

export default CategoryThumbnailRenderer;
