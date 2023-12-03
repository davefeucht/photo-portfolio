import { render } from '@testing-library/react';
import Posts from 'components/Posts/Posts';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Post as PostState } from 'utils/types';

const screenInfo = {
    width: 500,
    height: 500
};

const posts: PostState[] = [
    {
        id: 887,
        link: '',
        modified: '',
        slug: '',
        type: '',
        featured_media: 142,
        categories: [220],
        title: {
            rendered: 'Some post'
        },
        content: {
            rendered: 'Some content',
            protected: false
        },
        thumbnail_image: 'https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg',
        author: 1,
        tags: []
    },
    {
        id: 889,
        link: '',
        modified: '',
        slug: '',
        type: '',
        featured_media: 145,
        categories: [220],
        title: {
            rendered: 'Some other post'
        },
        content: {
            rendered: 'Some other content',
            protected: false
        },
        thumbnail_image: 'https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg',
        author: 1,
        tags: []
    }
];

test('Posts displays', async () => {
    const { container } = render(
        <MemoryRouter>
            <Posts
                categoryId={220}
                maxItemsPerPage={10}
                screenInfo={screenInfo}
                currentCategoryPosts={posts}
            />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
