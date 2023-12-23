import { render } from '@testing-library/react';
import PostFooter from 'components/PostFooter/PostFooter';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

test('PostFooter displays', async () => {
    const tagNames = ['something', 'somethingelse'];
    const { container } = render(
        <MemoryRouter>
            <PostFooter tagNames={tagNames} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
