import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import CategoryThumbnail from '../components/CategoryThumbnail/CategoryThumbnail';
import stateStore from '../StateStore/store';

const id = 5;
const name = 'Test Category';

jest.mock('../utils/Api', () => ({
    getCategoryImage: () => Promise.resolve('https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg')
}));

test('CategoryThumbnail displays', async () => {
    const store = new stateStore();
    let component;
    let tree;
    await act(async () => {
        component = renderer.create(
            <MemoryRouter>
                <CategoryThumbnail id={id} name={name} stateStore={store}></CategoryThumbnail>
            </MemoryRouter>
        );
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
