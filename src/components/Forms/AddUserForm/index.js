import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';

const AddUserForm = ({
  form,
  handleSubmit,
  handleChange,
  loading
}) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 3 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    }
  }

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 12,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 3
      }
    }
  }

  const handleConfirmBlur = (event) => {
    const { value } = event.target;
    setConfirmDirty(confirmDirty || !!value)
  }

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Passwords don\'t match')
    } else {
      callback()
    }
  }

  const validateForm = (event) => {
    event.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        event.target.reset()
        handleSubmit()
      }
    });
  }

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback()
  }

  let submitButton;

  if (loading) {
    submitButton =
      <Button type="primary" htmlType="submit" size="large" style={{ width: "100%" }} shape="round" loading>Loading</Button>
  } else {
    submitButton =
      <Button type="primary" htmlType="submit" size="large" style={{ width: "100%" }} shape="round">Add user</Button>
  }

  return (
    <Form onSubmit={validateForm} {...formItemLayout} style={{ padding: '20px' }}>
      <Form.Item label="First Name">
        {
          getFieldDecorator('firstName', {
            rules: [
              { required: true, message: 'First name is required' },
              { min: 2, message: 'First name must be at least 2 characters long' }
            ]
          })(
            <Input
              name="firstName"
              onChange={handleChange}
            />
          )
        }
      </Form.Item>
      <Form.Item label="Last Name">
        {
          getFieldDecorator('lastName', {
            rules: [
              { required: true, message: 'Last name is required ' },
              { min: 2, message: 'Last name must be at least 2 characters long' }
            ]
          })(
            <Input
              name="lastName"
              onChange={handleChange}
            />
          )
        }
      </Form.Item>
      <Form.Item label="Email Address">
        {
          getFieldDecorator('email', {
            rules: [
              { required: true, message: 'Email address is required' },
              { type: 'email', message: 'Invalid email address' },
            ]
          })(
            <Input
              name="email"
              onChange={handleChange}
            />
          )
        }
      </Form.Item>
      <Form.Item label="Password">
        {
          getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Password is required' },
              { validator: validateToNextPassword },
              { min: 8, message: 'Password must be at least 8 characters long' }
            ]
          })(
            <Input.Password
              name="password"
              onChange={handleChange}
            />
          )
        }
      </Form.Item>
      <Form.Item label="Confirm Password">
        {
          getFieldDecorator('confirm', {
            rules: [
              { required: true, message: 'Confirm your password' },
              { validator: compareToFirstPassword },
            ]
          })(<Input.Password onBlur={handleConfirmBlur} />)
        }
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        {submitButton}
      </Form.Item>
    </Form>

  )
}

export default Form.create({ name: 'add_user' })(AddUserForm)