import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Page from '../components/Page/Page';
import stateStore from '../StateStore/store';

const page = {
    id: 150,
    content: {
        rendered: 'Contact me!'
    },
    title: {
        rendered: 'Contact'
    }
};

jest.mock('../utils/Api', () => ({
    getPage: () => Promise.resolve(page)
}));

test('Page displays', () => {
  const store = new stateStore();
  let component;
  let tree;
  component = renderer.create(
      <MemoryRouter initialEntries={['/page/150']} >
          <Page stateStore={store}></Page>
      </MemoryRouter>
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
