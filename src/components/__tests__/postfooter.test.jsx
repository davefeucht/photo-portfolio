import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import PostFooter from '../PostFooter/PostFooter';

test('PostFooter displays', () => {
    const store = new StateStore();
    const { container } = render(
        <MemoryRouter>
            <PostFooter stateStore={store} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
