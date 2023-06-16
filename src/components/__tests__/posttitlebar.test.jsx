import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import PostTitlebar from '../PostTitlebar/PostTitlebar';

const postTitle = 'Some Post';

test('PostTitlebar displays', async () => {
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <PostTitlebar postTitle={postTitle} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
