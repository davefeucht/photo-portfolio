import React from 'react';
import renderer from 'react-test-renderer';
import TitleBar from '../components/TitleBar/TitleBar';
import stateStore from '../store/store';
import API from '../utils/Api';

test('Titlebar displays', () => {
  const store = new stateStore();
  const api = new API(store);
  const component = renderer.create(
    <TitleBar stateStore={store} api={api}></TitleBar>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});