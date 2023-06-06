import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import PostImage from '../components/PostImage/PostImage';
import StateStore from '../StateStore/store';

const previousPostId = 34;
const nextPostId = 36;

test('PostImage displays', () => {
    const store = new StateStore();
    const component = renderer.create(
        <MemoryRouter>
            <PostImage stateStore={store} previousPost={previousPostId} nextPost={nextPostId} />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
