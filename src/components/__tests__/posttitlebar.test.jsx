import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import PostTitlebar from '../PostTitlebar/PostTitlebar';

const postTitle = 'Some Post';

test('PostTitlebar displays', () => {
    const component = renderer.create(
        <MemoryRouter>
            <PostTitlebar postTitle={postTitle} />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
