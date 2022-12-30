import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Category from '../components/Category/Category';
import stateStore from '../StateStore/store';

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
    const store = new stateStore();
    let component;
    let tree;
    component = renderer.create(
        <MemoryRouter initialEntries={['/category/35']} >
            <Category stateStore={store}></Category>
        </MemoryRouter>
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
