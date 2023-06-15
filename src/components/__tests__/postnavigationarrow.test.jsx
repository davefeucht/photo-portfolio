import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import StateStore from '../../StateStore/store';
import PostNavigationArrow from '../PostNavigationArrow/PostNavigationArrow';

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
