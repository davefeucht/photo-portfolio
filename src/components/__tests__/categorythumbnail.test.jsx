import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import { ApiContext } from '../../utils/ApiContext';
import WordpressAPI from '../../utils/WordpressAPI';
import CategoryThumbnail from '../CategoryThumbnail/CategoryThumbnail';

const id = 5;
const name = 'Test Category';
const siteInfo = {
    siteName: 'Through a Pinhole',
    siteUrl: 'throughapinhole.com'
};

jest.mock('../../utils/WordpressAPI');

test('CategoryThumbnail displays', async () => {
    const store = new StateStore();
    const api = new WordpressAPI(store.siteInfo.siteUrl);
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <ApiContext.Provider value={api}>
                    <CategoryThumbnail id={id} name={name} siteInfo={siteInfo} />
                </ApiContext.Provider>
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
