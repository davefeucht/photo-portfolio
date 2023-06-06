import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Menu from '../components/Menu/Menu';
import StateStore from '../StateStore/store';

test('Menu displays', async () => {
    const store = new StateStore();
    const component = renderer.create(
        <MemoryRouter>
            <Menu stateStore={store} />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
