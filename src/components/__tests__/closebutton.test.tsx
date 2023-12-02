import { render } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import CloseButton from '../CloseButton/CloseButton';

test('CloseButton displays', async () => {
    const { container } = render(
        <MemoryRouter>
            <CloseButton />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
