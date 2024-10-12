import { render } from '@testing-library/react';
import PageContent from 'components/PageContent/PageContent';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

const content = 'This content should be displayed in the page because that is how it works';

test('PageContent displays', async () => {
    const { container } = render(
        <MemoryRouter initialEntries={['/page/150']}>
            <PageContent content={content} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
