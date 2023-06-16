import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import Posts from '../Posts/Posts';

const posts = [
    {
        id: 887,
        featured_media: 142,
        categories: [220],
        title: {
            rendered: 'Some post'
        }
    },
    {
        id: 889,
        featured_media: 145,
        categories: [220],
        title: {
            rendered: 'Some other post'
        }
    }
];

test('Posts displays', () => {
    const store = new StateStore();
    store.setCategoryPosts(posts);
    const { container } = render(
        <MemoryRouter>
            <Posts stateStore={store} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
