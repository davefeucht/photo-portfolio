import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import PostImage from '../PostImage/PostImage';

const previousPostId = 34;
const nextPostId = 36;

test('PostImage displays', () => {
    const store = new StateStore();
    const { container } = render(
        <MemoryRouter>
            <PostImage stateStore={store} previousPost={previousPostId} nextPost={nextPostId} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
