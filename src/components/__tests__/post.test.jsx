import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import { ApiContext } from '../../utils/ApiContext';
import WordpressAPI from '../../utils/WordpressAPI';
import Post from '../Post/Post';

const screenInfo = {
    width: 500,
    height: 500
};

const siteInfo = {
    siteName: 'Through a Pinhole',
    siteUrl: 'throughapinhole.com'
};

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

jest.mock('../../utils/WordpressAPI');

test('Post displays', async () => {
    const store = new StateStore();
    const api = new WordpressAPI(store.siteInfo.siteUrl);
    const posts = await api.getPosts();
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter initialEntries={['/post/150']}>
                <ApiContext.Provider value={api}>
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
                                    setCurrentPost={store.setCurrentPost}
                                />
                            )}
                        />
                    </Routes>
                </ApiContext.Provider>
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
