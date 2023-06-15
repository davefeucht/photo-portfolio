import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import StateStore from '../../StateStore/store';
import CategoryThumbnail from '../CategoryThumbnail/CategoryThumbnail';

const id = 5;
const name = 'Test Category';

jest.mock('../../utils/Api', () => ({
    getCategoryImage: () => Promise.resolve('https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg')
}));

test('CategoryThumbnail displays', async () => {
    const store = new StateStore();
    let component;
    await act(async () => {
        component = renderer.create(
            <MemoryRouter>
                <CategoryThumbnail id={id} name={name} stateStore={store} />
            </MemoryRouter>
        );
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
