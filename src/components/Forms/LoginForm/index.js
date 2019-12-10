import React from "react";
import { Form, Button, Input, Icon, Checkbox } from "antd";

const LoginForm = ({ handleSubmit, handleChange, loading, form }) => {
  let submitButton;
  const { getFieldDecorator, validateFieldsAndScroll } = form;

  const validateForm = event => {
    event.preventDefault();

    validateFieldsAndScroll((error, _) => {
      if (!error) {
        handleSubmit();
      }
    });
  };

  if (loading) {
    submitButton = (
      <Button type="primary" style={{ width: "100%" }} loading>
        Loading
      </Button>
    );
  } else {
    submitButton = (
      <Button
        type="primary"
        size="large"
        shape="round"
        htmlType="submit"
        style={{ width: "100%" }}
      >
        Log in
      </Button>
    );
  }

  return (
    <Form onSubmit={validateForm} style={{ verticalAlign: "middle" }}>
      <Form.Item>
        {getFieldDecorator("email", {
          rules: [
            { required: true, message: "Email address is required" },
            { type: "email", message: "Invalid email address" }
          ]
        })(
          <Input
            prefix={<Icon type="mail" />}
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password", {
          rules: [
            { required: true, message: "Password is required" },
            { min: 8, message: "Password must be at least 8 characters long" }
          ]
        })(
          <Input
            prefix={<Icon type="lock" />}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("remember", {
          valuePropName: "checked",
          initialValue: true
        })(<Checkbox style={{ color: "white" }}>Remember me</Checkbox>)}
        {submitButton}
      </Form.Item>
    </Form>
  );
};

export default Form.create({ name: "normal_login" })(LoginForm);
export const LoginFormTest = LoginForm;
