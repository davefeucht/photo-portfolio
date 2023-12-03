import { render } from '@testing-library/react';
import MenuLink from 'components/MenuLink/MenuLink';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

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
