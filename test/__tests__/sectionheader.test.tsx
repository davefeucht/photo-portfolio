import { render } from '@testing-library/react';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

const title = 'Some Section';

test('SectionHeader displays', async () => {
    const { container } = render(
        <MemoryRouter>
            <SectionHeader title={title} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
