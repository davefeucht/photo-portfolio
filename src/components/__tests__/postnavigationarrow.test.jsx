import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import PostNavigationArrow from '../PostNavigationArrow/PostNavigationArrow';

const direction = 'previous';
const postId = 35;

test('PostNavigationArrow displays', () => {
    const store = new StateStore();
    const { container } = render(
        <MemoryRouter>
            <PostNavigationArrow stateStore={store} direction={direction} postId={postId} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
