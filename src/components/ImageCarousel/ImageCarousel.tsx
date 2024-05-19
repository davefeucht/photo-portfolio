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

    useEffect(() => {
        console.log(displayItems);
    }, [displayItems]);

    return (
        <div className="image-carousel">
            {displayItems.map(item => <CarouselItem key={`carousel-item_${item.imageUrl}_${item.title}`} imageUrl={item.imageUrl} title={item.title} />)}
        </div>
    );
};

export default ImageCarousel;
