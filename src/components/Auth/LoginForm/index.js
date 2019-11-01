import React from 'react';
import { Form, Button, Input, Icon, Checkbox } from 'antd';
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
      <Button type="primary" style={{ width: "100%" }} loading>
        Loading
    </Button>
  } else {
    submitButton =
      <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
        Log in
      </Button>
  }

  return (
    <Form onSubmit={handleSubmit} style={{ verticalAlign: 'middle' }} >
      <Form.Item>
        {
          getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Please input your email address!',
              },
            ],
          })(
            <Input
              prefix={<Icon type="mail" />}
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
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          )
        }
      </Form.Item>
      <Form.Item>
        {
          getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)
        }
        <Link className="login-form-forgot" to="/">
          Forgot password
        </Link>
        {submitButton}
      </Form.Item>
    </Form>
  )
}

export default Form.create({ name: 'normal_login' })(LoginForm);
