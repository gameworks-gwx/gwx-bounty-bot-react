import React from 'react';
import { Form, Button, Input, Icon } from 'antd';
import { Link } from 'react-router-dom';

const LoginForm = ({
  values,
  handleSubmit,
  handleChange,
  loading,
  errors,
  form
}) => {

  let submitButton;
  const { getFieldDecorator } = form

  if (loading) {
    submitButton =
      <Button type="primary" style={{width: "100%"}} loading>
        Loading
    </Button>
  } else {
    submitButton =
      <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
        Log in
      </Button>
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {
          getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Please input your email address!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email address!'
              }
            ],
          })(
            <Input
              prefix={<Icon type="user" />}
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
            />
          )
        }
      </Form.Item>
      <Form.Item>
        {
          getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password' }],
          })(
            <Input
              prefix={<Icon type="user" />}
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          )
        }
      </Form.Item>
      <Form.Item>
        {submitButton}
      </Form.Item>
    </Form>
  )
}

export default Form.create({ name: 'normal_login' })(LoginForm);
