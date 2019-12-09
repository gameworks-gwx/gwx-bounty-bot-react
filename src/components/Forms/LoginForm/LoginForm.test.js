import React from 'react'
import { shallow } from 'enzyme'
import LoginForm from './index'
import { Form } from 'antd'

describe('LoginForm component', () => {
  it('It should render without errors', () => {
    const EnhancedForm = Form.create()(<LoginForm />)
    const component = shallow(<EnhancedForm />);
    console.log(component.debug())
    const boo = component.find('.boo');
    expect(boo.length).toBe(0);
  });

});
