import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import StateStore from '../../StateStore/store';
import PhotoPortfolio from '../PhotoPortfolio/PhotoPortfolio';

const pages = [
    {
        id: 150,
        content: {
            rendered: 'Contact me!'
        },
        title: {
            rendered: 'Contact'
        }
    }
];

const categories = [
    {
        id: 23,
        count: 10,
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
    getCategories: () => Promise.resolve(categories),
    getPages: () => Promise.resolve(pages)
}));

test('PhotoPortfolio displays', () => {
    const store = new StateStore();
    const component = renderer.create(
        <MemoryRouter initialEntries={['/category/35']}>
            <PhotoPortfolio stateStore={store} />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
