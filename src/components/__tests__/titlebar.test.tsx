import { render } from '@testing-library/react';
import TitleBar from 'components/TitleBar/TitleBar';
import * as React from 'react';
import StateStore from 'StateStore/store';
import { ApiContext } from 'utils/ApiContext';
import WordpressAPI from 'utils/WordpressAPI';

jest.mock('utils/WordpressAPI');

test('Titlebar displays', async () => {
    const store = new StateStore();
    const api = new WordpressAPI(store.siteInfo.siteUrl);
    const { container } = render(
        <ApiContext.Provider value={api}>
            <TitleBar stateStore={store} />
        </ApiContext.Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
});
