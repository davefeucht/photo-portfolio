import { render } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import PostThumbnail from '../PostThumbnail/PostThumbnail';

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
