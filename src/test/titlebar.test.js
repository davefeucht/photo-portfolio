import React from 'react';
import TitleBar from '../components/TitleBar/TitleBar';
import stateStore from '../store/store';
import renderer from 'react-test-renderer';

test('Titlebar displays', () => {
  const store = new stateStore();
  const component = renderer.create(
    <TitleBar stateStore={store}></TitleBar>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});