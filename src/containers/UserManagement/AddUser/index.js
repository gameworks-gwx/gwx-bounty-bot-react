import React from 'react'
import AddUserForm from '../../../components/Forms/AddUserForm';
import useForm from '../../../util/hooks/useForm';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/user'


const AddUser = ({ createUser }) => {
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'admin'
  }

  const submitForm = () => {
    console.log(values)
    createUser(values)    
  }

  const { values, handleChange, handleSubmit } = useForm(submitForm, defaultValues)

  return (
    <Row type="flex" justify="center">
      <Col span={24}>
        <AddUserForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Col>
    </Row>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (userData) => dispatch(actions.createUser(userData))
  }
}

export default connect(null, mapDispatchToProps)(AddUser)