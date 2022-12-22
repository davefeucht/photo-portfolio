import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import PageContent from '../components/PageContent/PageContent';

const content = 'This content should be displayed in the page because that is how it works';

test('PageContent displays', () => {
  let component;
  let tree;
  component = renderer.create(
      <MemoryRouter initialEntries={['/page/150']} >
          <PageContent content={content}></PageContent>
      </MemoryRouter>
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
