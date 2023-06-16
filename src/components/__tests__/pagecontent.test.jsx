import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import PageContent from '../PageContent/PageContent';

const content = 'This content should be displayed in the page because that is how it works';

test('PageContent displays', async () => {
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter initialEntries={['/page/150']}>
                <PageContent content={content} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
