import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PostImage from 'components/PostImage/PostImage';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

const previousPostId = 34;
const nextPostId = 36;
const imageUrl = 'https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg';

const WrapperComponent: React.FC = () => {
    return (
        <MemoryRouter>
            <PostImage imageUrl={imageUrl} previousPost={previousPostId} nextPost={nextPostId} />
        </MemoryRouter>
    );
};

describe('PostImage', () => {
    it('PostImage displays', async () => {
        const { container } = render(
            <WrapperComponent />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('Shows navigation arrows on hover', async () => {
        render(
            <WrapperComponent />
        );

        const postImage = screen.getByLabelText('post-image');

        fireEvent.mouseOver(postImage);

        await waitFor(() => expect(screen.getByLabelText('navigation-arrow-previous')).toBeInTheDocument());

        fireEvent.mouseOut(postImage);

        await waitFor(() => expect(screen.queryByLabelText('navigation-arrow-previous')).toBeNull());
    });
});
