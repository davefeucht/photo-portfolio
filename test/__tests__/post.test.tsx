import { render } from '@testing-library/react';
import Post from 'components/Post/Post';
import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StateStore from 'StateStore/store';
import { StoreContext } from 'utils/StoreContext';

jest.mock('../../utils/WordpressAPI');

test('Post displays', async () => {
    const store = new StateStore();
    const { container } = render(
        <MemoryRouter initialEntries={['/post/150']}>
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
    expect(container.firstChild).toMatchSnapshot();
});
