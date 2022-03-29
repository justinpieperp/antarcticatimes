import React from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_TAG } from '../../GraphQL/mutations'

function CreateTag () {
  let input
  const [createTag, { data, loading, error }] = useMutation(CREATE_TAG)
  if (loading) return 'Submitting...'
  if (error) return `Submission error! ${error.message}`
  console.log(data)

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          createTag({ variables: { tag: input.value } })
          input.value = ''
        }}
      >
        <input
          ref={node => {
            input = node
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateTag
