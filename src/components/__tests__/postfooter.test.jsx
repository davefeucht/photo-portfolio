import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import PostFooter from '../PostFooter/PostFooter';

test('PostFooter displays', async () => {
    const tagNames = ['something', 'somethingelse'];
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <PostFooter tagNames={tagNames} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
