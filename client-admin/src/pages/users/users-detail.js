import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USER_BY_ID } from '../../GraphQL/queries'
import { UPDATE_USER } from '../../GraphQL/mutations'
import { Form, Input, Button, Spin } from 'antd'
import { triggerErrorModal, triggerSuccessModal } from '../components/common'
import { layout, layoutWithoutLabel } from '../components/_variables'
import { TableToolbar } from '../../layouts'

const UserDetail = () => {
  const params = useParams()
  const [form] = Form.useForm()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const userQuery = useQuery(GET_USER_BY_ID, {
    variables: {
      id: params.id
    }
  },
  { fetchPolicy: 'cache-and-network' }
  )
  const [updateUser, { error, reset }] = useMutation(UPDATE_USER, {
    onCompleted: () => triggerSuccessModal(() => {})
  })

  if (userQuery.loading) return <div className='container center'><Spin tip="Loading..." /></div>
  if (userQuery.error) return triggerErrorModal(userQuery.error)
  if (error) return triggerErrorModal(error, reset)

  const currentObj = userQuery.data.getUserById

  const submitForm = () => {
    updateUser({
      variables: {
        _id: currentObj._id,
        newUsername: username,
        newEmail: email
      }
    })
  }

  const initialValues = {
    username: currentObj.username,
    email: currentObj.email
  }

  const onValuesChange = (changedValue, allValues) => {
    setUsername(allValues.username)
    setEmail(allValues.email)
  }

  const validateMessages = {
    type: `${form.label} must be a ${form.label} type!`
  }

  return (
      <div className='container'>
        <TableToolbar
          title={'User/Detail'}
          showAddButton={false}
          />

        <Form {...layout}
          form={form}
          name="userform"
          initialValues={initialValues}
          validateMessages={validateMessages}
          onValuesChange={onValuesChange}
          onFinish={submitForm}
          autoComplete="off"
          >

          <Form.Item label="username" name='username' rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="email" name='email' rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="ID">
            { currentObj._id }
          </Form.Item>

          <Form.Item label="Post List">
            { currentObj.posts.map((post, index) => {
              return <li key={index}>{ post.title }</li>
            })}
          </Form.Item>

          <Form.Item {...layoutWithoutLabel}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
    </div>
  )
}

export default UserDetail
