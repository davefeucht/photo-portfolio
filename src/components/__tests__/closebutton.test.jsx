import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import CloseButton from '../CloseButton/CloseButton';

test('CloseButton displays', async () => {
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <CloseButton />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
