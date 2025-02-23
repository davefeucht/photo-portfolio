import { ImageListItem, ImageListItemBar } from '@mui/material';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
    id: number;
    name: string;
    thumbnailUrl: string;
    variant: 'category' | 'post';
}

const ThumbnailRenderer: React.FC<Props> = ({ id, name, thumbnailUrl, variant }) => {
    const location = useLocation();

    return (
        <Link
            to={`${variant}/${id}`}
            state={{ background: location }}
        >
            {thumbnailUrl && (
                <ImageListItem sx={{ overflow: "hidden" }}>
                    <img
                        src={thumbnailUrl}
                        alt={name}
                        loading="lazy"
                    />
                    {variant === 'category' && (
                        <ImageListItemBar
                            title={name}
                        />
                    )}
                </ImageListItem>
            )}
        </Link>
    );
};

export default ThumbnailRenderer;
