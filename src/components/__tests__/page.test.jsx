import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import { ApiContext } from '../../utils/ApiContext';
import WordpressAPI from '../../utils/WordpressAPI';
import Page from '../Page/Page';

const siteInfo = {
    siteName: 'Through a Pinhole',
    siteUrl: 'throughapinhole.com'
};

jest.mock('../../utils/WordpressAPI');

test('Page displays', async () => {
    const store = new StateStore();
    const api = new WordpressAPI(store.siteInfo.siteUrl);
    const page = await api.getPage();
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter initialEntries={['/page/150']}>
                <ApiContext.Provider value={api}>
                    <Routes>
                        <Route
                            path="page/:pageId"
                            element={(
                                <Page
                                    currentPageData={page}
                                    siteInfo={siteInfo}
                                    setPageData={store.setPageData}
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
