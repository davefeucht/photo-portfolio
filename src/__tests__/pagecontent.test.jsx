import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import PageContent from '../components/PageContent/PageContent';

const content = 'This content should be displayed in the page because that is how it works';

test('PageContent displays', () => {
    const component = renderer.create(
        <MemoryRouter initialEntries={['/page/150']}>
            <PageContent content={content} />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
