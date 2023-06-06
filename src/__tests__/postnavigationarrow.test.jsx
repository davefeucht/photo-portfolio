import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import PostNavigationArrow from '../components/PostNavigationArrow/PostNavigationArrow';
import StateStore from '../StateStore/store';

const direction = 'previous';
const postId = 35;

test('PostNavigationArrow displays', () => {
    const store = new StateStore();
    const component = renderer.create(
        <MemoryRouter>
            <PostNavigationArrow stateStore={store} direction={direction} postId={postId} />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
