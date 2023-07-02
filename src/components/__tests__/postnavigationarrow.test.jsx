import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import PostNavigationArrow from '../PostNavigationArrow/PostNavigationArrow';

const imageHeight = 500;
const direction = 'previous';
const postId = 35;

test('PostNavigationArrow displays', async () => {
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <PostNavigationArrow imageHeight={imageHeight} direction={direction} postId={postId} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
