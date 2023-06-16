import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import SectionHeader from '../SectionHeader/SectionHeader';

const title = 'Some Section';

test('SectionHeader displays', () => {
    const { container } = render(
        <MemoryRouter>
            <SectionHeader title={title} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
