import React from 'react'
import { shallow } from 'enzyme'
import Sidebar from './index'
import { findByTestAttr } from '../../../util/tests'

const setup = (props = {}) => {
  const component = shallow(<Sidebar {...props} />);
  return component;
};

describe('Sidebar component', () => {

  let component;

  beforeEach(() => {
    component = setup()
  });

  it('Should contain 4 menu items (PC)', () => {
    const menuItems = findByTestAttr(component, 'pcMenuItem')
    expect(menuItems.length).toBe(4);
  });

  it('Should contain 4 menu items (Mobile)', () => {
    const menuItems = findByTestAttr(component, 'mobileMenuItem')
    expect(menuItems.length).toBe(4);
  });

});

