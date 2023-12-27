import './CarouselItem.css';

import * as React from 'react';

interface Props {
    imageUrl: string;
    title: string;
}

interface TitleProps {
    title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
    return (
        <div className="carousel-item__title">
            <span>{title}</span>
        </div>
    );
};

const CarouselItem: React.FC<Props> = ({ imageUrl, title }) => {
    return (
        <div
            className="carousel-item"
        >
            <img className="carousel-item__image" src={imageUrl} />
            <Title title={title} />
        </div>
    );
};

export default CarouselItem;
