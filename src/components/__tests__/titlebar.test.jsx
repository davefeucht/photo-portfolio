import { render } from '@testing-library/react';
import React from 'react';

import StateStore from '../../StateStore/store';
import TitleBar from '../TitleBar/TitleBar';

jest.mock('../../utils/Api', () => ({
    getSiteInfo: () => Promise.resolve('Through a Pinhole')
}));

test('Titlebar displays', () => {
    const store = new StateStore();
    const { container } = render(
        <TitleBar stateStore={store} />
    );
    expect(container.firstChild).toMatchSnapshot();
});
