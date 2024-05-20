import './ImageCarousel.css';

import CarouselItem, { CarouselItemProps } from 'components/CarouselItem/CarouselItem';
import * as React from 'react';
import { useEffect, useState } from 'react';

interface Props {
    items: CarouselItemProps[]
}

const ImageCarousel: React.FC<Props> = ({ items }) => {
    const [displayItems, setDisplayItems] = useState<CarouselItemProps[]>([...items]);

    useEffect(() => {
        const carouselInterval = setInterval(() => {
            setDisplayItems(currentItems => {
                const lastElement = currentItems.pop()!;
                const newItems = [...currentItems];
                newItems.unshift(lastElement);

                return newItems;
            });
        }, 4000);

        return () => {
            clearInterval(carouselInterval);
        };
    }, []);

    return (
        <div className="image-carousel">
            {displayItems.map(item => {
                return (<div className="fade carousel-item-container" key={`carousel-item_${item.imageUrl}_${item.title}`}><CarouselItem imageUrl={item.imageUrl} title={item.title} /></div>);
            })}
        </div>
    );
};

export default ImageCarousel;
