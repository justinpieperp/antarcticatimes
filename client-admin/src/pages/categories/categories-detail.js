import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_CATEGORY_BY_ID } from '../../GraphQL/queries'
import { UPDATE_CATEGORY } from '../../GraphQL/mutations'
import { triggerErrorModal, triggerSuccessModal } from '../components/common'
import { layout, layoutWithoutLabel } from '../components/_variables'
import { TableToolbar } from '../../layouts'
import { Form, Input, Button, Spin } from 'antd'

const CategoryDetail = () => {
  const params = useParams()
  const [form] = Form.useForm()
  const [userInput, setUserInput] = useState('')
  const { data, loading, refetch } = useQuery(GET_CATEGORY_BY_ID, {
    variables: {
      id: params.id
    }
  })
  const [updateCategory, { error, reset }] = useMutation(UPDATE_CATEGORY, {
    onCompleted: () => triggerSuccessModal(refetch)
  })

  if (loading) return <Spin className='center' tip="Loading..." />
  if (error) triggerErrorModal(error, reset)
  const currentObj = data.getCategoryById

  const submitForm = () => {
    updateCategory({
      variables: {
        id: currentObj._id,
        updateTo: userInput
      }
    })
    form.resetFields()
  }

  const validateMessages = {
    required: 'Category name is required!'
  }

  return (
      <div className='container'>
        <TableToolbar
          title={'Category/Detail'}
          showAddButton={false}
          />

        <Form {...layout}
            form={form}
            name="nest-messages"
            onFinish={submitForm}
            validateMessages={validateMessages}
            >

          <Form.Item label="Current Name">
            { currentObj.category }
          </Form.Item>

          <Form.Item label="Change To" name='input' rules={[{ required: true }]}>
            <Input onChange={(e) => setUserInput(e.target.value)}/>
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

export default CategoryDetail
