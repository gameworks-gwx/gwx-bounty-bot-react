import React from 'react';
import { Message } from 'semantic-ui-react';

const Error = ({ message }) => {
  return (
    <Message negative>
      <Message.Header>
        {message}
      </Message.Header>
    </Message>
  )
}

export default Error;