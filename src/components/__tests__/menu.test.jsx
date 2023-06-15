import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import StateStore from '../../StateStore/store';
import Menu from '../Menu/Menu';

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
