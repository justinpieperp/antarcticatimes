import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_TAG } from '../../GraphQL/mutations'
import { Form, Input, Button } from 'antd'
import { triggerSuccessModal, triggerErrorModal } from '../components/common'
import { TableToolbar } from '../../layouts'

const CreateTag = () => {
  const [userInput, setUserInput] = useState('')
  const [form] = Form.useForm()
  const [createTag, { error, reset }] = useMutation(CREATE_TAG, {
    variables: {
      tag: userInput
    },
    onCompleted: () => {
      triggerSuccessModal(() => {})
    }
  })
  if (error) triggerErrorModal(error, reset)

  const submitForm = () => {
    createTag()
    form.resetFields()
  }

  // labelCol和wrapperCol
  // labelCol设置label, wrapperCol设置输入框/button
  // 一共有24个span, span={}代表占几个span, offset={}代表距离前一个元素有几个span
  return (
    <div className='container'>
      <TableToolbar
          title={'Tag/Create'}
          showAddButton={false}
          />
      <Form
        labelCol={{ span: 6 }}
        form={form}
        wrapperCol={{ span: 6 }}
        onFinish={submitForm}
      >
        <Form.Item name='name' label="New Tag"
            rules={[{ required: true, message: 'Please enter new tag name' }]}>
          <Input onChange={(e) => setUserInput(e.target.value)} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 6, offset: 6 }}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateTag
