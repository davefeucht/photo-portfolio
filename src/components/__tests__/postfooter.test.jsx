import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import StateStore from '../../StateStore/store';
import PostFooter from '../PostFooter/PostFooter';

test('PostFooter displays', () => {
    const store = new StateStore();
    const component = renderer.create(
        <MemoryRouter>
            <PostFooter stateStore={store} />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
