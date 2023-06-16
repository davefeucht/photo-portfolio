import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
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

test('Posts displays', async () => {
    const store = new StateStore();
    store.setCategoryPosts(posts);
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <Posts stateStore={store} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
