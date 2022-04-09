import React, { useState } from 'react'
import { GET_POST_BY_ID, GET_USERS, GET_CATEGORIES, GET_TAGS } from '../../GraphQL/queries'
import { UPDATE_POST } from '../../GraphQL/mutations'
import { useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { triggerErrorModal, triggerSuccessModal, TagSelector } from '../components/common'
import { layout, layoutWithoutLabel } from '../components/_variables'
import { Form, Input, Button, Select, Spin } from 'antd'
import { TableToolbar } from '../../layouts'

const PostDetail = () => {
  const params = useParams()
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
  const postQuery = useQuery(GET_POST_BY_ID,
    {
      variables: {
        id: params.id
      },
      onCompleted: data => setSelectedTags(data.getPostById.tags.map((tag, index) => { return tag.tag }))
    }
    , { fetchPolicy: 'cache-and-network' }

  )

  const [updatePost, { error, reset }] = useMutation(UPDATE_POST, {
    onCompleted: () => {
      triggerSuccessModal(postQuery.refetch)
    }
  })

  if (usersQuery.loading || catesQuery.loading || tagsQuery.loading || postQuery.loading) return <Spin className='center' tip="Loading..." />
  if (usersQuery.error) return triggerErrorModal(usersQuery.error, reset)
  if (catesQuery.error) return triggerErrorModal(catesQuery.error, reset)
  if (tagsQuery.error) return triggerErrorModal(tagsQuery.error, reset)
  if (postQuery.error) return triggerErrorModal(postQuery.error, reset)
  if (error) return triggerErrorModal(error, reset)

  const allUsers = usersQuery.data.getUsers
  const allCates = catesQuery.data.getCategories
  const allTags = tagsQuery.data.getTags
  const currObj = postQuery.data.getPostById
  // const currTags = currObj.tags.map((tag, index) => { return tag.tag })

  const submitForm = () => {
    updatePost({
      variables: {
        _id: currObj._id,
        title: title,
        user: userId,
        description: description,
        body: body,
        category: categoryId,
        imageURL: imageURL,
        tags: selectedTags
      }
    })
  }

  const initialValues = {
    title: currObj.title,
    user: currObj.user.username,
    description: currObj.description,
    body: currObj.body,
    category: currObj.category.category,
    imageURL: currObj.imageURL,
    tags: selectedTags
  }

  // console.log('currTags' + currTags)

  const onValuesChange = (changedValue, allValues) => {
    setTitle(allValues.title)
    setUserId(allValues.user)
    setDescription(allValues.description)
    setBody(allValues.body)
    setCategoryId(allValues.category)
    setImageURL(allValues.imageURL)
    setSelectedTags(allValues.selectedTags)
  }

  console.log('selectedTags: ' + selectedTags)

  const validateMessages = {
    required: `${form.name} is required!`
  }

  const convertStrToDate = (str) => {
    return new Date(str).toDateString()
  }

  return (
    <div className='container'>
      <TableToolbar
        title={'Post/Detail'}
        showAddButton={false}
        />

    <Form {...layout}
        form={form}
        name="nest-messages"
        initialValues={initialValues}
        validateMessages={validateMessages}
        onValuesChange={onValuesChange}
        onFinish={submitForm}
        autoComplete="off"
        >

      <Form.Item label="title" name='title' rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="ID">
        { currObj._id }
      </Form.Item>

      <Form.Item label="Created At" name='created'>
        {convertStrToDate(currObj.createdAt)}
      </Form.Item>

      <Form.Item label="Last Updated" name='updated'>
        {convertStrToDate(currObj.updatedAt)}
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
        name="tags"
        label="Tags[multiple]"
        >
        <TagSelector
         setSelectedTags={setSelectedTags}
          defaultValue={selectedTags}
          allTags={allTags}
          />
      </Form.Item>

      <Form.Item label="Image URL" name='imageURL'>
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

export default PostDetail
