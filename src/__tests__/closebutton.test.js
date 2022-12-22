import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import CloseButton from '../components/CloseButton/CloseButton';

test('CloseButton displays', async () => {
    let component;
    let tree;
    component = renderer.create(
        <MemoryRouter>
            <CloseButton />
        </MemoryRouter>
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
