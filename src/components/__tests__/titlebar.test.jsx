import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

import StateStore from '../../StateStore/store';
import TitleBar from '../TitleBar/TitleBar';

jest.mock('../../utils/Api', () => ({
    getSiteInfo: () => Promise.resolve('Through a Pinhole')
}));

test('Titlebar displays', async () => {
    const store = new StateStore();
    let container;
    await act(async () => {
        container = render(
            <TitleBar stateStore={store} />
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
