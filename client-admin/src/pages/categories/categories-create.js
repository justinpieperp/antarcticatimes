import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_CATEGORY } from '../../GraphQL/mutations'
import { triggerErrorModal, triggerSuccessModal } from '../components/common'
import { Form, Input, Button } from 'antd'
import { TableToolbar } from '../../layouts'

const CreateCategory = () => {
  const [userInput, setUserInput] = useState()
  const [form] = Form.useForm()
  const [create, { error, reset }] = useMutation(CREATE_CATEGORY, {
    variables: {
      category: userInput
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
    required: 'Category name is required!'
  }

  return (
      <div className='container'>
        <TableToolbar
          title={'Category/Create'}
          showAddButton={false}
          />
        <Form {...layout}
            form={form}
            name="create"
            onFinish={submitForm}
            validateMessages={validateMessages}
            >

          <Form.Item label="New Category" name='input' rules={[{ required: true }]}>
            <Input onChange={(e) => setUserInput(e.target.value)}/>
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

export default CreateCategory
