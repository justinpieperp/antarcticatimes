import React, { useState } from 'react'
import { GET_TAG_BY_ID } from '../../GraphQL/queries'
import { UPDATE_TAG } from '../../GraphQL/mutations'
import { Form, Input, Button, Spin } from 'antd'
import { useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { triggerErrorModal, triggerSuccessModal } from '../components/common'
import { layout, layoutWithoutLabel } from '../components/_variables'
import { TableToolbar } from '../../layouts'

const TagDetail = () => {
  const params = useParams()
  const [userInput, setUserInput] = useState('')
  const [form] = Form.useForm()
  const { data, loading, refetch } = useQuery(GET_TAG_BY_ID,
    {
      variables: {
        _id: params.id
      }
    },
    { fetchPolicy: 'cache-and-network' })

  const [updateTag, { error, reset }] = useMutation(UPDATE_TAG, {
    onCompleted: () => {
      triggerSuccessModal(refetch)
    }
  })

  if (loading) return <Spin className='center' tip="Loading..." />
  if (error) triggerErrorModal(error, reset)

  const currentTag = data.getTagById

  const submitForm = () => {
    form.setFieldsValue({ tagname: '' })
    updateTag({
      variables: {
        _id: currentTag._id,
        updateTo: userInput
      }
    })
  }

  return (
      <div className='container'>
        <TableToolbar
          title={'Tag/Detail'}
          showAddButton={false}
          />
        <Form {...layout}
          name="basic"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 6 }}
          onFinish={submitForm}
        >
          <Form.Item label="Tag Name">
            {currentTag.tag}
          </Form.Item>

          <Form.Item label="New Name" name='tagname'
            rules={[{ required: true, message: 'Please enter new tag name' }]}>
            <Input onChange={e => { setUserInput(e.target.value) }} />
          </Form.Item>

          <Form.Item label="Tag Id">{currentTag._id}</Form.Item>

          <Form.Item label="Post List">
            {currentTag.posts.map((post, index) => {
              return (
                <li key={index}>{post.title}</li>
              )
            })}
          </Form.Item>

          <Form.Item {...layoutWithoutLabel}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
  )
}

export default TagDetail
