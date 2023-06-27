import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import Posts from '../Posts/Posts';

const screenInfo = {
    width: 500,
    height: 500
};

const posts = [
    {
        id: 887,
        featured_media: 142,
        categories: [220],
        title: {
            rendered: 'Some post'
        }
    },
    {
        id: 889,
        featured_media: 145,
        categories: [220],
        title: {
            rendered: 'Some other post'
        }
    }
];

test('Posts displays', async () => {
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <Posts
                    maxItemsPerPage={10}
                    screenInfo={screenInfo}
                    currentCategoryPosts={posts}
                />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
