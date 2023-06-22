import React, { useEffect,  useState } from 'react'
import { Form, Modal, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import CreateThreadContent from './CreateThreadContent'
import '../../style/CreateThread/CreateThreadForm.css'
import CreateThreadPetInfo from './CreateThreadPetInfo'
import useThreadTypeKeywordSwitch from './useThreadTypeKeywordSwitch'
import { useDispatch } from 'react-redux';
import { createThreadAsync } from '../../thunk/threadThunk';

function CreateThreadForm ({ open, onCreate, onCancel, initialType }) {
  const [threadType, updateThreadType] = useState(initialType);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    updateThreadType(initialType);
  }, [initialType])

  // const onFinish = (values) => {
  //   console.log('form got submitted:', values);
  //   dispatch(createThread(values))
  //     .then(response => {
  //       const threadId = response.data.threadCreated._id;
  //       navigate(`/threads/${threadId}`);
  //       onCreate();
  //     })
  //     .catch(error => {
  //       console.log('Cannot open the new Thread.' + error);
  //     });
  // };

  const onFinish = (values) => {
    console.log('form got submitted:', values);
    dispatch(createThreadAsync(values))
      .then(action => {
        // check if the action completed successfully
        if (createThreadAsync.fulfilled.match(action)) {
          const threadId = action.payload._id;
          navigate(`/threads/${threadId}`);
          onCreate();
        } else {
          // handle the error
          console.log('Cannot open the new Thread.' + action.error.message);
        }
      });
  };

  const [form] = Form.useForm();

  return (
    <Modal className='create-thread-modal'
           open={open}
           title={`Create A New ${useThreadTypeKeywordSwitch(threadType)('threadType')} Thread`}
           okText='Create'
           onOk={() => {
             form.validateFields()
               .then((values) => {
                 form.submit();
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
