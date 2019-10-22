const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = 'Email address is required!'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Invalid email'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  }
  return errors;
}

export default validate;