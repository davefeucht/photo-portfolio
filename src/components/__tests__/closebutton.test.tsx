import { render } from '@testing-library/react';
import CloseButton from 'components/CloseButton/CloseButton';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

test('CloseButton displays', async () => {
    const { container } = render(
        <MemoryRouter>
            <CloseButton />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
