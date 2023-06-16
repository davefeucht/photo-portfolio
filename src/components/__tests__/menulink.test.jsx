import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import MenuLink from '../MenuLink/MenuLink';

const href = '/page/150';
const text = 'Contact';

test('MenuLink displays', async () => {
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <MenuLink href={href} text={text} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
