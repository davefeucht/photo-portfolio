import React from 'react';
import renderer from 'react-test-renderer';

import StateStore from '../../StateStore/store';
import TitleBar from '../TitleBar/TitleBar';

jest.mock('../../utils/Api', () => ({
    getSiteInfo: () => Promise.resolve('Through a Pinhole')
}));

test('Titlebar displays', () => {
    const store = new StateStore();
    const component = renderer.create(
        <TitleBar stateStore={store} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
