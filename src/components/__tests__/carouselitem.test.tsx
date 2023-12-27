import { render, screen, waitFor } from '@testing-library/react';
import CarouselItem from 'components/CarouselItem/CarouselItem';
import * as React from 'react';

const imageUrl = 'http://foo.image';
const title = 'Image';

describe('Tests CarouselItem component', () => {
    test('CarouselItem renders', async () => {
        const { container } = render(<CarouselItem imageUrl={imageUrl} title={title} />);

        expect(container).toMatchSnapshot();
    });
});
