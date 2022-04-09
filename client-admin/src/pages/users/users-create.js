import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../GraphQL/mutations'
import { triggerErrorModal, triggerSuccessModal } from '../components/common'
import { Form, Input, Button } from 'antd'
import { TableToolbar } from '../../layouts'

const CreateUser = () => {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [form] = Form.useForm()

  const [create, { error, reset }] = useMutation(CREATE_USER, {
    variables: {
      username: username,
      email: email,
      password: password
    },
    onCompleted: () => triggerSuccessModal(() => {})
  })

  if (error) triggerErrorModal(error, reset)

  const submitForm = () => {
    create()
    form.resetFields()
  }

  const layout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 6
    }
  }

  const validateMessages = {
    required: `${form} is required!`
  }

  return (
      <div className='container'>
         <TableToolbar
          title={'User/Create'}
          showAddButton={false}
          />

        <Form {...layout}
            form={form}
            name="create"
            onFinish={submitForm}
            validateMessages={validateMessages}
            >

          <Form.Item label="Username" name='username' rules={[{ required: true, whitespace: true }]}>
            <Input onChange={(e) => setUsername(e.target.value)}/>
          </Form.Item>

          <Form.Item label="Email" name='email' rules={[{ required: true, type: 'email', whitespace: true }]}>
            <Input onChange={(e) => setEmail(e.target.value)}/>
          </Form.Item>

          <Form.Item label="Password" name='password' rules={[{ required: true, whitespace: true }]}>
            <Input onChange={(e) => setPassword(e.target.value)}/>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
    </div>
  )
}

export default CreateUser
