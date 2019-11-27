import React, { useEffect } from 'react'
import AddUserForm from '../../../components/Forms/AddUserForm';
import useForm from '../../../util/hooks/useForm';
import { Row, Col, PageHeader, message } from 'antd';
import { connect } from 'react-redux';
import { createUser } from '../../../store/actions/user'
import Container from '../../../components/UI/Container'


const AddUser = ({ createUser, loading, messageData }) => {
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'admin'
  }

  useEffect(() => {
    if (messageData) {
      message.success(messageData.message)
    }
  }, [messageData])

  const submitForm = () => {
    createUser(values)
  }

  const { values, handleChange, handleSubmit } = useForm(submitForm, defaultValues)

  return (
    <Container>
      <PageHeader
        onBack={() => window.history.back()}
        title="Add User"
      />
      <Row type="flex">
        <Col span={24}>
          <AddUserForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
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
    createUser: (userData) => dispatch(createUser(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser)