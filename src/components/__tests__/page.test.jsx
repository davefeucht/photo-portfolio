import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

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

test('Page displays', () => {
    const store = new StateStore();
    const component = renderer.create(
        <MemoryRouter initialEntries={['/page/150']}>
            <Page stateStore={store} />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
