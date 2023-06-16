import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import PostImage from '../PostImage/PostImage';

const previousPostId = 34;
const nextPostId = 36;

test('PostImage displays', async () => {
    const store = new StateStore();
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <PostImage stateStore={store} previousPost={previousPostId} nextPost={nextPostId} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
