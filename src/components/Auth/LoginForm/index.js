import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const LoginForm = ({
  values,
  handleSubmit,
  handleChange,
  loading,
  errors,
}) => {

  console.log(errors);
  let submitButton;

  if (loading) {
    submitButton =
      <Button
        type="submit"
        style={{ marginTop: '0.5em' }}
        fluid
        loading
      >
        Submit
      </Button>
  } else {
    submitButton =
      <Button
        type="submit"
        style={{ marginTop: '0.5em' }}
        fluid
      >
        Submit
      </Button>
  }

  return (
    <Form onSubmit={handleSubmit}>
      {
        errors.email
          ?
          <Form.Input
            error={errors.email}
            label="Email"
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
          />
          :
          <Form.Input
            label="Email"
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
          />
      }
      {
        errors.password
          ?
          <Form.Input
            error={errors.password}
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
          :
          <Form.Input
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
      }
      <Link to="/">Forgot password?</Link>
      {submitButton}
    </Form >
  )
}

export default LoginForm;
