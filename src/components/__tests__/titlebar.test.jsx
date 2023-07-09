import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

import StateStore from '../../StateStore/store';
import { ApiContext } from '../../utils/ApiContext';
import WordpressAPI from '../../utils/WordpressAPI';
import TitleBar from '../TitleBar/TitleBar';

jest.mock('../../utils/WordpressAPI');

test('Titlebar displays', async () => {
    const store = new StateStore();
    const api = new WordpressAPI(store.siteInfo.siteUrl);
    let container;
    await act(async () => {
        container = render(
            <ApiContext.Provider value={api}>
                <TitleBar stateStore={store} />
            </ApiContext.Provider>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
