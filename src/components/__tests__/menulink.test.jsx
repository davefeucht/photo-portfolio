import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import MenuLink from '../MenuLink/MenuLink';

const href = '/page/150';
const text = 'Contact';

test('MenuLink displays', async () => {
    const component = renderer.create(
        <MemoryRouter>
            <MenuLink href={href} text={text} />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
