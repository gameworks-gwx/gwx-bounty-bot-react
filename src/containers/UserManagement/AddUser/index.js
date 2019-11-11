import React from 'react'
import AddUserForm from '../../../components/Forms/AddUserForm';
import useForm from '../../../util/hooks/useForm';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/user'
import Container from '../../../components/UI/Container'


const AddUser = ({ createUser, loading, messageData }) => {
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'admin'
  }

  const submitForm = () => {
    createUser(values)
  }

  const { values, handleChange, handleSubmit } = useForm(submitForm, defaultValues)

  return (
    <Container>
      <Row type="flex">
        <Col span={24}>
          <AddUserForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            messageData={messageData}
          />
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = ({ user }) => {
  return {
    loading: user.loading,
    messageData: user.messageData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (userData) => dispatch(actions.createUser(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser)