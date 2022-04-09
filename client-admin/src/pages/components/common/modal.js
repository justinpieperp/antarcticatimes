import { Modal } from 'antd'

const triggerSuccessModal = (refetch) => {
  Modal.success({
    content: 'Success!',
    onOk: () => {
      refetch()
    }
  })
}

function triggerErrorModal (error, reset) {
  Modal.error({
    title: 'Woops! Something went wrong...',
    content: `${error.message}`,
    onOk: () => reset()
  })
}

export {
  triggerSuccessModal,
  triggerErrorModal
}
