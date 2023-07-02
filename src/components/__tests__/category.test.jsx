import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Category from '../Category/Category';

const screenInfo = {
    width: 500,
    height: 500
};

const siteInfo = {
    siteName: 'Through a Pinhole',
    siteUrl: 'throughapinhole.com'
};

const posts = [
    {
        id: 887,
        featured_media: 142,
        categories: [220],
        thumbnail_image: 'https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg'
    },
    {
        id: 824,
        featured_media: 820,
        categories: [220],
        thumbnail_image: 'https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg'
    }
];

const category = {
    id: 35,
    count: 3,
    description: 'Category of things',
    link: '',
    name: 'Some category',
    slug: 'smcg',
    taxonomy: '',
    parent: 23,
    meta: {}
};

jest.mock('../../utils/Api', () => ({
    getPosts: () => Promise.resolve(posts),
    getPostThumbnail: () => Promise.resolve('https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg'),
    getCategoryInfo: () => Promise.resolve(category),
    getCategoryImage: () => Promise.resolve('https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg')
}));

const setCategoryPostsMock = jest.fn();
const setCategoryDataMock = jest.fn();
const setThumbnailImageUrlMock = jest.fn();

test('Category displays', async () => {
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter initialEntries={['/category/35']}>
                <Routes>
                    <Route
                        path="category/:categoryId"
                        element={(
                            <Category
                                maxItemsPerPage={2}
                                siteInfo={siteInfo}
                                screenInfo={screenInfo}
                                currentCategoryPosts={posts}
                                currentCategoryData={category}
                                setCategoryPosts={setCategoryPostsMock}
                                setCategoryData={setCategoryDataMock}
                                setThumbnailImageUrl={setThumbnailImageUrlMock}
                            />
                        )}
                    />
                </Routes>
            </MemoryRouter>
        ).container;
    });
    await waitFor(() => {
        expect(setCategoryPostsMock).toHaveBeenCalledTimes(1);
        expect(setCategoryDataMock).toHaveBeenCalledTimes(1);
        expect(setThumbnailImageUrlMock).toHaveBeenCalledTimes(2);
    });
    expect(container.firstChild).toMatchSnapshot();
});
