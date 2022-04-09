import React, { useState } from 'react'
import { GET_USERS, GET_CATEGORIES, GET_TAGS } from '../../GraphQL/queries'
import { CREATE_POST } from '../../GraphQL/mutations'
import { useQuery, useMutation } from '@apollo/client'
import { triggerErrorModal, triggerSuccessModal, TagSelector } from '../components/common'
import { layout, layoutWithoutLabel } from '../components/_variables'
import { TableToolbar } from '../../layouts'
import { Form, Input, Button, Select, Spin } from 'antd'

const CreatePost = () => {
  const [form] = Form.useForm()
  const { Option } = Select

  const [title, setTitle] = useState('')
  const [userId, setUserId] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  const usersQuery = useQuery(GET_USERS, { fetchPolicy: 'cache-and-network' })
  const catesQuery = useQuery(GET_CATEGORIES, { fetchPolicy: 'cache-and-network' })
  const tagsQuery = useQuery(GET_TAGS, { fetchPolicy: 'cache-and-network' })
  const [createPost, { error, reset }] = useMutation(CREATE_POST, {
    variables: {
      title: title,
      user: userId,
      description: description,
      body: body,
      category: categoryId,
      imageURL: imageURL,
      tags: selectedTags
    },
    onCompleted: () => {
      triggerSuccessModal(() => {})
      form.resetFields()
    }
  })

  if (usersQuery.loading || catesQuery.loading || tagsQuery.loading) return <Spin className='center' tip="Loading..." />
  if (usersQuery.error) return triggerErrorModal(usersQuery.error, reset)
  if (catesQuery.error) return triggerErrorModal(catesQuery.error, reset)
  if (tagsQuery.error) return triggerErrorModal(tagsQuery.error, reset)
  if (error) return triggerErrorModal(error, reset)

  const allUsers = usersQuery.data.getUsers
  const allCates = catesQuery.data.getCategories
  const allTags = tagsQuery.data.getTags

  // console.log(selectedTags)

  const submitForm = () => {
    createPost()
  }

  const onValuesChange = (changedValue, allValues) => {
    setTitle(allValues.title)
    setUserId(allValues.user)
    setDescription(allValues.description)
    setBody(allValues.body)
    setCategoryId(allValues.category)
    setImageURL(allValues.imageURL)
    setSelectedTags(allValues.selectedTags)
    // console.log(changedValue)
    // console.log(allValues)
  }

  const validateMessages = {
    required: `${form.name} is required!`
  }

  return (
    <div className='container'>
      <TableToolbar
        title={'Post/Create'}
        showAddButton={false}
        />

    <Form {...layout}
        form={form}
        name="createpost"
        validateMessages={validateMessages}
        onValuesChange={onValuesChange}
        onFinish={submitForm}
        autoComplete="off"
        >

      <Form.Item label="title" name='title' rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="user" name='user' rules={[{ required: true }]}>
        <Select placeholder="Please select user">
          {allUsers.map((user, index) =>
            <Option value={user._id} key={index}>{user.username}</Option>
          )}
        </Select>
      </Form.Item>

      <Form.Item label="description" name='description' >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item label="body" name='body' rules={[{ required: true }]}>
        <Input.TextArea showCount maxLength={5000} />
      </Form.Item>

      <Form.Item label="category" name='category' rules={[{ required: true }]}>
        <Select placeholder="Please select category">
          {allCates.map((cate, index) =>
            <Option value={cate._id} key={index}>{cate.category}</Option>
          )}
        </Select>
      </Form.Item>

      <Form.Item
        name="select-multiple"
        label="Tags[multiple]"
        >
        <TagSelector
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          allTags={allTags}
          />
      </Form.Item>

      <Form.Item label="ImageURL" name='imageURL'>
        <Input />
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

export default CreatePost
