import { render } from '@testing-library/react';
import PostThumbnail from 'components/PostThumbnail/PostThumbnail';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

const thumbnailImage = 'some_url';
const postId = 35;

test('PostThumbnail displays', async () => {
    const { container } = render(
        <MemoryRouter>
            <PostThumbnail id={postId} thumbnailImage={thumbnailImage} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
