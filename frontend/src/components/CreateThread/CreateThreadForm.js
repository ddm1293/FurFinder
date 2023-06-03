import React, { useEffect,  useState } from 'react'
import { Form, Modal, Divider } from 'antd';
import CreateThreadContent from './CreateThreadContent'
import '../../style/CreateThread/CreateThreadForm.css'
import CreateThreadPetInfo from './CreateThreadPetInfo'
import useThreadTypeKeywordSwitch from './useThreadTypeKeywordSwitch'

function CreateThreadForm ({ open, onCreate, onCancel, initialType }) {
  const [threadType, updateThreadType] = useState(initialType);

  useEffect(() => {
    updateThreadType(initialType);
  }, [initialType])

  // TODO: after the form is submitted, send the form data for the next step
  const onFinish = (e) => {
    console.log('form got submitted:', e)
  }

  const [form] = Form.useForm();

  return (
    <Modal className='create-thread-modal'
           open={open}
           title={`Create A New ${useThreadTypeKeywordSwitch(threadType)('threadType')} Thread`}
           okText='Create'
           onOk={() => {
             form.validateFields()
               .then(() => {
               form.submit();
               form.resetFields();
               onCreate();
             })
               .catch((reason) => {
                 console.log('Validate Failed:', reason);
               })
           }}
           cancelText='Cancel'
           onCancel={() => {
             form.resetFields();
             onCancel();
           }}>
      <Form layout='vertical'
            name='create-thread-form'
            form={form}
            initialValues={{
              ['select-thread-type']: initialType,
            }}
            onFinish={onFinish}
            scrollToFirstError>
        <CreateThreadContent threadType={threadType}
                             handleThreadTypeUpdate={updateThreadType}/>
        <Divider />
        <CreateThreadPetInfo threadType={threadType}/>
      </Form>
    </Modal>
  )
}

export default CreateThreadForm
