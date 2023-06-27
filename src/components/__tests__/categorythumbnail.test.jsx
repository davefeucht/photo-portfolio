import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import CategoryThumbnail from '../CategoryThumbnail/CategoryThumbnail';

const id = 5;
const name = 'Test Category';
const siteInfo = {
    siteName: 'Through a Pinhole',
    siteUrl: 'throughapinhole.com'
};

jest.mock('../../utils/Api', () => ({
    getCategoryImage: () => Promise.resolve('https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg')
}));

test('CategoryThumbnail displays', async () => {
    const store = new StateStore();
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <CategoryThumbnail id={id} name={name} siteInfo={siteInfo} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
