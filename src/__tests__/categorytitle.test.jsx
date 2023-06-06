import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import CategoryTitle from '../components/CategoryTitle/CategoryTitle';

const name = 'Test Category';

test('CategoryTitle displays', async () => {
    const component = renderer.create(
        <MemoryRouter>
            <CategoryTitle title={name} />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
