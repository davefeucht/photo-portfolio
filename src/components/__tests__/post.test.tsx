import { render } from '@testing-library/react';
import Post from 'components/Post/Post';
import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StateStore from 'StateStore/store';
import { ApiContext } from 'utils/ApiContext';
import WordpressAPI from 'utils/WordpressAPI';

const screenInfo = {
    width: 500,
    height: 500
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
    const posts = await api.getPosts(150);
    const { container } = render(
        <MemoryRouter initialEntries={['/post/150']}>
            <ApiContext.Provider value={api}>
                <Routes>
                    <Route
                        path="post/:postId"
                        element={(
                            <Post
                                screenInfo={screenInfo}
                                visiblePost={visiblePost}
                                currentCategoryPosts={posts}
                                clearVisiblePostTagNames={jest.fn()}
                                setCurrentPost={store.setCurrentPost}
                            />
                        )}
                    />
                </Routes>
            </ApiContext.Provider>
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
