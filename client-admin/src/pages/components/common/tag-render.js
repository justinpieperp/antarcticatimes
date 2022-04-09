import React from 'react'
import { Tag } from 'antd'
import { GET_TAGS } from '../../../GraphQL/queries'
import { useQuery } from '@apollo/client'
import { triggerErrorModal } from './modal'

const colors = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple'
]

const TagRender = (props) => {
  const { data, loading, error } = useQuery(GET_TAGS, { fetchPolicy: 'cache-and-network' })

  if (loading) return ''
  if (error) return triggerErrorModal(error)

  const tagsData = data.getTags
  const tagsColor = tagsData.map((tag, index) => {
    return (
      {
        value: tag.tag,
        color: colors[index > 10 ? index / 11 : index]
      }
    )
  })

  const { label, value, closable, onClose } = props
  const onPreventMouseDown = event => {
    event.preventDefault()
    event.stopPropagation()
  }

  const color = tagsColor.find(item => item.value === value).color

  return (
    <Tag
        color={color}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
        >
        {label}
    </Tag>
  )
}

export default TagRender
