import React from 'react';
import { Message } from 'semantic-ui-react';

const Alert = ({ message, type }) => {
  console.log(type);
  return (
    <Message {...type}>
      <Message.Header>
        {message}
      </Message.Header>
    </Message>
  )
}

export default Alert;