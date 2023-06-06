import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import PostFooter from '../components/PostFooter/PostFooter';
import StateStore from '../StateStore/store';

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
