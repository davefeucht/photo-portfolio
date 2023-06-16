import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import Post from '../Post/Post';

const post = {
    id: 887,
    featured_media: 142,
    categories: [220]
};

const tagNames = ['tag1', 'tag2', 'tag3'];

const href = 'https://fooimage';

jest.mock('../../utils/Api', () => ({
    getPost: () => Promise.resolve(post),
    getTagNames: () => Promise.resolve(tagNames),
    getPostImage: () => Promise.resolve(href)
}));

test('Post displays', () => {
    const store = new StateStore();
    const { container } = render(
        <MemoryRouter initialEntries={['/page/150']}>
            <Post stateStore={store} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
