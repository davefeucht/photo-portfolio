import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader/SectionHeader';

const title = 'Some Section';

test('SectionHeader displays', () => {
  let component;
  let tree;
  component = renderer.create(
      <MemoryRouter >
          <SectionHeader title={title}></SectionHeader>
      </MemoryRouter>
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
