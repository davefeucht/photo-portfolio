import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import CategoryTitle from '../components/CategoryTitle/CategoryTitle';

const name = 'Test Category';

test('CategoryTitle displays', async () => {
    let component;
    let tree;
    component = renderer.create(
        <MemoryRouter>
            <CategoryTitle title={name} ></CategoryTitle>
        </MemoryRouter>
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
