import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Categories from '../components/Categories/Categories';
import stateStore from '../StateStore/store';

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
]

jest.mock('../utils/Api', () => ({
    getCategoryImage: () => Promise.resolve('https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg')
}));

test('Category list displays', async () => {
    const store = new stateStore();
    let component;
    let tree;
    store.setCategoryList(categories);
    await act(async () => {
        component = renderer.create(
            <MemoryRouter>
                <Categories stateStore={store}></Categories>
            </MemoryRouter>
        );

    })
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
