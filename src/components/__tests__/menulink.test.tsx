import { render } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import MenuLink from '../MenuLink/MenuLink';

const href = '/page/150';
const text = 'Contact';

test('MenuLink displays', async () => {
    const { container } = render(
        <MemoryRouter>
            <MenuLink href={href} text={text} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
