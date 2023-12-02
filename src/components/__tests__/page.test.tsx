import { render } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import { ApiContext } from '../../utils/ApiContext';
import WordpressAPI from '../../utils/WordpressAPI';
import Page from '../Page/Page';

jest.mock('../../utils/WordpressAPI');

test('Page displays', async () => {
    const store = new StateStore();
    const api = new WordpressAPI(store.siteInfo.siteUrl);
    const page = await api.getPage(150);
    const { container } = render(
        <MemoryRouter initialEntries={['/page/150']}>
            <ApiContext.Provider value={api}>
                <Routes>
                    <Route
                        path="page/:pageId"
                        element={(
                            <Page
                                currentPageData={page}
                                setPageData={store.setPageData}
                            />
                        )}
                    />
                </Routes>
            </ApiContext.Provider>
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
