import { render } from '@testing-library/react';
import TitleBar from 'components/TitleBar/TitleBar';
import * as React from 'react';
import StateStore from 'StateStore/store';
import { StoreContext } from 'utils/StoreContext';

jest.mock('utils/WordpressAPI');

test('Titlebar displays', async () => {
    const store = new StateStore();
    const { container } = render(
        <StoreContext.Provider value={store}>
            <TitleBar />
        </StoreContext.Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
});
