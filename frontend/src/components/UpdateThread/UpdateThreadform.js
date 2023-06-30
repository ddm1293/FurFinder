import React, { useEffect, useState } from 'react';
import { Form, Modal, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import CreateThreadContent from '../CreateThread/CreateThreadContent'
import '../../style/CreateThread/CreateThreadForm.css'
import CreateThreadPetInfo from '../CreateThread/CreateThreadPetInfo'
import useThreadTypeKeywordSwitch from '../CreateThread/useThreadTypeKeywordSwitch'
import { useDispatch, useSelector} from 'react-redux';
import { updateThreadAsync, getThreadAsync } from '../../thunk/threadThunk';

function UpdateThreadForm ({ open, onUpdate, onCancel, threadId }) {
  const [threadType, updateThreadType] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getThreadAsync(threadId)).then((thread) => {
      updateThreadType(thread.threadType);
      form.setFieldsValue({
        'select-thread-type': thread.threadType,
        'thread-title': thread.title,
        'thread-main-content': thread.content,
        // Add other fields as necessary
      });
    });
  }, [dispatch, form, threadId])

  const onFinish = (values) => {
    const valuesWithPoster = { ...values, poster: user.id };
    console.log('form got submitted:', valuesWithPoster);
    dispatch(updateThreadAsync(threadId, valuesWithPoster))
      .then(action => {
        // check if the action completed successfully
        if (updateThreadAsync.fulfilled.match(action)) {
          const threadId = action.payload._id;
          navigate(`/threads/${threadId}`);
          onUpdate();
        } else {
          // handle the error
          console.log('Cannot open the new Thread.' + action.error.message);
        }
      });
  };

  return (
    <Modal className='update-thread-modal'
           open={open}
           title={`Update ${useThreadTypeKeywordSwitch(threadType)('threadType')} Thread`}
           okText='Update'
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
            name='update-thread-form'
            form={form}
            onFinish={onFinish}
            scrollToFirstError>
        <CreateThreadContent threadType={threadType}
                             handleThreadTypeUpdate={updateThreadType}/>
        <Divider />
        <CreateThreadPetInfo threadType={threadType} form={form}/>
      </Form>
    </Modal>
  )
}

export default UpdateThreadForm
