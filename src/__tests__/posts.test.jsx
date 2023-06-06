import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Posts from '../components/Posts/Posts';
import StateStore from '../StateStore/store';

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
    const component = renderer.create(
        <MemoryRouter>
            <Posts stateStore={store} />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
