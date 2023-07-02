import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Post from '../Post/Post';

const screenInfo = {
    width: 500,
    height: 500
};

const siteInfo = {
    siteName: 'Through a Pinhole',
    siteUrl: 'throughapinhole.com'
};

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

const visiblePost = {
    postId: 150,
    postTitle: 'foo',
    tags: [0, 1],
    tagNames: ['moe', 'curly'],
    fullImageUrl: 'http://foo',
    width: 500,
    height: 500,
    featured_media: 0
};

const posts = [
    {
        id: 150,
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

test('Post displays', async () => {
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter initialEntries={['/post/150']}>
                <Routes>
                    <Route
                        path="post/:postId"
                        element={(
                            <Post
                                screenInfo={screenInfo}
                                siteInfo={siteInfo}
                                visiblePost={visiblePost}
                                currentCategoryPosts={posts}
                                clearVisiblePostTagNames={() => {}}
                                setCurrentPost={() => {}}
                            />
                        )}
                    />
                </Routes>
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
