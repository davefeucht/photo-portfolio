import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import PostNavigationArrow from '../PostNavigationArrow/PostNavigationArrow';

const direction = 'previous';
const postId = 35;

test('PostNavigationArrow displays', async () => {
    const store = new StateStore();
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <PostNavigationArrow stateStore={store} direction={direction} postId={postId} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
