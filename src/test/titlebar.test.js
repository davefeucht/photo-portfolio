import React from 'react';
import TitleBar from '../components/TitleBar/TitleBar';
import renderer from 'react-test-renderer';

test('Titlebar displays', () => {
  const component = renderer.create(
    <TitleBar></TitleBar>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});