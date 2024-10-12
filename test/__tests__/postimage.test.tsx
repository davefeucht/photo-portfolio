import { render } from '@testing-library/react';
import PostImage from 'components/PostImage/PostImage';
import * as React from 'react';
import { useRef } from 'react';
import { MemoryRouter } from 'react-router-dom';

const previousPostId = 34;
const nextPostId = 36;
const imageUrl = 'https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg';

const WrapperComponent: React.FC = () => {
    const ref = useRef<HTMLImageElement>(null);
    return (
        <MemoryRouter>
            <PostImage imageUrl={imageUrl} imageHeight={150} previousPost={previousPostId} nextPost={nextPostId} ref={ref} />
        </MemoryRouter>
    );
};

test('PostImage displays', async () => {
    const { container } = render(
        <WrapperComponent />
    );
    expect(container.firstChild).toMatchSnapshot();
});
