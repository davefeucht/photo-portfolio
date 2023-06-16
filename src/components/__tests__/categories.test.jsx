import { render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import Categories from '../Categories/Categories';

const categories = [
    {
        id: 23,
        count: 6,
        description: 'Category of other things',
        link: '',
        name: 'Some other category',
        slug: 'smocg',
        taxonomy: '',
        parent: 12,
        meta: {}
    },
    {
        id: 35,
        count: 3,
        description: 'Category of things',
        link: '',
        name: 'Some category',
        slug: 'smcg',
        taxonomy: '',
        parent: 23,
        meta: {}
    }
];

jest.mock('../../utils/Api', () => ({
    getCategoryImage: () => Promise.resolve('https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg')
}));

test('Category list displays', async () => {
    const store = new StateStore();
    store.setCategoryList(categories);
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <Categories stateStore={store} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
    categories.forEach(category => {
        expect(screen.getByText(category.name));
    });
});
