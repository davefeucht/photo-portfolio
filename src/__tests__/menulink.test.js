import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import MenuLink from '../components/MenuLink/MenuLink';

const href = '/page/150';
const text = 'Contact'

test('MenuLink displays', async () => {
    let component;
    let tree;
    component = renderer.create(
        <MemoryRouter>
            <MenuLink href={href} text={text}></MenuLink>
        </MemoryRouter>
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
