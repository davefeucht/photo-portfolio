import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import PostThumbnail from '../components/PostThumbnail/PostThumbnail';
import StateStore from '../StateStore/store';

const categoryPosts = [
    {
        thumbnail_image: 'some_url'
    }
];

const postId = 35;

test('PostThumbnail displays', () => {
    const store = new StateStore();
    store.setCategoryPosts(categoryPosts);
    const component = renderer.create(
        <MemoryRouter>
            <PostThumbnail stateStore={store} id={postId} index={0} />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
