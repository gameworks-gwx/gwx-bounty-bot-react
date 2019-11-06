import React from 'react';
import AddUser from './AddUser'
import EditUser from './EditUser'
import DeleteUser from './DeleteUser'

import Container from '../../components/UI/Container';
import Navbar from '../../components/UI/Navbar'

const UserManagement = ({ match, location }) => {

  let container;

  if (match.params.typeof === 'delete-user') {
    container = <DeleteUser />
  } else if (match.params.typeof === 'edit-user') {
    container = <EditUser />
  } else {
    container = <AddUser />
  }
  return (
    <Container>
      <Navbar pathname={location.pathname} />
      {container}
    </Container>
  )
}

export default UserManagement