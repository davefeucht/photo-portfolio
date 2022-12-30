import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import PaginationNavigationItem from '../components/PaginationNavigationItem/PaginationNavigationItem';

const content = '1';
const selectedState = 'selected';
const navigationFunction = () => {};
const isLast = false;

test('PaginationNavigationItem displays', async () => {
    let component;
    let tree;
    component = renderer.create(
        <MemoryRouter>
            <PaginationNavigationItem content={content} selectedState={selectedState} navigationFunction={navigationFunction} isLast={isLast} />
        </MemoryRouter>
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
