import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import SectionHeader from '../SectionHeader/SectionHeader';

const title = 'Some Section';

test('SectionHeader displays', async () => {
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <SectionHeader title={title} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
