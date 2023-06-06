import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Category from '../components/Category/Category';
import StateStore from '../StateStore/store';

const posts = [
    {
        id: 887,
        featured_media: 142,
        categories: [220]
    },
    {
        id: 824,
        featured_media: 820,
        categories: [220]
    }
];

const category = {
    id: 35,
    count: 3,
    description: 'Category of things',
    link: '',
    name: 'Some category',
    slug: 'smcg',
    taxonomy: '',
    parent: 23,
    meta: {}
};

jest.mock('../utils/Api', () => ({
    getPosts: () => Promise.resolve(posts),
    getPostThumbnail: () => Promise.resolve('https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg'),
    getCategoryInfo: () => Promise.resolve(category),
    getCategoryImage: () => Promise.resolve('https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg')
}));

test('Category displays', () => {
    const store = new StateStore();
    const component = renderer.create(
        <MemoryRouter initialEntries={['/category/35']}>
            <Category stateStore={store} />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
