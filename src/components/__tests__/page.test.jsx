import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import Page from '../Page/Page';

const page = {
    id: 150,
    content: {
        rendered: 'Contact me!'
    },
    title: {
        rendered: 'Contact'
    }
};

jest.mock('../../utils/Api', () => ({
    getPage: () => Promise.resolve(page)
}));

test('Page displays', async () => {
    const store = new StateStore();
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter initialEntries={['/page/150']}>
                <Page stateStore={store} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
