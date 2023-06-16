import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import PostThumbnail from '../PostThumbnail/PostThumbnail';

const categoryPosts = [
    {
        thumbnail_image: 'some_url'
    }
];

const postId = 35;

test('PostThumbnail displays', () => {
    const store = new StateStore();
    store.setCategoryPosts(categoryPosts);
    const { container } = render(
        <MemoryRouter>
            <PostThumbnail stateStore={store} id={postId} index={0} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
