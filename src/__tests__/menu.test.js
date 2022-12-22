import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Menu from '../components/Menu/Menu';
import stateStore from '../StateStore/store';

test('CategoryThumbnail displays', async () => {
    const store = new stateStore();
    let component;
    let tree;
    component = renderer.create(
        <MemoryRouter>
            <Menu stateStore={store}></Menu>
        </MemoryRouter>
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
