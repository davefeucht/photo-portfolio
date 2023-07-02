import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import PostThumbnail from '../PostThumbnail/PostThumbnail';

const thumbnailImage = 'some_url';
const postId = 35;

test('PostThumbnail displays', async () => {
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <PostThumbnail id={postId} thumbnailImage={thumbnailImage} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
