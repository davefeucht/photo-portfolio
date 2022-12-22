import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import PhotoPortfolio from '../components/PhotoPortfolio/PhotoPortfolio';
import stateStore from '../StateStore/store';

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
]

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

jest.mock('../utils/Api', () => ({
    getCategories: () => Promise.resolve(categories),
    getPages: () => Promise.resolve(pages)
}));

test('PhotoPortfolio displays', () => {
  const store = new stateStore();
  let component;
  let tree;
  component = renderer.create(
      <MemoryRouter initialEntries={['/category/35']} >
          <PhotoPortfolio stateStore={store}></PhotoPortfolio>
      </MemoryRouter>
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
