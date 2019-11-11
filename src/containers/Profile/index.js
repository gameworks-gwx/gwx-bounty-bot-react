import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { fetchProfile } from '../../store/actions/profile'
import { Descriptions, PageHeader } from 'antd'
import Container from '../../components/UI/Container'

const Profiles = ({ match, fetchProfile, profile }) => {

  useEffect(() => {
    fetchProfile(match.params.id)
  }, [])

  return (
    <Container>
      <PageHeader
        onBack={() => window.history.back()}
        title="User Info"
      >

        <Descriptions>
          <Descriptions.Item label="Telegram Username">{profile.telegramUsername}</Descriptions.Item>
          <Descriptions.Item label="First Name">{profile.firstName}</Descriptions.Item>
          <Descriptions.Item label="Last Name">{profile.lastName}</Descriptions.Item>
          <Descriptions.Item label="Email Address">{profile.email}</Descriptions.Item>
          <Descriptions.Item label="GWX Address">{profile.gwxAddress}</Descriptions.Item>
          <Descriptions.Item label="Tasks Completed">{profile.tasks ? profile.tasks.length : 0} / 6</Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </Container>
  )
}

const mapStateToProps = ({ profile }) => {
  return {
    profile: profile.specificProfile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfile: (id) => dispatch(fetchProfile(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);