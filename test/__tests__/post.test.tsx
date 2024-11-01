import { render, screen, waitFor } from '@testing-library/react';
import Post from 'components/Post/Post';
import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StateStore from 'StateStore/store';
import { StoreContext } from 'utils/StoreContext';

import { posts } from '../data/testData';

jest.mock('../../utils/WordpressAPI');

test('Post displays', async () => {
    const store = new StateStore();
    store.setScreenInfo(500, 500);
    const { container } = render(
        <MemoryRouter initialEntries={['/post/1']}>
            <StoreContext.Provider value={store}>
                <Routes>
                    <Route
                        path="post/:postId"
                        element={(
                            <Post />
                        )}
                    />
                </Routes>
            </StoreContext.Provider>
        </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText(posts[0].title.rendered)).toBeInTheDocument());
    expect(container.firstChild).toMatchSnapshot();
});
