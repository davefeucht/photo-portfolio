import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import PhotoPortfolio from '../PhotoPortfolio/PhotoPortfolio';

const pages = [
    {
        id: 150,
        content: {
            rendered: 'Contact me!'
        },
        title: {
            rendered: 'Contact'
        }
    }
];

const categories = [
    {
        id: 23,
        count: 10,
        description: 'Category of other things',
        link: '',
        name: 'Some other category',
        slug: 'smocg',
        taxonomy: '',
        parent: 12,
        meta: {}
    },
    {
        id: 35,
        count: 3,
        description: 'Category of things',
        link: '',
        name: 'Some category',
        slug: 'smcg',
        taxonomy: '',
        parent: 23,
        meta: {}
    }
];

const posts = [
    {
        id: 'foo',
        link: 'http://foo',
        modified: '12308213098',
        slug: 'foo',
        type: 'foo',
        title: {
            rendered: 'foo'
        },
        content: {
            rendered: 'foo'
        },
        author: 0,
        featured_media: 0,
        categories: [0, 1],
        tags: [0, 1],
        thumbnail_image: 'http:/foo'
    }
];

jest.mock('../../utils/Api', () => ({
    getPostThumbnail: () => Promise.resolve('http://foo'),
    getSiteInfo: () => Promise.resolve('Though a Pinhole'),
    getCategories: () => Promise.resolve(categories),
    getCategoryImage: () => Promise.resolve('http://foo'),
    getPosts: () => Promise.resolve(posts),
    getPost: () => Promise.resolve(posts[0]),
    getCategoryInfo: () => Promise.resolve(),
    getPostImage: () => Promise.resolve('http://foo'),
    getTagNames: () => Promise.resolve(['foo', 'bob']),
    getPages: () => Promise.resolve(pages),
    getPage: () => Promise.resolve(pages[0])
}));

test('PhotoPortfolio displays', () => {
    const store = new StateStore();
    const { container } = render(
        <MemoryRouter initialEntries={['/category/35']}>
            <PhotoPortfolio stateStore={store} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
