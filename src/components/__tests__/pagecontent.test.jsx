import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import PageContent from '../PageContent/PageContent';

const content = 'This content should be displayed in the page because that is how it works';

test('PageContent displays', () => {
    const { container } = render(
        <MemoryRouter initialEntries={['/page/150']}>
            <PageContent content={content} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
